import axios from "axios";
import sqlite3 from "sqlite3";
import path from "path";
import logger from "./logger.js";
import { ensureDb, sequelize } from "./db.js";
import { Apmc_names, Commodities_names } from "./enums.js";

const DB_FILE = path.join(process.cwd(), "debug.db");
const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const BASE_URL = `https://api.data.gov.in/resource/${RESOURCE_ID}`;
const STATE = "Rajasthan";

function preprocessApmcName(name) {
  return name
    .toUpperCase()
    .replace(/\([^)]*\)/g, "") // drop parenthesised qualifiers like "(F&V)"
    .replace(/\bAPMC\b/g, "") // drop trailing "APMC" suffix
    .replace(/[\s\-\.\(\)&]+/g, "_")
    .replace(/\/+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function preprocessCommodityName(name) {
  return name
    .toUpperCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[\s\-\.\(\)&]+/g, "_")
    .replace(/\/+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .replace("PSYLLIUM", "PS_YLLIUM");
}

// Try multiple variants to find a mandi entry in the enum, since Agmarknet uses
// names like "Bijaynagar APMC" while our enum has "BIJAY_NAGAR".
// Returns the matched enum entry (or null) so callers get both the canonical
// English name and the Hindi name.
function resolveApmcEnum(rawName) {
  const variants = new Set();
  variants.add(preprocessApmcName(rawName));
  variants.add(rawName.toUpperCase().replace(/\s+/g, "_"));
  const stripped = preprocessApmcName(rawName);
  if (stripped.endsWith("NAGAR") && !stripped.includes("_NAGAR")) {
    variants.add(stripped.replace(/NAGAR$/, "_NAGAR"));
  }
  if (stripped.includes("KISHANGARH")) {
    variants.add("M_KISHANGARH");
  }
  if (stripped.includes("SRIGANGANAGAR")) {
    variants.add("SRI_GANGANAGAR_GRAIN");
  }
  if (stripped.includes("BIKANER") && stripped.includes("GRAIN")) {
    variants.add("BIKANER_GRAIN");
  }
  if (stripped.includes("JAIPUR") && stripped.includes("GRAIN")) {
    variants.add("JAIPUR_GRAIN");
  }
  if (stripped.includes("JAIPUR") && stripped.includes("F_V")) {
    variants.add("JAIPUR_F_AND_V_MUHANA");
  }
  for (const v of variants) {
    const hit = Apmc_names.fromNormalizedValue(v);
    if (hit) return hit;
  }
  return null;
}

function resolveCommodityHindi(rawName) {
  const variants = new Set();
  variants.add(preprocessCommodityName(rawName));
  // "BENGAL_GRAM_GRAM_WHOLE" → also try just "GRAM"
  const stripped = preprocessCommodityName(rawName);
  if (stripped.includes("GRAM")) variants.add("GRAM");
  if (stripped.includes("MUSTARD")) variants.add("MUSTARD");
  if (stripped.includes("WHEAT")) variants.add("WHEAT");
  if (stripped.includes("BAJRA")) variants.add("BAJRA");
  if (stripped.includes("ONION")) variants.add("ONION");
  if (stripped.includes("TOMATO")) variants.add("TOMATO");
  if (stripped.includes("POTATO")) variants.add("POTATO");
  for (const v of variants) {
    const hit = Commodities_names.fromNormalizedValue(v);
    if (hit) return hit.hindiName;
  }
  return null;
}

function withRawDb(fn) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) return reject(err);
      Promise.resolve()
        .then(() => fn(db))
        .then((res) => db.close(() => resolve(res)))
        .catch((e) => db.close(() => reject(e)));
    });
  });
}

async function fetchAllPages(apiKey) {
  // The sample/free data.gov.in key caps responses at 10 records each call,
  // so always paginate based on the server's `total` field rather than the
  // requested `limit` to avoid stopping early.
  const limit = 1000;
  let offset = 0;
  const allRecords = [];
  let total = Infinity;

  while (offset < total && offset < 20000) {
    const url = `${BASE_URL}?api-key=${apiKey}&format=json&limit=${limit}&offset=${offset}&filters%5Bstate.keyword%5D=${encodeURIComponent(STATE)}`;
    const { data } = await axios.get(url, { timeout: 30000 });
    const records = data?.records || [];
    if (data?.total !== undefined) total = data.total;
    if (records.length === 0) break;
    allRecords.push(...records);
    offset += records.length;
  }
  return allRecords;
}

async function deleteRowsForApmcs(apmcNames) {
  if (!apmcNames.length) return;
  await sequelize.transaction(async (t) => {
    const placeholders = apmcNames.map(() => "?").join(",");
    await sequelize.query(`DELETE FROM commodity WHERE apmc_name IN (${placeholders})`, {
      replacements: apmcNames,
      transaction: t,
    });
  });
}

export async function fetchAndSaveAgmarknetData() {
  const apiKey = process.env.DATAGOVIN_API_KEY;
  if (!apiKey || apiKey.startsWith("REPLACE_")) {
    logger.warn(
      "DATAGOVIN_API_KEY not configured — skipping Agmarknet fetch. Get a free key at https://data.gov.in/user/register",
      { label: "agmarknet" }
    );
    return { skipped: true };
  }

  await ensureDb();
  const start = Date.now();
  logger.info(`Starting Agmarknet fetch for ${STATE}`, { label: "agmarknet" });

  try {
    const records = await fetchAllPages(apiKey);
    logger.info(`Agmarknet returned ${records.length} records`, { label: "agmarknet" });

    if (records.length === 0) return { saved: 0 };

    const processed = records.map((r) => {
      const apmcRaw = r.market || r.Market || "";
      const commodityRaw = r.commodity || r.Commodity || "";
      const apmcEnum = resolveApmcEnum(apmcRaw);
      // Use the canonical enum English name (e.g. "BIJAY NAGAR") so we don't
      // create duplicates like "BIJAY NAGAR" + "BIJAYNAGAR APMC" in the DB.
      const canonicalApmc = apmcEnum ? apmcEnum.name.replace(/_/g, " ") : apmcRaw.toUpperCase();
      const apmcHindi = apmcEnum?.hindiName || apmcRaw;
      const commodityHindi = resolveCommodityHindi(commodityRaw) || commodityRaw;
      return {
        apmc_name: canonicalApmc,
        apmc_HindiName: apmcHindi,
        commodity_name: commodityRaw,
        commodity_name_hindi: commodityHindi,
        commodity_uom: "Qui",
        category: r.variety || r.Variety || "UNKNOWN",
        latest_transaction_date: r.arrival_date || r.Arrival_Date || new Date().toISOString(),
        min_price: String(r.min_price ?? r.Min_Price ?? "0"),
        max_price: String(r.max_price ?? r.Max_Price ?? "0"),
        modal_price: String(r.modal_price ?? r.Modal_Price ?? "0"),
        total_arrival_qty: "0",
        total_sold_qty: "0",
      };
    });

    const apmcsToRefresh = [...new Set(processed.map((p) => p.apmc_name))];
    await deleteRowsForApmcs(apmcsToRefresh);

    await withRawDb(async (db) => {
      for (const c of processed) {
        await new Promise((resolve, reject) =>
          db.run(
            `INSERT INTO commodity (apmc_name, category, commodity_name, commodity_uom, latest_transaction_date, max_price, min_price, modal_price, total_arrival_qty, total_sold_qty, commodity_name_hindi, apmc_HindiName)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              c.apmc_name,
              c.category,
              c.commodity_name,
              c.commodity_uom,
              c.latest_transaction_date,
              c.max_price,
              c.min_price,
              c.modal_price,
              c.total_arrival_qty,
              c.total_sold_qty,
              c.commodity_name_hindi,
              c.apmc_HindiName,
            ],
            (err) => (err ? reject(err) : resolve())
          )
        );
      }
    });

    logger.info(
      `Agmarknet fetch complete in ${Date.now() - start}ms — saved ${processed.length} rows for ${apmcsToRefresh.length} mandis`,
      { label: "agmarknet" }
    );
    return { saved: processed.length, mandis: apmcsToRefresh.length };
  } catch (err) {
    logger.error(`Agmarknet fetch failed: ${err.message}`, { label: "agmarknet" });
    throw err;
  }
}

export default { fetchAndSaveAgmarknetData };

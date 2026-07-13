import path from "path";
import sqlite3 from "sqlite3";
import axios from "axios";
import logger from "./logger.js";
import { ensureDb, sequelize } from "./db.js";
import { Apmc_names, Commodities_names } from "./enums.js";

const DB_FILE = path.join(process.cwd(), "debug.db");
const RAJKISAN_API_URL =
  process.env.RAJKISAN_API_URL ||
  "http://rajkisan.rajasthan.gov.in/Rajkisanweb/AllCommodityDetails";

function preprocessApmcName(name) {
  return name
    .toUpperCase()
    .replace(/[\s\-\.\(\)]/g, "_")
    .replace(/\/+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function preprocessCommodityName(name) {
  return name
    .toUpperCase()
    .replace(/[\s\-\.\(\)]/g, "_")
    .replace(/\/+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .replace("PSYLLIUM", "PS_YLLIUM");
}

async function callPostApiWithEmptyPayload() {
  try {
    const response = await axios.post(RAJKISAN_API_URL, null, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000,
    });
    if (response.status === 200) return response.data;
    throw new Error(`Failed to call API: ${response.status}`);
  } catch (error) {
    logger.error(`Error calling API: ${error.message}`, { label: "apmc" });
    throw error;
  }
}

async function deleteRowsForApmcs(apmcNames) {
  if (!apmcNames.length) return;
  await sequelize.transaction(async (t) => {
    // Delete only rows for mandis the external API just returned, so
    // historical prices for other mandis stay visible until they refresh.
    const placeholders = apmcNames.map(() => "?").join(",");
    await sequelize.query(`DELETE FROM commodity WHERE apmc_name IN (${placeholders})`, {
      replacements: apmcNames,
      transaction: t,
    });
  });
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

async function saveCommodityData(commodityData) {
  const commodities = Array.isArray(commodityData) ? commodityData : JSON.parse(commodityData);
  logger.info(`Total new records today: ${commodities.length}`, { label: "apmc" });

  const todaysApmcNames = [...new Set(commodities.map((c) => c.apmcName))];
  await deleteRowsForApmcs(todaysApmcNames);

  const processed = commodities.map((commodity) => {
    const apmcEnum = Apmc_names.fromNormalizedValue(preprocessApmcName(commodity.apmcName));
    const apmc_HindiName = apmcEnum?.hindiName || commodity.apmcName.toUpperCase();
    const commodityEnum = Commodities_names.fromNormalizedValue(preprocessCommodityName(commodity.commodityName));
    const commodity_name_hindi = commodityEnum?.hindiName || commodity.commodityName.toUpperCase();
    return {
      apmc_name: commodity.apmcName,
      category: commodity.category || "UNKNOWN",
      commodity_name: commodity.commodityName,
      commodity_uom: commodity.unit || "Qui",
      latest_transaction_date: commodity.date || new Date().toISOString(),
      max_price: commodity.maxPrice || "0",
      min_price: commodity.minPrice || "0",
      modal_price: commodity.avgPrice || "0",
      total_arrival_qty: commodity.arrivalQuantity || "0",
      total_sold_qty: commodity.tradedQuantity || "0",
      commodity_name_hindi,
      apmc_HindiName,
    };
  });

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

  await updateAllApmcNames(commodities);
  await updateAllApmcCommodity(commodities);

  return processed;
}

async function updateAllApmcNames(apmcList) {
  const apmcNames = [...new Set(apmcList.map((c) => c.apmcName))];
  await withRawDb(async (db) => {
    for (const apmc of apmcNames) {
      const apmcEnum = Apmc_names.fromNormalizedValue(preprocessApmcName(apmc));
      const apmcHindi = apmcEnum?.hindiName || apmc;
      await new Promise((resolve, reject) =>
        db.run(
          `INSERT OR REPLACE INTO Apmc_names_data (apmc_name_eng, apmc_name_hin) VALUES (?, ?)`,
          [apmc, apmcHindi],
          (err) => (err ? reject(err) : resolve())
        )
      );
    }
  });
}

async function updateAllApmcCommodity(apmcList) {
  const commodityNames = [...new Set(apmcList.map((c) => c.commodityName))];
  await withRawDb(async (db) => {
    for (const commodity of commodityNames) {
      const cEnum = Commodities_names.fromNormalizedValue(preprocessCommodityName(commodity));
      const commodityHindi = cEnum?.hindiName || commodity;
      await new Promise((resolve, reject) =>
        db.run(
          `INSERT OR REPLACE INTO CommodityList (commodity_name_eng, commodity_name_hin) VALUES (?, ?)`,
          [commodity, commodityHindi],
          (err) => (err ? reject(err) : resolve())
        )
      );
    }
  });
}

export async function fetchAndSaveApmcData() {
  await ensureDb();
  const startTime = new Date();
  logger.info(`Starting APMC data fetch at: ${startTime.toISOString()}`, { label: "apmc" });
  try {
    const data = await callPostApiWithEmptyPayload();
    await saveCommodityData(data);
    logger.info(`Finished APMC data fetch at: ${new Date().toISOString()}`, { label: "apmc" });
    return "Success";
  } catch (err) {
    logger.error(`Failed APMC data fetch: ${err.message}`, { label: "apmc" });
    throw err;
  }
}

export default { fetchAndSaveApmcData };

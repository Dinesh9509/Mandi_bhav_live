import { ok, fail, handleOptions } from "@/lib/http";
import { ensureDb, models } from "@/lib/db";
import { Apmc_names, Commodities_names } from "@/lib/enums";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

function requireAdmin(req) {
  const auth = req.headers.get("x-admin-password") || "";
  const expected = process.env.ADMIN_PASSWORD || "mandi@admin";
  if (auth !== expected) {
    const e = new Error("Unauthorized");
    e.status = 401;
    throw e;
  }
}

export async function GET(req) {
  try {
    await ensureDb();
    const url = new URL(req.url);
    const search = (url.searchParams.get("search") || "").trim().toLowerCase();
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "200", 10), 1000);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);

    const all = await models.Commodity.findAll({
      attributes: [
        "id",
        "apmcName",
        "apmcHindiName",
        "commodityName",
        "commodityNameHindi",
        "minPrice",
        "maxPrice",
        "modalPrice",
        "latestTransactionDate",
      ],
      order: [["apmcName", "ASC"], ["commodityName", "ASC"]],
    });

    const filtered = search
      ? all.filter((c) => {
          const hay = `${c.apmcName} ${c.apmcHindiName || ""} ${c.commodityName} ${c.commodityNameHindi || ""}`.toLowerCase();
          return hay.includes(search);
        })
      : all;

    const total = filtered.length;
    const page = filtered.slice(offset, offset + limit);

    return ok({ status: 200, success: true, data: page, total, message: "" });
  } catch (e) {
    return fail(500, e.message || "Server error");
  }
}

export async function PUT(req) {
  try {
    requireAdmin(req);
    await ensureDb();
    const body = await req.json();
    const { id, minPrice, maxPrice, modalPrice } = body;
    if (!id) return fail(400, "id required");

    const row = await models.Commodity.findByPk(id);
    if (!row) return fail(404, "Row not found");

    if (minPrice !== undefined) row.minPrice = String(minPrice);
    if (maxPrice !== undefined) row.maxPrice = String(maxPrice);
    if (modalPrice !== undefined) row.modalPrice = String(modalPrice);
    row.latestTransactionDate = new Date().toISOString();
    await row.save();

    return ok({ status: 200, success: true, data: row, message: "Updated" });
  } catch (e) {
    return fail(e.status || 500, e.message || "Server error");
  }
}

export async function POST(req) {
  try {
    requireAdmin(req);
    await ensureDb();
    const body = await req.json();
    const { apmcName, commodityName, minPrice, maxPrice, modalPrice } = body;
    if (!apmcName || !commodityName) {
      return fail(400, "apmcName and commodityName required");
    }

    const apmcEnum = Apmc_names.fromNormalizedValue(
      apmcName.toUpperCase().replace(/[\s\-\.\(\)]/g, "_").replace(/_+/g, "_")
    );
    const commodityEnum = Commodities_names.fromNormalizedValue(
      commodityName.toUpperCase().replace(/[\s\-\.\(\)]/g, "_").replace(/_+/g, "_")
    );

    const created = await models.Commodity.create({
      apmcName: apmcName.toUpperCase(),
      apmcHindiName: apmcEnum?.hindiName || apmcName,
      commodityName: commodityName.toUpperCase(),
      commodityNameHindi: commodityEnum?.hindiName || commodityName,
      minPrice: String(minPrice ?? "0"),
      maxPrice: String(maxPrice ?? "0"),
      modalPrice: String(modalPrice ?? "0"),
      category: "MANUAL",
      commodityUom: "Qui",
      latestTransactionDate: new Date().toISOString(),
      totalArrivalQty: "0",
      totalSoldQty: "0",
    });

    return ok({ status: 200, success: true, data: created, message: "Created" });
  } catch (e) {
    return fail(e.status || 500, e.message || "Server error");
  }
}

export async function DELETE(req) {
  try {
    requireAdmin(req);
    await ensureDb();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return fail(400, "id query param required");

    const row = await models.Commodity.findByPk(id);
    if (!row) return fail(404, "Row not found");
    await row.destroy();

    return ok({ status: 200, success: true, data: { id }, message: "Deleted" });
  } catch (e) {
    return fail(e.status || 500, e.message || "Server error");
  }
}

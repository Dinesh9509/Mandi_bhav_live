import logger from "./logger.js";
import { ensureDb, models } from "./db.js";
import { Apmc_names, Commodities_names } from "./enums.js";

async function getAllMandiList() {
  await ensureDb();
  return models.MandiList.findAll();
}

async function addMandi() {
  return [{ id: 1, mandiName: "अलवर", address: "अलवर city" }];
}

async function createMandi(data) {
  await ensureDb();
  return models.MandiList.create(data);
}

async function createMandiList(list) {
  await ensureDb();
  return models.MandiList.bulkCreate(list);
}

async function addCropToMandi(data) {
  return { id: data?.mandiId, mandiName: "अलवर", cropName: data?.cropName };
}

async function addCropToMandiList(list) {
  return list;
}

async function getAllMandiDataList() {
  await ensureDb();
  return models.MandiData.findAll();
}

async function getMandiDataById(id) {
  await ensureDb();
  return models.MandiList.findByPk(id);
}

async function callPostApiWithEmptyPayload() {
  return { body: ["APMC1", "APMC2"] };
}

function getApmcNames(data) {
  return data;
}

async function saveComodityData() {
  return true;
}

async function getAllApmcPrice() {
  await ensureDb();
  const commodities = await models.Commodity.findAll({
    attributes: [
      "id",
      "apmcName",
      "apmcHindiName",
      "commodityName",
      "commodityNameHindi",
      "minPrice",
      "maxPrice",
      "category",
    ],
  });
  return commodities.map((c) => ({
    id: c.id,
    apmcName: c.apmcName,
    apmc_HindiName: c.apmcHindiName || "",
    commodityName: c.commodityName,
    commodityNameHindi: c.commodityNameHindi || "",
    minPrice: c.minPrice || "0.00",
    maxPrice: c.maxPrice || "0.00",
    category: c.category || "UNKNOWN",
  }));
}

async function getApmcPriceByName(name) {
  await ensureDb();
  const commodities = await models.Commodity.findAll({
    where: { apmcName: name },
    attributes: [
      "id",
      "apmcName",
      "apmcHindiName",
      "commodityName",
      "commodityNameHindi",
      "minPrice",
      "maxPrice",
      "category",
    ],
  });
  return commodities.map((c) => ({
    id: c.id,
    apmcName: c.apmcName,
    apmc_HindiName: c.apmcHindiName || "",
    commodityName: c.commodityName,
    commodityNameHindi: c.commodityNameHindi || "",
    minPrice: c.minPrice || "0.00",
    maxPrice: c.maxPrice || "0.00",
    category: c.category || "UNKNOWN",
  }));
}

async function getAllApmcList() {
  await ensureDb();
  
  // 1. Find all APMCs that have data
  const commodities = await models.Commodity.findAll({
    attributes: ['apmcName'],
    group: ['apmcName']
  });
  const apmcsWithData = commodities.map(c => (c.apmcName || '').toUpperCase());

  // 2. Fetch all APMCs
  const rows = await models.Apmc_names_data.findAll();
  
  // 3. Precompute data availability for each row
  const hasDataMap = new Map();
  for (const row of rows) {
    const nameEng = (row.apmcNameEng || '').toUpperCase();
    const hasData = apmcsWithData.some(d => d === nameEng || d.startsWith(nameEng + ' ') || d.startsWith(nameEng + '('));
    hasDataMap.set(row.id, hasData);
  }
  
  // 4. Sort
  const collator = new Intl.Collator("hi", { sensitivity: "base" });
  return rows.sort((a, b) => {
    const aHasData = hasDataMap.get(a.id);
    const bHasData = hasDataMap.get(b.id);
    
    // Mandis with data come first
    if (aHasData && !bHasData) return -1;
    if (!aHasData && bHasData) return 1;
    
    // If both have data (or both don't), sort alphabetically by Hindi name
    return collator.compare(a.apmcNameHin || a.apmcNameEng, b.apmcNameHin || b.apmcNameEng);
  });
}

async function getAllCommodityList() {
  await ensureDb();
  return models.Commodity.findAll();
}

function getCommodities(data) {
  return data;
}

async function callPostApiWithENam() {
  return ["APMC1", "APMC2"];
}

async function callPostApiWithCommodityENam() {
  return ["Bajra", "Wheat"];
}

const mandiDataService = {
  getAllMandiList,
  addMandi,
  createMandi,
  createMandiList,
  addCropToMandi,
  addCropToMandiList,
  getAllMandiDataList,
  getMandiDataById,
  callPostApiWithEmptyPayload,
  getApmcNames,
  saveComodityData,
  getAllApmcPrice,
  getApmcPriceByName,
  getAllApmcList,
  getAllCommodityList,
  getCommodities,
  callPostApiWithENam,
  callPostApiWithCommodityENam,
};

export default mandiDataService;
export {
  getAllMandiList,
  addMandi,
  createMandi,
  createMandiList,
  addCropToMandi,
  addCropToMandiList,
  getAllMandiDataList,
  getMandiDataById,
  callPostApiWithEmptyPayload,
  getApmcNames,
  saveComodityData,
  getAllApmcPrice,
  getApmcPriceByName,
  getAllApmcList,
  getAllCommodityList,
  getCommodities,
  callPostApiWithENam,
  callPostApiWithCommodityENam,
};

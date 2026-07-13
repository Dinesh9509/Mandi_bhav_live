import path from "path";
import fs from "fs";
import { Sequelize, DataTypes, Model } from "sequelize";
import sqlite3 from "sqlite3";
import logger from "./logger.js";
import { Apmc_names, Commodities_names } from "./enums.js";

const DB_FILE = path.join(process.cwd(), "debug.db");
const INIT_SQL_FILE = path.join(process.cwd(), "lib", "init.sql");

function defineModels(sequelize) {
  // ---------- Commodity ----------
  class Commodity extends Model {}
  Commodity.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      commodityName: { type: DataTypes.STRING, allowNull: false, field: "commodity_name" },
      apmcName: { type: DataTypes.STRING, allowNull: false, field: "apmc_name" },
      commodityNameHindi: { type: DataTypes.STRING, allowNull: true, field: "commodity_name_hindi" },
      apmcHindiName: { type: DataTypes.STRING, allowNull: true, field: "apmc_HindiName" },
      minPrice: { type: DataTypes.STRING, allowNull: true, field: "min_price" },
      maxPrice: { type: DataTypes.STRING, allowNull: true, field: "max_price" },
      modalPrice: { type: DataTypes.STRING, allowNull: true, field: "modal_price" },
      totalArrivalQty: { type: DataTypes.STRING, allowNull: true, field: "total_arrival_qty" },
      totalSoldQty: { type: DataTypes.STRING, allowNull: true, field: "total_sold_qty" },
      latestTransactionDate: { type: DataTypes.STRING, allowNull: true, field: "latest_transaction_date" },
      commodityUom: { type: DataTypes.STRING, allowNull: true, field: "commodity_uom" },
      category: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize, modelName: "Commodity", tableName: "commodity", timestamps: false }
  );

  // ---------- Apmc_names_data ----------
  const ApmcNamesData = sequelize.define(
    "Apmc_names_data",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      apmcNameEng: { type: DataTypes.STRING, allowNull: false, unique: true, field: "apmc_name_eng" },
      apmcNameHin: { type: DataTypes.STRING, allowNull: true, field: "apmc_name_hin" },
    },
    { tableName: "Apmc_names_data", timestamps: false }
  );

  // ---------- MandiList ----------
  const MandiList = sequelize.define(
    "MandiList",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      mandiName: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING },
      district: { type: DataTypes.STRING },
      state: { type: DataTypes.STRING },
      category: { type: DataTypes.STRING },
      cropIdList: { type: DataTypes.STRING },
      hashMapData: { type: DataTypes.TEXT },
      addedDate: { type: DataTypes.STRING },
    },
    { tableName: "MandiList", timestamps: false }
  );

  // ---------- MandiData ----------
  const MandiData = sequelize.define(
    "MandiData",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      mandiName: { type: DataTypes.STRING, allowNull: false },
      district: { type: DataTypes.STRING, allowNull: true },
      state: { type: DataTypes.STRING, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: true },
      addedDate: { type: DataTypes.STRING, allowNull: true },
      totalcrops: { type: DataTypes.INTEGER, defaultValue: 0 },
      hashMapData: { type: DataTypes.TEXT, allowNull: true },
    },
    { tableName: "MandiData", timestamps: false }
  );

  // ---------- CommodityNamesData ----------
  const CommodityNamesData = sequelize.define(
    "Commodity_names_data",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      commodityNameEng: { type: DataTypes.STRING, allowNull: false, unique: true },
      commodityNameHin: { type: DataTypes.STRING, allowNull: true },
    },
    { tableName: "Commodity_names_data", timestamps: false }
  );

  // ---------- CropCategory ----------
  const CropCategory = sequelize.define(
    "CropCategory",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      hindiName: { type: DataTypes.STRING, allowNull: true },
    },
    { tableName: "CropCategory", timestamps: false }
  );

  // ---------- Crops ----------
  const Crops = sequelize.define(
    "Crops",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      crop_Name: { type: DataTypes.STRING, allowNull: false },
      crop_Hindi_Name: { type: DataTypes.STRING, allowNull: true },
      cropCategoryId: { type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: "Crops", timestamps: false }
  );

  // ---------- User ----------
  class User extends Model {}
  User.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: true, defaultValue: "ADMIN" },
    },
    { sequelize, modelName: "User", tableName: "users", timestamps: false }
  );

  return { Commodity, Apmc_names_data: ApmcNamesData, MandiList, MandiData, Commodity_names_data: CommodityNamesData, CropCategory, Crops, User };
}

// Use a global cache so hot-reload in dev doesn't open multiple Sequelize instances
const globalCache = globalThis;

if (!globalCache.__mandi_db) {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: DB_FILE,
    logging: false,
  });
  globalCache.__mandi_db = {
    sequelize,
    models: defineModels(sequelize),
  };
}

const { sequelize, models } = globalCache.__mandi_db;

async function runInitSql() {
  if (!fs.existsSync(INIT_SQL_FILE)) {
    logger.warn(`init.sql not found at ${INIT_SQL_FILE}`, { label: "db" });
    return;
  }
  const initSql = fs.readFileSync(INIT_SQL_FILE, "utf8");

  await new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_FILE, (err) => {
      if (err) return reject(err);
      const statements = initSql
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      let pending = statements.length;
      if (pending === 0) {
        db.close();
        return resolve();
      }
      let firstErr = null;
      for (const stmt of statements) {
        db.run(stmt, (e) => {
          if (e && !firstErr) firstErr = e;
          if (--pending === 0) {
            db.close();
            firstErr ? reject(firstErr) : resolve();
          }
        });
      }
    });
  });
}

async function seedReferenceData() {
  // Seed every known APMC and commodity from the enum so the UI can list
  // ALL mandis/crops, not only those returned by today's external API call.
  try {
    const apmcRows = Object.values(Apmc_names.map).map((a) => ({
      apmcNameEng: a.name.replace(/_/g, " "),
      apmcNameHin: a.hindiName,
    }));
    const commodityRows = Object.values(Commodities_names.map).map((c) => ({
      commodityNameEng: c.name.replace(/_/g, " "),
      commodityNameHin: c.hindiName,
    }));

    await models.Apmc_names_data.bulkCreate(apmcRows, {
      ignoreDuplicates: true,
    });
    await models.Commodity_names_data.bulkCreate(commodityRows, {
      ignoreDuplicates: true,
    });

    logger.info(
      `Seeded reference data: ${apmcRows.length} APMCs, ${commodityRows.length} commodities`,
      { label: "db" }
    );
  } catch (err) {
    logger.warn(`Reference seed skipped: ${err.message}`, { label: "db" });
  }
}

export async function ensureDb() {
  // Cache init state on globalThis so Next.js dev hot-reload doesn't re-seed
  // on every API request (otherwise each module re-eval resets local flags).
  if (globalCache.__mandi_db_initialized) return { sequelize, models };
  if (globalCache.__mandi_db_init_promise) return globalCache.__mandi_db_init_promise;

  globalCache.__mandi_db_init_promise = (async () => {
    try {
      await runInitSql();
      await sequelize.sync({ force: false });
      await seedReferenceData();
      globalCache.__mandi_db_initialized = true;
      logger.info("Database initialized & models synced", { label: "db" });
    } catch (err) {
      logger.error(`DB init failed: ${err.message}`, { label: "db" });
      throw err;
    } finally {
      globalCache.__mandi_db_init_promise = null;
    }
    return { sequelize, models };
  })();

  return globalCache.__mandi_db_init_promise;
}

export { sequelize, models };
export default { sequelize, models, ensureDb };

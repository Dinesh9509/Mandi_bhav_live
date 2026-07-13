import { ensureDb, models } from "./db.js";

export const cropCategoryService = {
  async addCropCategory(data) {
    if (!data?.name) throw new Error("Category name is required");
    await ensureDb();
    return models.CropCategory.create(data);
  },
  async addCropCategoryList(list) {
    if (!Array.isArray(list)) throw new Error("Category data list must be an array");
    await ensureDb();
    return models.CropCategory.bulkCreate(list);
  },
  async getAllCategory() {
    await ensureDb();
    return models.CropCategory.findAll();
  },
};

export const cropDataService = {
  async addCrop(data) {
    if (!data?.crop_Name) throw new Error("Crop name is required");
    await ensureDb();
    return models.Crops.create(data);
  },
  async addCropList(list) {
    if (!Array.isArray(list)) throw new Error("Crop data list must be an array");
    await ensureDb();
    return models.Crops.bulkCreate(list);
  },
  async getAllCrops() {
    await ensureDb();
    return models.Crops.findAll();
  },
};

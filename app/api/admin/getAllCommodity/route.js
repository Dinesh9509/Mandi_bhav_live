import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const GET = adminHandler(async () => {
  const data = await service.getAllCommodityList();
  return ok({ status: 200, success: true, data, message: "" });
});

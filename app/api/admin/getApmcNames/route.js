import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const GET = adminHandler(async () => {
  const json = await service.callPostApiWithEmptyPayload();
  const list = service.getApmcNames(json.body);
  await service.saveComodityData(json.body);
  return ok({ status: 200, success: true, data: list, message: "Success" });
});

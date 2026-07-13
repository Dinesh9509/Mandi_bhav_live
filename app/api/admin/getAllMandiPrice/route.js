import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const GET = adminHandler(async () => {
  const response = await service.callPostApiWithEmptyPayload();
  return ok(response.body);
});

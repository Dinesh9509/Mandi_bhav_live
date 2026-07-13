import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";
import { Commodities_names } from "@/lib/enums";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const GET = adminHandler(async () => {
  const json = await service.callPostApiWithEmptyPayload();
  const list = service.getCommodities(json.body);
  const enriched = list.map((commodity) => {
    const e = Commodities_names.fromNormalizedValue(String(commodity).trim());
    return e ? `${e.name}:${e.hindiName}` : commodity;
  });
  return ok({ status: 200, success: true, data: enriched, message: "" });
});

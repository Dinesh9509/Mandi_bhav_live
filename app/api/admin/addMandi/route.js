import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const POST = adminHandler(async () => {
  const data = await service.addMandi();
  return ok(data);
});

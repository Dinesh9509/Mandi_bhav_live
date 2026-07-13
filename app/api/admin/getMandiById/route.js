import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const GET = adminHandler(async (req) => {
  const id = new URL(req.url).searchParams.get("id");
  const data = await service.getMandiDataById(id);
  return ok({ status: 200, success: true, data, message: "" });
});

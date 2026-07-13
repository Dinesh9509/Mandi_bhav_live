import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const POST = adminHandler(async (req) => {
  const body = await req.json().catch(() => ({}));
  const saved = await service.createMandi(body);
  return ok(saved, { status: 201 });
});

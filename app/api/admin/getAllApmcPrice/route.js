import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";

export const runtime = "nodejs";
// Public (no auth required) - matches original jwtFilter publicPaths
export const OPTIONS = () => handleOptions();

export const GET = adminHandler(
  async () => {
    const data = await service.getAllApmcPrice();
    return ok({ status: 200, success: true, data, message: "" });
  },
  { authRequired: false }
);

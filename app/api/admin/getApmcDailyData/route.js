import { adminHandler, ok, handleOptions } from "@/lib/http";
import { fetchAndSaveApmcData } from "@/lib/apmcService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const OPTIONS = () => handleOptions();

export const GET = adminHandler(
  async () => {
    const result = await fetchAndSaveApmcData();
    return ok({ message: result });
  },
  { authRequired: false }
);

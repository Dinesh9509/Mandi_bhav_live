// Alias of /admin/getApmcPriceByName - the original frontend used the
// lowercase-n spelling in some places. Both work here.
import { adminHandler, ok, handleOptions } from "@/lib/http";
import service from "@/lib/mandiDataService";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const GET = adminHandler(
  async (req) => {
    const url = new URL(req.url);
    const name =
      url.searchParams.get("name") ||
      url.searchParams.get("Name") ||
      url.searchParams.get("apmcName");
    const data = await service.getApmcPriceByName(name);
    return ok({ status: 200, success: true, data, message: "" });
  },
  { authRequired: false }
);

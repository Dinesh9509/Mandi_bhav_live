import { adminHandler, ok, handleOptions } from "@/lib/http";
import { cropDataService } from "@/lib/cropService";

export const runtime = "nodejs";
export const OPTIONS = () => handleOptions();

export const POST = adminHandler(async (req) => {
  const body = await req.json().catch(() => ({}));
  const saved = await cropDataService.addCrop(body);
  return ok(
    { status: 201, success: true, data: saved, message: "Crop added successfully" },
    { status: 201 }
  );
});

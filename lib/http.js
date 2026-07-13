import { NextResponse } from "next/server";
import { requireAuth } from "./jwt.js";
import logger from "./logger.js";

export function ok(payload, init = {}) {
  return NextResponse.json(payload, init);
}

export function fail(status, message, extra = {}) {
  return NextResponse.json({ status, success: false, message, ...extra }, { status });
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function handleOptions() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

/**
 * Wraps a handler to:
 *  - Apply CORS headers to the response
 *  - Optionally enforce admin JWT authentication (`authRequired`)
 *  - Convert thrown errors into JSON 500/401/403 responses
 */
export function adminHandler(handler, { authRequired = true } = {}) {
  return async (req, ctx) => {
    try {
      if (authRequired) {
        try {
          requireAuth(req);
        } catch (e) {
          const res = fail(e.status || 401, e.message || "Unauthorized");
          for (const [k, v] of Object.entries(corsHeaders)) res.headers.set(k, v);
          return res;
        }
      }
      const res = await handler(req, ctx);
      if (res instanceof NextResponse) {
        for (const [k, v] of Object.entries(corsHeaders)) res.headers.set(k, v);
        return res;
      }
      const wrapped = NextResponse.json(res ?? null);
      for (const [k, v] of Object.entries(corsHeaders)) wrapped.headers.set(k, v);
      return wrapped;
    } catch (err) {
      logger.error(`Handler error: ${err?.message}`, { label: "api" });
      const res = fail(500, "Internal Server Error", { data: err?.message });
      for (const [k, v] of Object.entries(corsHeaders)) res.headers.set(k, v);
      return res;
    }
  };
}

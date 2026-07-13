import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";
import logger from "@/lib/logger";
import { corsHeaders, handleOptions } from "@/lib/http";

export const runtime = "nodejs";

export async function OPTIONS() {
  return handleOptions();
}

async function loginHandler(req) {
  logger.info("Login request received", { label: "auth" });
  let body = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  const { username, password } = body || {};

  if (!username || !password) {
    return NextResponse.json(
      { message: "Username and password are required" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (username !== "admin" || password !== "Admin") {
    logger.warn("Invalid credentials", { label: "auth" });
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401, headers: corsHeaders }
    );
  }

  const token = generateToken(username);
  logger.info(`User ${username} logged in successfully`, { label: "auth" });
  return NextResponse.json(
    { token, data: token, status: 200, success: true, message: "Login successful" },
    { status: 200, headers: corsHeaders }
  );
}

export const POST = loginHandler;

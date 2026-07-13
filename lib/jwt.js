import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET_KEY || "mandibhav-supersecret-key-change-me";

export function generateToken(username) {
  return jwt.sign({ username, role: "ADMIN" }, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

export function requireAuth(req, { allowPublic = false } = {}) {
  if (allowPublic) return null;
  const auth = req.headers.get("authorization") || "";
  if (!auth.startsWith("Bearer ")) {
    const e = new Error("Unauthorized");
    e.status = 401;
    throw e;
  }
  const token = auth.slice("Bearer ".length).trim();
  try {
    const decoded = verifyToken(token);
    if (decoded.role !== "ADMIN") {
      const e = new Error("Forbidden");
      e.status = 403;
      throw e;
    }
    return decoded;
  } catch (err) {
    const e = new Error("Unauthorized");
    e.status = 401;
    throw e;
  }
}

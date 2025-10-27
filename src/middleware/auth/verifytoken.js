import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function verifyToken(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized: No token provided" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    return null; // means OK
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
  }
}

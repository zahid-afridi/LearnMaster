import { NextResponse } from "next/server";
import pool from "../../../config/db";




export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");
    return NextResponse.json(
      { message: "Database is connected", time: result.rows[0].now },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Database is not connected", error: error.message },
      { status: 500 }
    );
  }
}

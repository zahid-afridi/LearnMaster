
import { NextResponse } from "next/server";
import pool from "../../../../utils/db";

// adjust path if different

// GET method
export async function GET() {
    try {
        const result = await pool.query("SELECT * FROM courses"); // your table name
        return NextResponse.json({ success: true, data: result.rows });
    } catch (error) {
        console.error("Error fetching courses:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}



import { NextResponse } from "next/server";
import pool from "../../../../../utils/db";

export async function POST(req) {
    try {
        const { email, password, name } = await req.json();

        // ✅ Validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        // ✅ Check if user already exists
        const checkUserQuery = `SELECT * FROM users WHERE email = $1`;
        const existingUser = await pool.query(checkUserQuery, [email]);

        if (existingUser.rows.length > 0) {
            return NextResponse.json(
                { success: false, message: "User with this email already exists" },
                { status: 409 } // Conflict
            );
        }

        // ✅ Insert new user
        const insertQuery = `
            INSERT INTO users (email, password, name)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [email, password, name];
        const { rows } = await pool.query(insertQuery, values);

        return NextResponse.json(
            { success: true, message: "User registered successfully", data: rows[0] },
            { status: 201 }
        );

    } catch (error) {
        console.error("❌ Error in POST /register:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}

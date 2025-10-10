import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";
import bcrypt from "bcrypt"

export async function POST(req) {

    try {
        const { username, email, password } = await req.json();

        if (!username || !email || !password) {
            const missingField =
                !username ? "Username is required" : !email ? "Email is required" : "Password is required";
            return NextResponse.json({
                message: missingField,
                success: false
            }, { status: 404 })
        };
        // if email is already exist
        const Isemail = await pool.query(`SELECT email FROM users WHERE email=$1`, [email]);
        if (Isemail.rows.length > 0) {
            return NextResponse.json({
                message: "email is already exists. Please Login!"
            }, { status: 404 })
        }


        // PASSWORD HASH
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);


        // query
        const q = await pool.query(`INSERT INTO users(username,email,password)
    VALUES($1,$2,$3) RETURNING *
    `, [username, email, passwordHash]);


        return NextResponse.json({
            message: "User register successfully!",
            success: true,
            User: q.rows[0]
        }, { status: 200 })


    } catch (error) {
        console.log("users errer:", error);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
        }, { status: 500 })
    }
};
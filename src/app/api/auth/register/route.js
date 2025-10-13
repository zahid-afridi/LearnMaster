import { NextResponse } from "next/server";
import pool from "../../../../config/db.js";
import bcrypt from "bcrypt"

export async function POST(req) {

    try {
        const { username, email, password, bio } = await req.json();

        if (!username || !email || !password || !bio) {
            const missingField =
                !username ? "Username is required" : !email ? "Email is required" : !password ? "Password is required" : "bio is Required";
            return NextResponse.json({
                message: missingField,
                success: false
            }, { status: 404 })
        };

        //  check the email format
        const emailFormat=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailFormat.test(email)){
            return NextResponse.json({
                message:"Invalid email format. Please enter a valid email address.",
                success:false
            },
            {status:400}
        )
            
        }




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

        // images 

        const profole_images="https://i.pravatar.cc/150?img=3";
        const  background_image="https://images.unsplash.com/photo-1503264116251-35a269479413";


        // query
        const q = await pool.query(`INSERT INTO users(username,email,password,bio,profole_images,background_image)
    VALUES($1,$2,$3,$4,$5,$6) RETURNING *
    `, [username, email, passwordHash, bio, profole_images,background_image]);


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
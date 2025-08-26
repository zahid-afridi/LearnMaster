import { NextResponse } from "next/server";
import pool from "../../../../../utils/db";
import bcrypt from "bcrypt"

export async function POST(req) {
   try {
      const { email, passwrod } = await req.body;

      if (!email || !passwrod) {
         const missingField = !email ? "Email is required" : "Password is required";
         return NextResponse.json(
            { success: false, message: missingField },
            { status: 400 }
         );
      }
      // if user is not fond! 
      const loginUser = `SELECT * FROM users WHERE = $1`;
      const { rows } = await pool.query(loginUser, [email]);

      if (rows.length === 0) {
         return NextResponse.json({
            message: "User not Found!",
            success: false
         }, { status: 404 })
      };

      const user = rows[0];

      // passowrd compare
      const passwordCompare = await bcrypt.compare(passwrod, user.passwrod);
      if (!passwordCompare) {
         return NextResponse.json({
            message: "Invalid credentials", success: false,
         },
            { status: 401 }
         )
      };

      // success
      return NextResponse.json(
         {
            success: true, message: 'Login successfully',
            user: {
               id: user.user_id,
               email: user.email,
               password: user.password
            }
         },
         { status: 201 }
      )

   } catch (error) {
      console.error("  errer login:", error);
      return NextResponse.json(
         { success: false, message: "Server error", error: error.message },
         { status: 500 }
      );

   }
}
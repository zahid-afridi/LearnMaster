import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import pool from "../../../../config/db.js";
import jwt from "jsonwebtoken"

export async function POST(req){
    try {
        const {email,password} = await req.json();

        if(!email || !password){
            const messingfield =[];
            if(!email) messingfield.push("email is required");
            if(!password) messingfield.push('password is required')

                return NextResponse.json({
                    message:messingfield,
                    success:false
                },{status:400})
        };

        // is email is not exists
        const User = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);
        if(User.rows.length ===0){
            return NextResponse.json({
                message:"Email not found, please register.",
                success:false
            },{status:400})
        };

       
        const finduser = User.rows[0];
          // password compare
          const Iscompare = await bcrypt.compare(password,finduser.password);
          if(!Iscompare){
            return NextResponse.json({
                message:"Invalid password",
                success:false
            },{status:404})
          };

// token
const token = jwt.sign(
    {email},
    process.env.JWT_SECRET,
    {expiresIn:"15m"}
)

          // query
          const q = await pool.query(`INSERT INTO login(email,password)
            VALUES($1,$2) RETURNING *
            `,[email,Iscompare]);

              return NextResponse.json({
                message:"Loing successfully!",
                success:true,
                User:q.rows[0],
                token
              });

    } catch (error) {
         console.log("login errer:", error);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
        }, { status: 500 })
    }
}
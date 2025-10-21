import { NextResponse } from "next/server";
import pool from "../../../config/db";



export async function POST(req) {
    try {


        const { user_id, title, subtitle, content, code_block, cover_image, tags } = await req.json();
        if (!user_id || !title || !content) {
            return NextResponse.json({ error: "user_id, title, and content are required" }, { status: 400 })
        }
        const result = await pool.query(
            `INSERT INTO  single_posts (user_id, title,subtitle,content, code_block,cover_image,tags) VALUES ($1,$2,$3,$4,$5,$6,$7)  RETURNING *`, [user_id, title, subtitle || null, content, code_block || null, cover_image || [], tags || []]

        );
        return NextResponse.json({
            success: true,
            message: "Single post created successfully",
            data: result.rows[0],
        });
    } catch (error) {
        console.error("Error creating single post:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create single post", details: error.message }, { status: 500 }
        )

    }
}

// Get All Single posts

export async function GET(req) {
    try {
        const result = await pool.query(`SELECT sp.* , u.username,u.profole_images
    FROM single_posts sp JOIN users u ON sp.user_id = u.user_id ORDER BY sp.created_at DESC`);

    return NextResponse.json({
        success:true,
        count:result.rows.length,
        posts:result.rows
    });

    } catch (error) {
        console.error("Error fetching single posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch single posts", details: error.message },
      { status: 500 }
    );

    }

}
import { NextResponse } from "next/server";
import pool from "../../../config/db.js";

// Add a like
export async function POST(req) {
    try {
        const { user_id, post_id } = await req.json();

        if (!user_id || !post_id)
            return NextResponse.json({ error: "user_id and post_id required" }, { status: 400 });
        console.log("Incoming like data:", user_id, post_id);


        const result = await pool.query(
            `INSERT INTO likes (user_id, post_id) VALUES ($1, $2) RETURNING *`,
            [user_id, post_id]
        );

        return NextResponse.json({ success: true, data: result.rows[0] });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}


// Get all likes for a post

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const post_id = searchParams.get("post_id");

        if (!post_id) {
            return NextResponse.json(
                { success: false, error: "post_id is required!" },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `SELECT * FROM likes WHERE post_id = $1 `, [post_id]);

        return NextResponse.json(
            {
                success: true,
                message: "Likes  added",
                count: result.rowCount,
                data: result.rows,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching likes:", error);
        return NextResponse.json(
            { success: false, error: "Error in fetching likes for this post!" },
            { status: 500 }
        );
    }
}

// Delete a like ,mean unnlike
export async function DELETE(req) {
    try {
        const { post_id, user_id } = await req.json();
        const result = await pool.query(`DELETE FROM likes WHERE user_id=$1 AND post_id=$2 RETURNING *`, [user_id, post_id]);
        return NextResponse.json(
            {
                success: true,
                message: "Likes deleted",
                count: result.rowCount,
                data: result.rows,
            },
            { status: 200 }
        );



    } catch (error) {
        return NextResponse.json({ error: "Delete like Error !" }, { status: 500 })

    }
}

























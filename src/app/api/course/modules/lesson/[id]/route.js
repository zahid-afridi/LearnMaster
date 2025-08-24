import { NextResponse } from "next/server";

import { validate as isUuid } from "uuid";
import pool from "../../../../../../../utils/db";


// GET course by id
export async function GET(req, { params }) {
    const { id } = params; // get id from route
    // 1. Validate UUID format
    if (!isUuid(id)) {
        return NextResponse.json(
            { success: false, error: "Invalid course ID format" },
            { status: 400 }
        );
    }
    try {

        const q = `
         
        SELECT
        l.*,
            --Contents
        COALESCE(lc.content, '[]':: json) as contents,
            --Resources
        COALESCE(lr.resources, '[]':: json) as resources,
            --Quizzes
        COALESCE(lq.quizzes, '[]':: json) as quizzes
            FROM lessons l
            LEFT JOIN(
            SELECT lesson_id,
            json_agg(
                json_build_object(
                    'type', type,
                    'text', text,
                    'code', code,
                    'language', language,
                    'src', src,
                    'alt', alt,
                    'level', level,
                    'order', "order"
                ) ORDER BY "order"
            ) as content
                FROM lesson_contents
                GROUP BY lesson_id
        ) lc ON l.lesson_id = lc.lesson_id
            LEFT JOIN(
            SELECT lesson_id,
            json_agg(
                json_build_object(
                    'type', type,
                    'title', title,
                    'url', url
                )
            ) as resources
                FROM lesson_resources
                GROUP BY lesson_id
        ) lr ON l.lesson_id = lr.lesson_id
            LEFT JOIN(
            SELECT lesson_id,
            json_agg(
                json_build_object(
                    'quiz_id', quiz_id,
                    'question', question,
                    'options', options,
                    'correctIndex', correct_index
                )
            ) as quizzes
                FROM lesson_quizzes
                GROUP BY lesson_id
        ) lq ON l.lesson_id = lq.lesson_id
            WHERE l.lesson_id = $1
        `;

        const result = await pool.query(q, [id])
        if (!result.rows[0]) {
            return NextResponse.json({ success: false, error: "Course not Found" }, { status: 404 });

        }
        return NextResponse.json({ success: true, data: result.rows }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });

    }
}

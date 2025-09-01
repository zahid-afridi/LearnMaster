import { NextResponse } from "next/server";

import { validate as isUuid } from "uuid";

import pool from "../../../../../../../utils/db";

export async function GET(req, { params }) {
    // Resolve route params
    const resolvedParams = await params;
    const { id } = resolvedParams; // lesson ID

    // Get optional query param userId
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // Validate IDs
    if (!isUuid(id)) {
        return NextResponse.json(
            { success: false, error: "Invalid lesson ID format" },
            { status: 400 }
        );
    }
    if (userId && !isUuid(userId)) {
        return NextResponse.json(
            { success: false, error: "Invalid user ID format" },
            { status: 400 }
        );
    }

    try {
        // Base query for lesson details
        let query = `
            SELECT 
                l.lesson_id,
                COALESCE(lc.content, '[]'::json) as contents,
                COALESCE(lr.resources, '[]'::json) as resources,
                COALESCE(lq.quizzes, '[]'::json) as quizzes
            FROM lessons l
            LEFT JOIN (
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
                    ) AS content
                FROM lesson_contents
                GROUP BY lesson_id
            ) lc ON l.lesson_id = lc.lesson_id
            LEFT JOIN (
                SELECT lesson_id,
                    json_agg(
                        json_build_object(
                            'type', type,
                            'title', title,
                            'url', url
                        )
                    ) AS resources
                FROM lesson_resources
                GROUP BY lesson_id
            ) lr ON l.lesson_id = lr.lesson_id
            LEFT JOIN (
                SELECT lesson_id,
                    json_agg(
                        json_build_object(
                            'quiz_id', quiz_id,
                            'question', question,
                            'options', options,
                            'correctIndex', correct_index
                        )
                    ) AS quizzes
                FROM lesson_quizzes
                GROUP BY lesson_id
            ) lq ON l.lesson_id = lq.lesson_id
            WHERE l.lesson_id = $1
        `;

        const values = [id];

        // If userId exists, include completion info
        if (userId) {
            query = `
                SELECT 
                    l.lesson_id,
                    COALESCE(lc.content, '[]'::json) as contents,
                    COALESCE(lr.resources, '[]'::json) as resources,
                    COALESCE(lq.quizzes, '[]'::json) as quizzes,
                    COALESCE(ulp.is_completed, false) as is_completed,
                    ulp.completed_at
                FROM lessons l
                LEFT JOIN (
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
                        ) AS content
                    FROM lesson_contents
                    GROUP BY lesson_id
                ) lc ON l.lesson_id = lc.lesson_id
                LEFT JOIN (
                    SELECT lesson_id,
                        json_agg(
                            json_build_object(
                                'type', type,
                                'title', title,
                                'url', url
                            )
                        ) AS resources
                    FROM lesson_resources
                    GROUP BY lesson_id
                ) lr ON l.lesson_id = lr.lesson_id
                LEFT JOIN (
                    SELECT lesson_id,
                        json_agg(
                            json_build_object(
                                'quiz_id', quiz_id,
                                'question', question,
                                'options', options,
                                'correctIndex', correct_index
                            )
                        ) AS quizzes
                    FROM lesson_quizzes
                    GROUP BY lesson_id
                ) lq ON l.lesson_id = lq.lesson_id
                LEFT JOIN user_lesson_progress ulp
                    ON l.lesson_id = ulp.lesson_id AND ulp.user_id = $2
                WHERE l.lesson_id = $1
            `;
            values.push(userId);
        }

        const result = await pool.query(query, values);

        if (!result.rows[0]) {
            return NextResponse.json(
                { success: false, error: "Lesson not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: result.rows }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

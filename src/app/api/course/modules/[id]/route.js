import { NextResponse } from "next/server";
import pool from "../../../../../../utils/db";
import { validate as isUuid } from "uuid";

export async function GET(req, { params }) {
    const { id } = params;
    const { userId } = Object.fromEntries(new URL(req.url).searchParams);
    console.log("userId:", userId);

    try {
        if (!isUuid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid course ID format" },
                { status: 400 }
            );
        }

        const q = `
            SELECT 
                c.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'module_id', m.module_id,
                            'title', m.title,
                            'slug', m.slug,
                            'description', m.description,
                            'order', m."order",
                            'lessons', COALESCE(
                                (SELECT json_agg(
                                    json_build_object(
                                        'lesson_id', l.lesson_id,
                                        'title', l.title,
                                        'slug', l.slug,
                                        'difficulty', l.difficulty,
                                        'estimated_time', l.estimated_time,
                                        'order', l."order",
                                        'published', l.published,
                                        'is_completed', ${userId
                ? `COALESCE((
                                                        SELECT ulp.is_completed
                                                        FROM user_lesson_progress ulp
                                                        WHERE ulp.lesson_id = l.lesson_id 
                                                        AND ulp.user_id = $2
                                                    ), false)`
                : `false`
            }
                                    ) ORDER BY l."order")
                                FROM lessons l 
                                WHERE l.module_id = m.module_id),
                                '[]'::json
                            )
                        ) ORDER BY m."order"
                    ) FILTER (WHERE m.module_id IS NOT NULL),
                    '[]'::json
                ) as modules
            FROM courses c
            LEFT JOIN modules m ON c.course_id = m.course_id
            WHERE c.course_id = $1
            GROUP BY c.course_id
        `;

        const result = await pool.query(
            q,
            userId ? [id, userId] : [id]
        );

        if (!result.rows[0]) {
            return NextResponse.json(
                { success: false, error: "Course not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

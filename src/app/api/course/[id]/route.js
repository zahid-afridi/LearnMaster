import { NextResponse } from "next/server";
import pool from "../../../../../utils/db";
import { validate as isUuid } from "uuid";


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
                c.*,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'module_id', m.module_id,
                            'title', m.title,
                            'slug', m.slug,
                            'description', m.description,
                            'order', m."order",
                            'lessons', m.lessons
                        ) ORDER BY m."order"
                    ) FILTER (WHERE m.module_id IS NOT NULL),
                    '[]'::json
                ) as modules
            FROM courses c
            LEFT JOIN (
                SELECT 
                    m.*,
                    COALESCE(
                        json_agg(
                            json_build_object(
                                'lesson_id', l.lesson_id,
                                'title', l.title,
                                'slug', l.slug,
                                'difficulty', l.difficulty,
                                'estimated_time', l.estimated_time,
                                'order', l."order",
                                'published', l.published,
                                'content', l.content,
                                'resources', l.resources,
                                'quizzes', l.quizzes,
                                'meta', l.meta
                            ) ORDER BY l."order"
                        ) FILTER (WHERE l.lesson_id IS NOT NULL),
                        '[]'::json
                    ) as lessons
                FROM modules m
                LEFT JOIN (
                    SELECT 
                        l.lesson_id,
                        l.module_id,
                        l.title,
                        l.slug,
                        l.difficulty,
                        
                        l.estimated_time,
                        l."order",
                        l.published,
                        l.created_at,
                        l.updated_at,
                        -- FIXED: Get content separately to avoid duplicates
                        COALESCE(lc.content, '[]'::json) as content,
                        -- FIXED: Get resources separately  
                        COALESCE(lr.resources, '[]'::json) as resources,
                        -- FIXED: Get quizzes separately
                        COALESCE(lq.quizzes, '[]'::json) as quizzes,
                        -- Meta
                        json_build_object(
                            'updatedAt', l.updated_at,
                            'createdAt', l.created_at
                        ) as meta
                    FROM lessons l
                    -- Separate subquery for content aggregation
                    LEFT JOIN (
                        SELECT 
                            lesson_id,
                            json_agg(
                                CASE 
                                    WHEN type = 'heading' THEN
                                        json_build_object(
                                            'type', type,
                                            'level', level,
                                            'text', text,
                                            'order', "order"
                                        )
                                    WHEN type = 'code' THEN
                                        json_build_object(
                                            'type', type,
                                            'language', language,
                                            'code', code,
                                            'order', "order"
                                        )
                                    WHEN type IN ('image','video') THEN
                                        json_build_object(
                                            'type', type,
                                            'src', src,
                                            'alt', alt,
                                            'order', "order"
                                        )
                                    WHEN type IN ('paragraph','note','warning') THEN
                                        json_build_object(
                                            'type', type,
                                            'text', text,
                                            'order', "order"
                                        )
                                    ELSE
                                        json_build_object(
                                            'type', type,
                                            'text', text,
                                            'level', level,
                                            'code', code,
                                            'language', language,
                                            'src', src,
                                            'alt', alt,
                                            'order', "order"
                                        )
                                END
                                ORDER BY "order"
                            ) as content
                        FROM lesson_contents
                        GROUP BY lesson_id
                    ) lc ON l.lesson_id = lc.lesson_id
                    -- Separate subquery for resources aggregation
                    LEFT JOIN (
                        SELECT 
                            lesson_id,
                            json_agg(
                                json_build_object(
                                    'type', type,
                                    'title', title,
                                    'url', url
                                )
                                ORDER BY resource_id
                            ) as resources
                        FROM lesson_resources
                        GROUP BY lesson_id
                    ) lr ON l.lesson_id = lr.lesson_id
                    -- Separate subquery for quizzes aggregation  
                    LEFT JOIN (
                        SELECT 
                            lesson_id,
                            json_agg(
                                json_build_object(
                                    'quiz_id', quiz_id,
                                    'question', question,
                                    'options', options,
                                    'correctIndex', correct_index
                                )
                                ORDER BY quiz_id
                            ) as quizzes
                        FROM lesson_quizzes
                        GROUP BY lesson_id
                    ) lq ON l.lesson_id = lq.lesson_id
                ) l ON m.module_id = l.module_id
                GROUP BY m.module_id
            ) m ON c.course_id = m.course_id
            WHERE c.course_id = $1
            GROUP BY c.course_id
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

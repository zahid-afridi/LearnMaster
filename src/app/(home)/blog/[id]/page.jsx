"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaHeart, FaLightbulb, FaShareAlt } from "react-icons/fa";

const TopReactionsBar = ({ likes, commentsCount }) => (
  <div className="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/80 backdrop-blur-md flex items-center justify-between px-4 py-3 border-y border-slate-200 dark:border-gray-700">
    <div className="flex items-center gap-5">
      <button className="group flex items-center gap-2 text-red-500 hover:text-red-600 transition">
        <FaHeart className="text-lg group-hover:scale-110 transition-transform" />
        <span className="font-semibold text-base">{likes}</span>
      </button>

      <a
        href="#comments"
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition"
      >
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12.76c0 1.634.123 3.253.357 4.831a2.2 2.2 0 002.394 1.831l1.583-.56c.715.275 1.545.38 2.454.38h4.51c1.282 0 2.484-.46 3.42-1.258l2.25-1.936a.75.75 0 00.12-.497V7.81c0-1.298-1.054-2.352-2.352-2.352h-11.43c-1.306 0-2.352 1.054-2.352 2.352v4.95z"
          />
        </svg>
        <span className="text-sm">{commentsCount} Comments</span>
      </a>
    </div>

    <button className="text-slate-500 hover:text-green-600 transition">
      <FaShareAlt className="text-lg" />
    </button>
  </div>
);

export default function SinglePostPage() {
  const { id } = useParams(); // get post_id from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/${id}`);
        const data = await res.json();
        if (data.success) {
          setPost(data.data);
        } else {
          console.error("Failed to fetch single post:", data.message);
        }
      } catch (err) {
        console.error("Error fetching single post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading post....
      </div>
    );

  if (!post)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Post not found.
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-slate-900 dark:text-white font-serif">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article className="space-y-10">
          {/* === TITLE + AUTHOR === */}
          <section className="space-y-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-3 border-y border-slate-200 dark:border-gray-700 py-3">
              <img
                src={post.profile_images || "https://i.pravatar.cc/150?img=68"}
                alt="author"
                className="h-12 w-12 rounded-full object-cover border-2"
              />
              <div>
                <p className="font-bold">{post.user_name || "Unknown Author"}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(post.created_at).toLocaleDateString()} · 5 min read
                </p>
              </div>
            </div>
          </section>

          {/* === REACTIONS === */}
          <TopReactionsBar likes={post.likes || 0} commentsCount={12} />

          {/* === FEATURED IMAGES === */}
          {Array.isArray(post.post_img) && post.post_img.length > 0 && (
            <div className="space-y-4">
              {post.post_img.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Post image ${index}`}
                  className="w-full rounded-xl shadow-md border border-slate-200 dark:border-gray-800"
                />
              ))}
            </div>
          )}

          {/* === MAIN CONTENT === */}
          <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
            <p>{post.content}</p>
          </div>
        </article>
      </main>
    </div>
  );
}

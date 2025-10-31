"use client";
import React, { useState, useEffect } from "react";

export default function LikeButton({ post_id, user_id }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  console.log("likesCount!",likeCount)
  const [loading, setLoading] = useState(false);

  // Fetch current like count & status
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`/api/likes?post_id=${post_id}`);
        const data = await res.json();

        if (data.success) {
          setLikeCount(data.count);

          // Check if the current user already liked
          const userLiked = data.data.some((like) => like.user_id === user_id);
          setLiked(userLiked);
        }
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };

    if (post_id && user_id) fetchLikes();
  }, [post_id, user_id]);

  //  Toggle like (add/remove)
  const handleToggleLike = async () => {
    if (loading) return;
    setLoading(true);

    // Optimistic update
    setLiked(!liked);
    setLikeCount((prev) => prev + (liked ? -1 : 1));

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, post_id }),
      });

      const data = await res.json();
      if (!data.success) {
        // Revert if failed
        setLiked(liked);
        setLikeCount((prev) => prev + (liked ? 1 : -1));
        console.error("Failed to toggle like:", data.message);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      // Revert if error
      setLiked(liked);
      setLikeCount((prev) => prev + (liked ? 1 : -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading}
      className="flex items-center space-x-1 group text-gray-500 hover:text-red-500 transition-colors"
    >
      <div className="p-2 rounded-full group-hover:bg-red-500/10">
        <span
          className={`material-symbols-outlined text-base ${
            liked ? "text-red-500" : ""
          }`}
        >
          {liked ? "favorite" : "favorite_border"}
        </span>
      </div>
      <span
        className={`text-xs ${
          liked ? "text-red-500 font-semibold" : "group-hover:text-red-500"
        } transition-colors`}
      >
        {likeCount}
      </span>
    </button>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function LikeButton({ post_id, initialCount }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount || 0);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);

  // Load initial like status
  useEffect(() => {
    if (!user.user_id) return;

    const fetchLikeStatus = async () => {
      try {
        const res = await fetch(`/api/likes?post_id=${post_id}&me=true`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data.success && typeof data.liked === "boolean") setLiked(data.liked);
      } catch (err) {
        console.error("Failed to fetch like status:", err);
      }
    };
    fetchLikeStatus();
  }, [post_id, user.user_id]);

  const handleToggleLike = async () => {
    if (loading || !user.user_id) return;
    setLoading(true);

    const previousLiked = liked;
    setLiked(!liked);
    setLikeCount((prev) => prev + (liked ? -1 : 1));

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ post_id }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to like/unlike post");
    } catch (err) {
      setLiked(previousLiked);
      setLikeCount((prev) => prev + (previousLiked ? 1 : -1));
      console.error("Like toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading}
      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
    >
      <span className={`material-symbols-outlined ${liked ? "text-red-500" : ""}`}>
        {liked ? "favorite" : "favorite_border"}
      </span>
      <span className="text-xs">{likeCount}</span>
    </button>
  );
}

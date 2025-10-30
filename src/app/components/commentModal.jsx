"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CornerDownRight, X } from "lucide-react";

export default function CommentModel() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([]); // dynamic comments
  const [newComment, setNewComment] = useState("");
  const modalRef = useRef(null);

  // Fetch all comments from backend
  const fetchAllComments = async () => {
    try {
      const res = await fetch("/api/comments", { method: "GET" });
      const data = await res.json();

      if (data.success) {
        console.log("All Comments:", data.data);
        setComments(data.data);
      } else {
        console.log(" No comments found or error:", data.message);
      }
    } catch (error) {
      console.error(" API Error:", error);
    }
  };

  useEffect(() => {
    fetchAllComments();
  }, []);

  // Close modal on outside click or ESC key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Local add comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCmt = {
      comment_id: Date.now(),
      username: "You",
      profile_images: "https://i.pravatar.cc/40?img=5",
      comment_text: newComment,
      created_at: "Just now",
    };

    // Update instantly in UI
    setComments([newCmt, ...comments]);
    setNewComment("");
  };

  return (
    <>
      {/* Comment Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 hover:text-blue-500 transition"
      >
        <MessageCircle size={20} />
        <span className="text-sm">{comments.length}</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Comments
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.comment_id}>
                      <div className="flex items-start gap-3">
                        <img
                          src={
                            comment.profile_images ||
                            "https://i.pravatar.cc/40?img=1"
                          }
                          alt={comment.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
                            <p className="font-semibold text-gray-800 dark:text-gray-100">
                              {comment.username}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {comment.comment_text}
                            </p>
                          </div>
                          <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <button className="hover:underline">Like</button>
                            <button className="hover:underline">Reply</button>
                            <span>
                              {new Date(comment.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 text-sm">
                    No comments yet.
                  </p>
                )}
              </div>

              {/* Input Box */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40?img=5"
                  alt="You"
                  className="w-10 h-10 rounded-full"
                />
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 outline-none text-sm text-gray-800 dark:text-gray-200"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

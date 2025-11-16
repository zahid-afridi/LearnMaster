"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SkeletonLoader() {
  const shimmer =
    "bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700";

  const SkeletonPost = () => (
    <motion.div
      className="p-4 border-b border-gray-200 dark:border-[#2F3336] flex space-x-3 animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Profile image */}
      <div className={`h-10 w-10 rounded-full ${shimmer}`} />

      {/* Post body */}
      <div className="flex-1 space-y-3">
        {/* Header (name + date) */}
        <div className="flex space-x-2">
          <div className={`h-3 w-24 rounded-md ${shimmer}`} />
          <div className={`h-3 w-16 rounded-md ${shimmer}`} />
        </div>

        {/* Title */}
        <div className={`h-4 w-2/3 rounded-md ${shimmer}`} />

        {/* Content lines */}
        <div className={`h-3 w-full rounded-md ${shimmer}`} />
        <div className={`h-3 w-5/6 rounded-md ${shimmer}`} />

        {/* Image placeholder */}
        <div className={`h-48 w-full rounded-xl ${shimmer}`} />

        {/* Icons */}
        <div className="flex justify-between mt-3">
          <div className={`h-4 w-4 rounded-full ${shimmer}`} />
          <div className={`h-4 w-4 rounded-full ${shimmer}`} />
          <div className={`h-4 w-4 rounded-full ${shimmer}`} />
          <div className={`h-4 w-4 rounded-full ${shimmer}`} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="divide-y divide-gray-200 dark:divide-[#2F3336]">
      {[...Array(3)].map((_, i) => (
        <SkeletonPost key={i} />
      ))}
    </div>
  );
}


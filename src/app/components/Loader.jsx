"use client";
import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col space-y-4 w-full max-w-3xl px-6 animate-pulse">
        {/* Title */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4 mx-auto"></div>

        {/* Author Section */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
        </div>

        {/* Reaction Bar */}
        <div className="flex justify-between items-center mt-6 border-y border-gray-200 dark:border-gray-700 py-3">
          <div className="flex gap-6">
            <div className="h-5 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-5 w-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Image Skeletons */}
        <div className="space-y-4 mt-6">
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-3 mt-6">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Bookmark, Share2, MessageCircle, Clock } from "lucide-react";
import * as React from "react";

interface LessonHeaderProps {
  title: string;
  readingTime: string;
  progress: number;
  isBookmarked: boolean;
  onBookmark: () => void;
  onShare: () => void;
  onComments: () => void;
}

function Progress({ value = 0 }: { value?: number }) {
  return (
    <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
      <div
        className="bg-blue-600 h-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function IconButton({
  onClick,
  children,
  active,
  className = "",
}: {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 text-sm rounded-md transition-colors
        hover:bg-gray-100 ${active ? "text-[#2563EB]" : "text-gray-600"} ${className}`}
    >
      {children}
    </button>
  );
}

export function LessonHeader({
  title,
  readingTime,
  progress,
  isBookmarked,
  onBookmark,
  onShare,
  onComments,
}: LessonHeaderProps) {
  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10 
  lg:ml-16">
      <div className="px-4 sm:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
          {/* Left Side */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-medium text-gray-900 mb-1 sm:mb-2 line-clamp-2">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{readingTime} read</span>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <IconButton onClick={onBookmark} active={isBookmarked}>
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              <span className="hidden xs:inline">Bookmark</span>
            </IconButton>

            <IconButton onClick={onShare}>
              <Share2 className="w-4 h-4" />
              <span className="hidden xs:inline">Share</span>
            </IconButton>

            <IconButton onClick={onComments}>
              <MessageCircle className="w-4 h-4" />
              <span className="hidden xs:inline">Comments</span>
            </IconButton>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-1 sm:space-y-2">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-gray-600">Lesson Progress</span>
            <span className="font-medium text-[#2563EB]">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="relative">
            <Progress value={progress} />

            {/* Action buttons inside progress bar */}
            <div className="absolute top-1/2 right-1 sm:right-2 -translate-y-1/2 flex gap-1 sm:gap-2">
              <button
                onClick={onBookmark}
                className={`p-1 rounded-full hover:bg-white/70 transition ${
                  isBookmarked ? "text-[#2563EB]" : "text-gray-600"
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                onClick={onShare}
                className="p-1 rounded-full hover:bg-white/70 text-gray-600 transition"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onComments}
                className="p-1 rounded-full hover:bg-white/70 text-gray-600 transition"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

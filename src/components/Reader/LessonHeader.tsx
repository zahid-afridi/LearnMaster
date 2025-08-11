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

// Tailwind-only Progress Bar
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

// Tailwind-only Button
function IconButton({
  onClick,
  children,
  active,
}: {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 text-sm rounded-md transition-colors
        hover:bg-gray-100 ${active ? "text-[#2563EB]" : "text-gray-600"}`}
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
    <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
      <div className="px-8 py-6">
        <div className="flex items-start justify-between mb-4">
          {/* Left Side */}
          <div className="flex-1">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">{title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{readingTime} read</span>
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2 ml-6">
            <IconButton onClick={onBookmark} active={isBookmarked}>
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
              Bookmark
            </IconButton>

            <IconButton onClick={onShare}>
              <Share2 className="w-4 h-4" />
              Share
            </IconButton>

            <IconButton onClick={onComments}>
              <MessageCircle className="w-4 h-4" />
              Comments
            </IconButton>
          </div>
        </div>

        {/* Progress Bar with Buttons Underneath */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Lesson Progress</span>
            <span className="text-sm font-medium text-[#2563EB]">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <Progress value={progress} />

            {/* Action buttons inside progress bar */}
            <div className="absolute top-1/2 right-2 -translate-y-1/2 flex gap-2">
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

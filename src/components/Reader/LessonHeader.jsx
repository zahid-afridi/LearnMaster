"use client";

import { useState } from "react";
import {
  Bookmark,
  Share2,
  MessageCircle,
  Clock,
  MoreHorizontal,
} from "lucide-react";

export function LessonHeader({
  HeaderData,
  progress,
  isBookmarked,
  onBookmark,
  onShare,
  onComments,
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-24 py-3 flex items-center justify-between gap-4">
        {/* Left: Title + Meta */}
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight line-clamp-2">
            {HeaderData.title}
          </h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{HeaderData.estimatedTime}</span>
            <span className="text-gray-400">•</span>
            <span className="capitalize">{HeaderData.difficulty}</span>
            <span className="text-gray-400">•</span>
            <span className="text-blue-600 font-medium">
              {Math.round(progress)}% complete
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          {/* Desktop */}
          <div className="hidden sm:flex gap-1">
            <button
              onClick={onBookmark}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm transition ${
                isBookmarked
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
              Save
            </button>
            <button
              onClick={onShare}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={onComments}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
            >
              <MessageCircle className="w-4 h-4" /> Discuss
            </button>
          </div>

          {/* Mobile */}
          <div className="sm:hidden flex items-center gap-1">
            <button
              onClick={onBookmark}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${
                isBookmarked
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
              />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-30">
                  <button
                    onClick={() => {
                      onShare();
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                  <button
                    onClick={() => {
                      onComments();
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <MessageCircle className="w-4 h-4" /> Discuss
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 lg:px-24 pb-3">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowMenu(false)}
        />
      )}
    </header>
  );
}

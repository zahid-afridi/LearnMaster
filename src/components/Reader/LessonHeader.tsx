"use client";

import { Bookmark, Share2, MessageCircle, Clock, MoreHorizontal } from "lucide-react";
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
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
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
  variant = "default"
}: {
  onClick: () => void;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  variant?: "default" | "mobile";
}) {
  const baseClasses = "flex items-center justify-center transition-all duration-200 rounded-lg";
  const variantClasses = variant === "mobile" 
    ? "w-8 h-8 hover:bg-gray-100 active:scale-95" 
    : "gap-1.5 px-2.5 py-1.5 text-sm hover:bg-gray-100 active:scale-95";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${active ? "text-blue-600 bg-blue-50" : "text-gray-600"} ${className}`}
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
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-20 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-24 py-3">
        {/* Main Header */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Side - Title & Meta */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{readingTime} read</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-600 font-medium">{Math.round(progress)}% complete</span>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-1">
            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-1">
              <IconButton onClick={onBookmark} active={isBookmarked}>
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                <span>Save</span>
              </IconButton>

              <IconButton onClick={onShare}>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </IconButton>

              <IconButton onClick={onComments}>
                <MessageCircle className="w-4 h-4" />
                <span>Discuss</span>
              </IconButton>
            </div>

            {/* Mobile Actions */}
            <div className="sm:hidden flex items-center gap-0.5">
              <IconButton onClick={onBookmark} active={isBookmarked} variant="mobile">
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              </IconButton>

              <div className="relative">
                <IconButton 
                  onClick={() => setShowMobileMenu(!showMobileMenu)} 
                  variant="mobile"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </IconButton>

                {/* Mobile Dropdown */}
                {showMobileMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[120px] z-30">
                    <button
                      onClick={() => {onShare(); setShowMobileMenu(false);}}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      onClick={() => {onComments(); setShowMobileMenu(false);}}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Discuss
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <Progress value={progress} />
        </div>
      </div>

      {/* Close mobile menu when clicking outside */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </div>
  );
}
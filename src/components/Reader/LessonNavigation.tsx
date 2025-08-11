"use client";

import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from "lucide-react";

// Enhanced Button Component
function Button({
  children,
  onClick,
  disabled,
  variant = "default",
  size = "md",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "outline" | "primary";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm sm:text-base",
    lg: "px-6 py-3 text-base"
  };

  const variantStyles = {
    outline: "border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 shadow-sm hover:shadow-md",
    default: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

interface LessonNavigationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  isCompleted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onMarkComplete: () => void;
}

export function LessonNavigation({
  hasPrevious,
  hasNext,
  isCompleted,
  onPrevious,
  onNext,
  onMarkComplete,
}: LessonNavigationProps) {
  return (
    <div className="border-t border-gray-100 bg-white sm:sticky sm:bottom-0">
      <div className="px-4 sm:px-8 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!hasPrevious}
              size="sm"
              className="flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            {/* Center Action */}
            {!isCompleted ? (
              <Button
                onClick={onMarkComplete}
                variant="primary"
                size="sm"
                className="flex-1 max-w-xs"
              >
                <CheckCircle className="w-4 h-4" />
                <span className="hidden xs:inline">Mark Complete</span>
                <span className="xs:hidden">Complete</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Completed</span>
              </div>
            )}

            {/* Next Button */}
            <Button
              variant={isCompleted ? "primary" : "outline"}
              onClick={onNext}
              disabled={!hasNext}
              size="sm"
              className="flex-shrink-0"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
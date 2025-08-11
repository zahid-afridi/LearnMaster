"use client";

import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

// Tailwind Button Component
function Button({
  children,
  onClick,
  disabled,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "outline";
  className?: string;
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles =
    variant === "outline"
      ? "border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
      : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} px-4 py-2 ${className}`}
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
    <div className="border-t border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Lesson
            </Button>

            {/* Complete & Continue + Next Button */}
            <div className="flex items-center gap-3">
              {!isCompleted && (
                <Button
                  onClick={onMarkComplete}
                  className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white shadow-sm transition-all duration-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete & Continue
                </Button>
              )}

              <Button
                variant={isCompleted ? "default" : "outline"}
                onClick={onNext}
                disabled={!hasNext}
                className={
                  isCompleted
                    ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                    : ""
                }
              >
                Next Lesson
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

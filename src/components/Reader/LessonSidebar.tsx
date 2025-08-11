"use client";

import * as React from "react";
import { CheckCircle, Clock, Lock, BookOpen } from "lucide-react";

// Badge Component
function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

// Progress Component (Tailwind only)
function Progress({ value = 0, className = "" }: { value?: number; className?: string }) {
  return (
    <div className={`bg-primary/20 relative h-2 w-full overflow-hidden rounded-full ${className}`}>
      <div
        className="bg-blue-600 h-full transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

// ScrollArea Component (simple custom scrollbar)
function ScrollArea({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent ${className}`}
      style={{ scrollbarWidth: "thin" }}
    >
      {children}
    </div>
  );
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  status: "completed" | "current" | "locked";
}

interface LessonSidebarProps {
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  currentLessonId: number;
  lessons: Lesson[];
  onLessonClick: (lessonId: number) => void;
}

export function LessonSidebar({
  courseTitle,
  totalLessons,
  completedLessons,
  currentLessonId,
  lessons,
  onLessonClick,
}: LessonSidebarProps) {
  const progressPercentage = (completedLessons / totalLessons) * 100;

  const getStatusIcon = (status: string, isActive: boolean) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "current":
        return <Clock className={`w-5 h-5 ${isActive ? "text-[#2563EB]" : "text-[#60A5FA]"}`} />;
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col">
      {/* Course Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-medium text-gray-900">{courseTitle}</h2>
            <p className="text-sm text-gray-500">{totalLessons} lessons</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Course Progress</span>
            <Badge className="bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]/20">
              {Math.round(progressPercentage)}%
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-gray-500">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
      </div>

      {/* Lessons List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {lessons.map((lesson) => {
            const isActive = lesson.id === currentLessonId;
            const isClickable = lesson.status !== "locked";

            return (
              <div
                key={lesson.id}
                onClick={() => isClickable && onLessonClick(lesson.id)}
                className={`
                  p-4 rounded-xl border transition-all duration-200
                  ${isActive
                    ? "bg-[#EFF6FF] border-[#2563EB]/30 shadow-sm"
                    : "bg-white border-gray-100 hover:bg-gray-50 hover:shadow-sm"}
                  ${!isClickable ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getStatusIcon(lesson.status, isActive)}</div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-sm font-medium ${
                        isActive ? "text-[#2563EB]" : "text-gray-900"
                      }`}
                    >
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{lesson.duration}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

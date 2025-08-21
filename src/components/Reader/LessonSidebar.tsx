"use client";

import * as React from "react";
import { CheckCircle, Clock, Lock, BookOpen, ChevronDown } from "lucide-react";

type Lesson = {
  id: string;
  title: string;
  duration?: string;
  estimatedTime: string;
  status: "completed" | "current" | "locked";
};

type Module = {
  title: string;
  lessons: Lesson[];
};

type LessonData = {
  metadata: {
    totalLessons: number;
    completedlesson: number;
  };
  modules: Module[];
};

type LessonSidebarProps = {
  lessonData: LessonData;
  setClickLesson: (lesson: Lesson) => void;
};

export function LessonSidebar({
  lessonData,
  setClickLesson,
}: LessonSidebarProps) {
  const totalLessons = lessonData.metadata.totalLessons;
  const completedLessons = lessonData.metadata.completedlesson;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  // ✅ Collapse state for modules (first module open by default)
  const [openModules, setOpenModules] = React.useState<Record<string, boolean>>(
    () => {
      if (!lessonData?.modules?.length) return {} as Record<string, boolean>;
      return { "module-0": true } as Record<string, boolean>; // 👈 keep first module open initially
    }
  );

  const toggleModule = (moduleKey: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey],
    }));
  };

  const onChevronKeyDown = (
    e: React.KeyboardEvent<SVGSVGElement>,
    moduleKey: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleModule(moduleKey);
    }
  };

  const getStatusIcon = (
    status: "completed" | "current" | "locked",
    isActive: boolean
  ) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "current":
        return (
          <Clock
            className={`w-5 h-5 ${
              isActive ? "text-[#2563EB]" : "text-[#60A5FA]"
            }`}
          />
        );
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const HandleLessonSelect = (lesson: Lesson) => {
    setClickLesson(lesson);
  };

  return (
    <div className="w-72 sm:w-80 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col">
      {/* Course Header */}
      <div className="p-4 sm:p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="font-medium text-gray-900 text-sm sm:text-base">
              React Course
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {totalLessons} lessons
            </p>
          </div>
        </div>

        {/* ✅ Dynamic Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-600">
              Course Progress
            </span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]/20">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-blue-600 h-full transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-[10px] sm:text-xs text-gray-500">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
      </div>

      {/* Modules + Lessons */}
      <div
        className="flex-1 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="p-4 space-y-5">
          {lessonData.modules.map((module, index) => {
            const moduleKey = `module-${index}`;
            return (
              <div
                key={moduleKey}
                className="border rounded-xl overflow-hidden shadow-sm"
              >
                {/* Module Header */}
                <div
                  className="flex items-center justify-between px-3 py-2 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => toggleModule(moduleKey)}
                >
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                    {module.title}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openModules[moduleKey] ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Lessons inside Module */}
                {openModules[moduleKey] && (
                  <div className="divide-y">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={`lesson-${lessonIndex}`}
                        onClick={() => HandleLessonSelect(lesson)}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <div className="flex-shrink-0">
                          {getStatusIcon(lesson.status, true)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-800 truncate">
                            {lesson.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {lesson.estimatedTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import { CheckCircle, Clock, Lock, BookOpen, ChevronDown } from "lucide-react";

// export function LessonSidebar({ course, setClickLesson }) {
//   console.log("course", course);

//   // total lessons comes directly from course
//   const totalLessons = course.total_lessons || 0;
//   const completedLessons = course.completed_lessons || 0; // you can pass this from backend
//   const progressPercentage =
//     totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

//   // ✅ Collapse state for modules (first module open by default)
//   const [openModules, setOpenModules] = useState(() => {
//     if (!course?.modules?.length) return {};
//     return { "module-0": true };
//   });

//   const toggleModule = (moduleKey) => {
//     setOpenModules((prev) => ({
//       ...prev,
//       [moduleKey]: !prev[moduleKey],
//     }));
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed":
//         return <CheckCircle className="w-5 h-5 text-green-500" />;
//       case "current":
//         return <Clock className="w-5 h-5 text-blue-500" />;
//       case "locked":
//         return <Lock className="w-5 h-5 text-gray-400" />;
//       default:
//         return <Clock className="w-5 h-5 text-gray-400" />;
//     }
//   };

//   const HandleLessonSelect = (lesson) => {
//     // console.log(lesson)
//     setClickLesson(lesson);
//   };

//   return (
//     <div className="w-72 sm:w-80 bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col">
//       {/* Course Header */}
//       <div className="p-4 sm:p-6 border-b border-gray-100">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2563EB] rounded-lg flex items-center justify-center">
//             <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//           </div>
//           <div>
//             <h2 className="font-medium text-gray-900 text-sm sm:text-base">
//               {course.title}
//             </h2>
//             <p className="text-xs sm:text-sm text-gray-500">
//               {totalLessons} lessons
//             </p>
//           </div>
//         </div>

//         {/* Progress */}
//         <div className="space-y-2">
//           <div className="flex justify-between items-center">
//             <span className="text-xs sm:text-sm text-gray-600">
//               Course Progress
//             </span>
//             <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-[#EFF6FF] text-[#2563EB] border-[#2563EB]/20">
//               {Math.round(progressPercentage)}%
//             </span>
//           </div>
//           <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
//             <div
//               className="bg-blue-600 h-full transition-all"
//               style={{ width: `${progressPercentage}%` }}
//             />
//           </div>
//           <p className="text-[10px] sm:text-xs text-gray-500">
//             {completedLessons} of {totalLessons} lessons completed
//           </p>
//         </div>
//       </div>

//       {/* Modules + Lessons */}
//       <div
//         className="flex-1 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
//         style={{ scrollbarWidth: "thin" }}
//       >
//         <div className="p-4 space-y-5">
//           {course.modules?.map((module, index) => {
//             const moduleKey = `module-${index}`;
//             return (
//               <div
//                 key={moduleKey}
//                 className="border rounded-xl overflow-hidden shadow-sm"
//               >
//                 {/* Module Header */}
//                 <div
//                   className="flex items-center justify-between px-3 py-2 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
//                   onClick={() => toggleModule(moduleKey)}
//                 >
//                   <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
//                     {module.title}
//                   </h3>
//                   <ChevronDown
//                     className={`w-5 h-5 text-gray-500 transform transition-transform ${openModules[moduleKey] ? "rotate-180" : ""
//                       }`}
//                   />
//                 </div>

//                 {/* Lessons inside Module */}
//                 {openModules[moduleKey] && (
//                   <div className="divide-y">
//                     {module.lessons?.map((lesson, lessonIndex) => (
//                       <div
//                         key={`lesson-${lessonIndex}`}
//                         onClick={() => HandleLessonSelect(lesson)}
//                         className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition cursor-pointer"
//                       >
//                         <div className="flex-shrink-0">
//                           {getStatusIcon(lesson.status)}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h4 className="text-sm font-medium text-gray-800 truncate">
//                             {lesson.title}
//                           </h4>
//                           <p className="text-xs text-gray-500">
//                             {lesson.estimated_time || "—"}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { CheckCircle, Clock, Lock, BookOpen, ChevronDown, Star, Play, Award } from "lucide-react";

export function LessonSidebar({ course, setClickLesson }) {
  const totalLessons = course.total_lessons || 0;
  const completedLessons = course.completed_lessons || 0;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  // Collapse state for modules (first module open by default)
  const [openModules, setOpenModules] = useState(() => {
    if (!course?.modules?.length) return {};
    return { "module-0": true };
  });

  const [hoveredLesson, setHoveredLesson] = useState(null);

  const toggleModule = (moduleKey) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey],
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "current":
        return <Play className="w-5 h-5 text-indigo-500" />;
      case "locked":
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const HandleLessonSelect = (lesson) => {
    setClickLesson(lesson);
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 border-r border-slate-200/60 h-screen sticky top-0 flex flex-col ">
      {/* Enhanced Course Header with Glass Effect */}
      <div className="p-6 border-b    relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-slate-900 text-base leading-tight">
                {course.title}
              </h2>
              <p className="text-sm text-slate-600 ">
                {totalLessons} lessons • Premium Course
              </p>
            </div>
          </div>

          {/* Enhanced Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                Course Progress
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="relative">
              <div className="bg-slate-200 h-3 w-full overflow-hidden rounded-full shadow-inner">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 h-full transition-all duration-700 ease-out shadow-sm relative overflow-hidden"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Progress indicator dot */}
              {progressPercentage > 0 && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow-lg transition-all duration-700 ease-out"
                  style={{ left: `calc(${progressPercentage}% - 8px)` }}
                >
                  <div className="w-2 h-2 bg-indigo-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">
                {completedLessons} of {totalLessons} completed
              </span>
              <div className="flex items-center gap-1 text-emerald-600">
                <Award className="w-3 h-3" />
                <span className="font-medium">
                  {Math.round((completedLessons / totalLessons) * 100) || 0} XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modules + Lessons */}
      <div className="flex-1 relative overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300/50 scrollbar-track-transparent hover:scrollbar-thumb-slate-400/50">
        <div className="p-4 space-y-6">
          {course.modules?.map((module, index) => {
            const moduleKey = `module-${index}`;
            const isOpen = openModules[moduleKey];

            return (
              <div
                key={moduleKey}
                className="group relative"
              >
                {/* Module Container with Glass Effect */}
                <div className="bg-white/60 backdrop-blur-sm border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:border-indigo-200/60">

                  {/* Module Header */}
                  <div
                    className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-50/80 to-white/80 hover:from-indigo-50/80 hover:to-purple-50/40 transition-all duration-300 cursor-pointer group/header"
                    onClick={() => toggleModule(moduleKey)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 group-hover/header:from-indigo-500 group-hover/header:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md">
                        <span className="text-white text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-800 text-base group-hover/header:text-indigo-700 transition-colors duration-300">
                        {module.title}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 group-hover/header:text-indigo-600 transform transition-all duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </div>

                  {/* Lessons inside Module */}
                  {isOpen && (
                    <div className="divide-y divide-slate-100/60 bg-white/40 backdrop-blur-sm">
                      {module.lessons?.map((lesson, lessonIndex) => {
                        const lessonKey = `lesson-${index}-${lessonIndex}`;
                        const isHovered = hoveredLesson === lessonKey;

                        return (
                          <div
                            key={lessonKey}
                            onClick={() => HandleLessonSelect(lesson)}
                            onMouseEnter={() => setHoveredLesson(lessonKey)}
                            onMouseLeave={() => setHoveredLesson(null)}
                            className="group/lesson relative flex items-center  gap-4 px-6 py-4 hover:bg-gradient-to-r hover:from-indigo-50/60 hover:to-purple-50/40 transition-all duration-200 cursor-pointer"
                          >
                            {/* Status Icon with Enhanced Styling */}
                            <div className="flex-shrink-0 relative">
                              {getStatusIcon(lesson.status)}

                              {/* Pulse effect for current lesson */}
                              {lesson.status === 'current' && (
                                <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-pulse"></div>
                              )}
                            </div>

                            {/* Lesson Content */}
                            <div className="flex-1 min-w-0 ">
                              <h4 className="text-sm font-semibold text-slate-800 group-hover/lesson:text-indigo-700 transition-colors duration-200 truncate">
                                {lesson.title}
                              </h4>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs text-slate-500 group-hover/lesson:text-indigo-600 transition-colors duration-200">
                                  {lesson.estimated_time || "5 min"}
                                </span>
                                {lesson.status === 'completed' && (
                                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                    <CheckCircle className="w-3 h-3" />
                                    Done
                                  </span>
                                )}
                                {lesson.status === 'current' && (
                                  <span className="inline-flex items-center gap-1 text-xs text-indigo-600 font-medium">
                                    <Play className="w-3 h-3" />
                                    Continue
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Hover indicator */}
                            <div className={`w-1 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full transition-all duration-200 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                              }`}></div>

                            {/* Lesson number */}
                            <div className="text-xs text-slate-400 group-hover/lesson:text-indigo-500 transition-colors duration-200 font-medium">
                              {lessonIndex + 1}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Footer with Achievement */}
      <div className="p-6 border-t border-slate-200/6 bg-white/70 backdrop-blur-xl">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-emerald-800">Keep it up!</h4>
              <p className="text-xs text-emerald-600 mt-0.5">
                You're making great progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
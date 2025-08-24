// "use client";

// import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

// // Enhanced Button Component
// function Button({
//   children,
//   onClick,
//   disabled,
//   variant = "default",
//   size = "md",
//   className = "",
// }) {
//   const baseStyles =
//     "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";

//   const sizeStyles = {
//     sm: "px-3 py-2 text-sm",
//     md: "px-4 py-2.5 text-sm sm:text-base",
//     lg: "px-6 py-3 text-base",
//   };

//   const variantStyles = {
//     outline:
//       "border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 shadow-sm hover:shadow-md",
//     default:
//       "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
//     primary:
//       "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
//   };

//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// // Lesson Navigation Component
// export function LessonNavigation({
//   hasPrevious,
//   hasNext,
//   isCompleted,
//   onPrevious,
//   onNext,
//   onMarkComplete,
// }) {
//   return (
//     <div className="border-t border-gray-100 bg-white sm:sticky sm:bottom-0">
//       <div className="px-4 sm:px-8 py-3">
//         <div className="max-w-3xl mx-auto">
//           <div className="flex items-center justify-between gap-3">
//             {/* Previous Button */}
//             <Button
//               variant="outline"
//               onClick={onPrevious}
//               disabled={!hasPrevious}
//               size="sm"
//               className="flex-shrink-0"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span className="hidden sm:inline">Previous</span>
//             </Button>

//             {/* Center Action */}
//             {!isCompleted ? (
//               <Button
//                 onClick={onMarkComplete}
//                 variant="primary"
//                 size="sm"
//                 className="flex-1 max-w-xs"
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 <span className="hidden xs:inline">Mark Complete</span>
//                 <span className="xs:hidden">Complete</span>
//               </Button>
//             ) : (
//               <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
//                 <CheckCircle className="w-4 h-4" />
//                 <span className="hidden sm:inline">Completed</span>
//               </div>
//             )}

//             {/* Next Button */}
//             <Button
//               variant={isCompleted ? "primary" : "outline"}
//               onClick={onNext}
//               disabled={!hasNext}
//               size="sm"
//               className="flex-shrink-0"
//             >
//               <span className="hidden sm:inline">Next</span>
//               <ChevronRight className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { ChevronLeft, ChevronRight, CheckCircle, Play, Trophy, Zap, ArrowRight } from "lucide-react";

// Enhanced Button Component with Modern Design
function Button({
  children,
  onClick,
  disabled,
  variant = "default",
  size = "md",
  className = "",
  icon,
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2.5 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-2 shadow-lg hover:shadow-xl relative overflow-hidden group";

  const sizeStyles = {
    sm: "px-4 py-2.5 text-sm h-10",
    md: "px-6 py-3 text-sm sm:text-base h-12",
    lg: "px-8 py-4 text-base h-14",
  };

  const variantStyles = {
    outline:
      "border-2 border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-indigo-300 text-slate-700 hover:text-indigo-600 focus:ring-indigo-500/20 hover:shadow-indigo-100",
    default:
      "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white focus:ring-indigo-500/30",
    primary:
      "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white focus:ring-purple-500/30",
    success:
      "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white focus:ring-emerald-500/30",
    glass:
      "bg-white/20 backdrop-blur-xl border border-white/30 text-slate-700 hover:bg-white/30 hover:border-white/50 focus:ring-white/20",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Button content */}
      <div className="relative flex items-center gap-2.5">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </div>
    </button>
  );
}

// Progress Indicator Component
function ProgressIndicator({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl border border-slate-200/60">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xs font-bold">{current}</span>
        </div>
        <span>of</span>
        <span className="text-slate-500">{total}</span>
      </div>

      {/* Mini progress bar */}
      <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

// Lesson Navigation Component
export function LessonNavigation({
  hasPrevious,
  hasNext,
  isCompleted,
  onPrevious,
  onNext,
  onMarkComplete,
  currentLesson,
  totalLessons,
}) {
  return (
    <div className="border-t border-slate-200/60 bg-white/80 backdrop-blur-2xl sticky bottom-0 z-20">
      {/* Navigation Bar */}
      <div className="px-6 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-6">
            {/* Left: Previous Button */}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={!hasPrevious}
                size="md"
                className={`${!hasPrevious ? 'opacity-40' : ''} min-w-[120px]`}
                icon={<ChevronLeft className="w-5 h-5" />}
              >
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>

              {/* Progress indicator - hidden on mobile */}
              {currentLesson && totalLessons && (
                <div className="hidden md:block">
                  <ProgressIndicator current={currentLesson} total={totalLessons} />
                </div>
              )}
            </div>

            {/* Center: Action Button */}
            <div className="flex-1 flex justify-center">
              {!isCompleted ? (
                <Button
                  onClick={onMarkComplete}
                  variant="primary"
                  size="lg"
                  className="min-w-[200px] shadow-2xl hover:shadow-purple-200"
                  icon={<CheckCircle className="w-5 h-5" />}
                >
                  <span className="hidden xs:inline">Mark as Complete</span>
                  <span className="xs:hidden">Complete</span>
                  <Zap className="w-4 h-4 ml-1 animate-pulse" />
                </Button>
              ) : (
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-emerald-700">
                    <div className="font-bold text-sm">Lesson Completed!</div>
                    <div className="text-xs text-emerald-600">Great job! 🎉</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Next Button */}
            <div className="flex items-center gap-4">
              {/* Mobile progress indicator */}
              {currentLesson && totalLessons && (
                <div className="block md:hidden">
                  <div className="text-xs text-slate-600 text-center">
                    <div className="font-medium">{currentLesson}/{totalLessons}</div>
                  </div>
                </div>
              )}

              <Button
                variant={isCompleted ? "success" : "glass"}
                onClick={onNext}
                disabled={!hasNext}
                size="md"
                className={`${!hasNext ? 'opacity-40' : ''} min-w-[120px]`}
                icon={hasNext ? <ArrowRight className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              >
                <span className="hidden sm:inline">
                  {hasNext ? 'Next Lesson' : 'Finished'}
                </span>
                <span className="sm:hidden">
                  {hasNext ? 'Next' : 'Done'}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar at Bottom */}
      {currentLesson && totalLessons && (
        <div className="px-6 lg:px-8 pb-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${(currentLesson / totalLessons) * 100}%` }}
                >
                  {/* Animated shimmer */}
                  <div className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>

              {/* Progress dots */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
                {Array.from({ length: Math.min(totalLessons, 10) }, (_, i) => {
                  const lessonNum = Math.floor((i * totalLessons) / Math.min(totalLessons, 10)) + 1;
                  const isActive = currentLesson >= lessonNum;

                  return (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 scale-125'
                          : 'bg-slate-300'
                        }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Progress text */}
            <div className="flex justify-between items-center mt-3 text-xs text-slate-600">
              <span className="font-medium">Course Progress</span>
              <span className="font-bold">
                {Math.round((currentLesson / totalLessons) * 100)}% Complete
              </span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </div>
  );
}

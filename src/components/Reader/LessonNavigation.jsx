


"use client";

import { ChevronLeft, ChevronRight, CheckCircle, Trophy, Zap, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoginModal from '../Login/LoginModal'
import { useDispatch } from "react-redux";
import { setShowLogin } from "@/redux/slices/course/ShowLogin";

// Reusable Button
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
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 shadow-md hover:shadow-lg relative overflow-hidden group";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs h-8",
    md: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
  };

  const variantStyles = {
    outline:
      "border border-slate-200 bg-white/70 backdrop-blur-sm hover:bg-white hover:border-indigo-300 text-slate-700 hover:text-indigo-600 focus:ring-indigo-400/30",
    default:
      "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white focus:ring-indigo-400/40",
    primary:
      "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 text-white focus:ring-purple-400/40",
    success:
      "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white focus:ring-emerald-400/40",
    glass:
      "bg-white/30 backdrop-blur-md border border-white/40 text-slate-700 hover:bg-white/50 focus:ring-white/20",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {/* Light shimmer effect */}
      <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>

      <div className="relative flex items-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </div>
    </button>
  );
}

// Compact Progress Indicator
function ProgressIndicator({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-lg border border-slate-200/60">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
        <div className="w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">{current}</span>
        </div>
        <span>of</span>
        <span className="text-slate-500">{total}</span>
      </div>

      {/* Mini progress bar */}
      <div className="w-16 h-1 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Lesson Navigation Component
export function LessonNavigation({
  loading,
  hasPrevious,
  hasNext,
  isCompleted,
  onPrevious,
  onNext,
  onMarkComplete,
  currentLesson,
  totalLessons,
}) {
  const dispatch=useDispatch()
  const { data: session } = useSession();
  const userId = session?.user?.user_id;

  const handleShowLogin=()=>{
    dispatch(setShowLogin(true))
  }
  if (loading) {
    return null
  }
  return (
    <>
      
      <div className="border-t border-slate-200/70 bg-white/80 backdrop-blur-xl sticky bottom-0 z-20">
        <div className="px-4 lg:px-6 py-2">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Previous Button + Progress */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  size="sm"
                  className={`${!hasPrevious ? "opacity-40" : ""} min-w-[90px]`}
                  icon={<ChevronLeft className="w-4 h-4" />}
                >
                  <span className="hidden sm:inline">Previous</span>
                  <span className="sm:hidden">Prev</span>
                </Button>

                {/* Progress indicator (desktop only) */}
                {currentLesson && totalLessons && (
                  <div className="hidden md:block">
                    <ProgressIndicator current={currentLesson} total={totalLessons} />
                  </div>
                )}
              </div>

              {/* Center: Complete Button / Status */}
              {/* Center: Complete Button / Status */}
              <div className="flex-1 flex justify-center">
                {!session ? (
                  // 🔹 If user is not logged in, show motivational login prompt
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-slate-600 font-medium">
                      🚀 Login to save progress
                    </p>
                    <Button
                      onClick={handleShowLogin}
                      variant="primary"
                      size="md"
                      className="min-w-[160px] cursor-pointer"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Login Now
                    </Button>
                  </div>
                ) : (
                  // 🔹 Show normal completion status if logged in
                  !isCompleted ? (
                    <Button
                      onClick={onMarkComplete}
                      variant="primary"
                      size="md"
                      className="min-w-[160px] cursor-pointer"
                      icon={<CheckCircle className="w-4 h-4" />}
                    >
                      <span className="hidden xs:inline">Mark Complete</span>
                      <span className="xs:hidden">Complete</span>
                      <Zap className="w-3 h-3 ml-1 animate-pulse" />
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-md flex items-center justify-center">
                        <Trophy className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="text-emerald-700 text-xs font-medium">
                        Lesson Completed 🎉
                      </div>
                    </div>
                  )
                )}
              </div>


              {/* Right: Next Button + Mobile Progress */}
              <div className="flex items-center gap-3">
                {currentLesson && totalLessons && (
                  <div className="block md:hidden text-[11px] text-slate-600 text-center">
                    <div className="font-medium">{currentLesson}/{totalLessons}</div>
                  </div>
                )}

                <Button
                  variant={isCompleted ? "success" : "glass"}
                  onClick={onNext}
                  disabled={!hasNext}
                  size="sm"
                  className={`${!hasNext ? "opacity-40" : ""} min-w-[90px]`}
                  icon={hasNext ? <ArrowRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                >
                  <span className="hidden sm:inline">
                    {hasNext ? "Next" : "Finished"}
                  </span>
                  <span className="sm:hidden">{hasNext ? "Next" : "Done"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress Bar */}
        {currentLesson && totalLessons && (
          <div className="px-4 lg:px-6 pb-1">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-700 ease-out relative"
                    style={{ width: `${(currentLesson / totalLessons) * 100}%` }}
                  >
                    <div className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                  </div>
                </div>

                {/* Progress dots */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
                  {Array.from({ length: Math.min(totalLessons, 8) }, (_, i) => {
                    const lessonNum = Math.floor((i * totalLessons) / Math.min(totalLessons, 8)) + 1;
                    const isActive = currentLesson >= lessonNum;
                    return (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 scale-110"
                          : "bg-slate-300"
                          }`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Progress text */}
              <div className="flex justify-between items-center mt-2 text-[11px] text-slate-600">
                <span className="font-medium">Course Progress</span>
                <span className="font-bold">
                  {Math.round((currentLesson / totalLessons) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
      `}</style>
      </div>


    </>
  );
}

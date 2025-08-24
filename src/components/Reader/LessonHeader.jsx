// "use client";

// import { useState } from "react";
// import {
//   Bookmark,
//   Share2,
//   MessageCircle,
//   Clock,
//   MoreHorizontal,
// } from "lucide-react";

// export function LessonHeader({
//   HeaderData,
//   progress,
//   isBookmarked,
//   onBookmark,
//   onShare,
//   onComments,
// }) {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
//       <div className="px-4 sm:px-6 lg:px-24 py-3 flex items-center justify-between gap-4">
//         {/* Left: Title + Meta */}
//         <div className="flex-1 min-w-0">
//           <h1 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight line-clamp-2">
//             {HeaderData.title}
//           </h1>
//           <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
//             <Clock className="w-4 h-4" />
//             <span>{HeaderData.estimatedTime}</span>
//             <span className="text-gray-400">•</span>
//             <span className="capitalize">{HeaderData.difficulty}</span>
//             <span className="text-gray-400">•</span>
//             <span className="text-blue-600 font-medium">
//               {Math.round(progress)}% complete
//             </span>
//           </div>
//         </div>

//         {/* Right: Actions */}
//         <div className="flex items-center gap-1">
//           {/* Desktop */}
//           <div className="hidden sm:flex gap-1">
//             <button
//               onClick={onBookmark}
//               className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm transition ${
//                 isBookmarked
//                   ? "text-blue-600 bg-blue-50"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               <Bookmark
//                 className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
//               />
//               Save
//             </button>
//             <button
//               onClick={onShare}
//               className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
//             >
//               <Share2 className="w-4 h-4" /> Share
//             </button>
//             <button
//               onClick={onComments}
//               className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition"
//             >
//               <MessageCircle className="w-4 h-4" /> Discuss
//             </button>
//           </div>

//           {/* Mobile */}
//           <div className="sm:hidden flex items-center gap-1">
//             <button
//               onClick={onBookmark}
//               className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${
//                 isBookmarked
//                   ? "text-blue-600 bg-blue-50"
//                   : "text-gray-600 hover:bg-gray-100"
//               }`}
//             >
//               <Bookmark
//                 className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
//               />
//             </button>
//             <div className="relative">
//               <button
//                 onClick={() => setShowMenu(!showMenu)}
//                 className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition"
//               >
//                 <MoreHorizontal className="w-4 h-4" />
//               </button>
//               {showMenu && (
//                 <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-30">
//                   <button
//                     onClick={() => {
//                       onShare();
//                       setShowMenu(false);
//                     }}
//                     className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                   >
//                     <Share2 className="w-4 h-4" /> Share
//                   </button>
//                   <button
//                     onClick={() => {
//                       onComments();
//                       setShowMenu(false);
//                     }}
//                     className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                   >
//                     <MessageCircle className="w-4 h-4" /> Discuss
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Progress Bar */}
//       <div className="px-4 sm:px-6 lg:px-24 pb-3">
//         <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>

//       {/* Backdrop for mobile menu */}
//       {showMenu && (
//         <div
//           className="fixed inset-0 z-10"
//           onClick={() => setShowMenu(false)}
//         />
//       )}
//     </header>
//   );
// }


"use client";

import { useState } from "react";
import {
  Bookmark,
  Share2,
  MessageCircle,
  Clock,
  MoreHorizontal,
  Star,
  Trophy,
  Zap,
  Heart
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
  const [likeAnimation, setLikeAnimation] = useState(false);

  const handleBookmark = () => {
    setLikeAnimation(true);
    setTimeout(() => setLikeAnimation(false), 600);
    onBookmark();
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'from-emerald-500 to-green-600';
    if (progress >= 75) return 'from-indigo-500 to-purple-600';
    if (progress >= 50) return 'from-blue-500 to-indigo-600';
    return 'from-slate-400 to-slate-500';
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-2xl border-b border-slate-200/60 shadow-sm">
      {/* Main Header Content */}
      <div className="px-6 lg:px-8 py-6">
        <div className="flex items-start justify-between gap-6">
          {/* Left: Title + Meta Information */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Title with Gradient */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                {HeaderData.title}
              </h1>

              {/* Enhanced Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {/* Duration */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-xl">
                  <Clock className="w-4 h-4 text-slate-600" />
                  <span className="font-medium text-slate-700">
                    {HeaderData.estimatedTime || HeaderData.estimated_time || '10 min'}
                  </span>
                </div>

                {/* Difficulty Badge */}
                <div className={`flex items-center gap-2 px-3 py-1.5 border rounded-xl font-medium ${getDifficultyColor(HeaderData.difficulty)}`}>
                  <Star className="w-4 h-4" />
                  <span className="capitalize">
                    {HeaderData.difficulty || 'Intermediate'}
                  </span>
                </div>

                {/* Progress Badge with Animation */}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                  <div className="relative">
                    <Trophy className="w-4 h-4 text-indigo-600" />
                    {progress >= 100 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className="font-bold text-indigo-700">
                    {Math.round(progress)}% complete
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Enhanced Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Desktop Actions */}
            <div className="hidden sm:flex gap-2">
              {/* Bookmark Button with Animation */}
              <button
                onClick={handleBookmark}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 transform ${isBookmarked
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-105 shadow-sm hover:shadow-md"
                  } ${likeAnimation ? 'animate-bounce' : ''}`}
              >
                <Bookmark
                  className={`w-4 h-4 transition-all duration-300 ${isBookmarked ? "fill-current scale-110" : "group-hover:scale-110"
                    }`}
                />
                <span>{isBookmarked ? "Saved" : "Save"}</span>
                {isBookmarked && <Heart className="w-4 h-4 fill-current animate-pulse" />}
              </button>

              {/* Share Button */}
              <button
                onClick={onShare}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Share</span>
              </button>

              {/* Comments Button */}
              <button
                onClick={onComments}
                className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
              >
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Discuss</span>
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="sm:hidden flex items-center gap-2">
              <button
                onClick={handleBookmark}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 transform ${isBookmarked
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-105 shadow-sm"
                  } ${likeAnimation ? 'animate-bounce' : ''}`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105 shadow-sm"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-xl py-2 min-w-[140px] z-40 animate-in slide-in-from-top-2 duration-200">
                    <button
                      onClick={() => {
                        onShare();
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                    <button
                      onClick={() => {
                        onComments();
                        setShowMenu(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
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
      </div>

      {/* Enhanced Progress Bar Section */}
      <div className="px-6 lg:px-8 pb-4">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden shadow-inner">
            {/* Progress Fill with Gradient and Animation */}
            <div
              className={`h-full bg-gradient-to-r ${getProgressColor(progress)} transition-all duration-1000 ease-out relative overflow-hidden shadow-sm`}
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -skew-x-12 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]"></div>

              {/* Pulse effect for active progress */}
              {progress > 0 && progress < 100 && (
                <div className="absolute right-0 top-0 w-4 h-full bg-white/30 blur-sm animate-pulse"></div>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          {progress > 0 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
              style={{ left: `${Math.min(progress, 95)}%` }}
            >
              <div className={`w-6 h-6 rounded-full border-3 border-white shadow-lg flex items-center justify-center ${progress >= 100
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600'
                }`}>
                {progress >= 100 ? (
                  <Trophy className="w-3 h-3 text-white" />
                ) : (
                  <Zap className="w-3 h-3 text-white" />
                )}
              </div>

              {/* Completion celebration */}
              {progress >= 100 && (
                <div className="absolute inset-0 animate-ping">
                  <div className="w-6 h-6 rounded-full bg-emerald-400/50"></div>
                </div>
              )}
            </div>
          )}

          {/* Progress Text */}
          <div className="flex justify-between items-center mt-3 text-xs text-slate-600">
            <span className="font-medium">Progress</span>
            <span className="font-bold">
              {Math.round(progress)}% of lesson completed
            </span>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/5 backdrop-blur-sm"
          onClick={() => setShowMenu(false)}
        />
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </header>
  );
}

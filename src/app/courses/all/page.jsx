"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function YouTubeLikeCourses() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    GetCourseMeta();
  }, []);

  const GetCourseMeta = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/course", {
        method: "GET",
      });
      const data = await res.json();
      if (data?.data) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Extract categories dynamically from API response
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.category)))],
    [courses]
  );

  // Filter by active category
  const filtered = useMemo(() => {
    return courses.filter((c) =>
      activeCategory === "All" ? true : c.category === activeCategory
    );
  }, [activeCategory, courses]);

  function handleOpenCourse(id) {
    router.push(`/courses/${id}`);
  }

  // 🔥 Skeleton Loader UI
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-video bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-3 w-12 bg-gray-200 rounded" />
        </div>
        <div className="flex justify-between text-sm">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-3 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Category Filter Bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10 border"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Categories */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-10"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium transition-all ${activeCategory === cat
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10 border"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="px-6 py-6">
          {/* Results count */}
          {!loading && (
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {filtered.length} results for "{activeCategory}" courses
              </p>
            </div>
          )}

          {/* Courses Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
              : filtered.map((course) => (
                <div
                  key={course.course_id}
                  onClick={() => handleOpenCourse(course.course_id)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Course Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {course.short_description}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">
                          {course.rating}
                        </span>
                      </div>
                      <span className="text-gray-500 text-sm">
                        ({course.rating_count})
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{course.total_lessons} lessons</span>
                      <span>{course.estimated_time}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </main>

        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { setCourseMeta } from "../redux/slices/course/courseSlice";
import { Star, Clock, BookOpen, Award } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function FeaturedCourses() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

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
      if (data) {
        setCourse(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (c) => {
    dispatch(setCourseMeta(c));
    router.push(`/courses/${c.course_id}`, { scroll: true });
  };

  // 🔥 Skeleton Loader for Featured Courses
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-6 space-y-4">
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
        <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Featured Courses
            </h2>
            <p className="text-lg text-gray-600">
              Hand-picked courses by our experts to accelerate your learning
            </p>
          </div>
          <button
            onClick={() => router.push("/courses/all")}
            className="hidden cursor-pointer sm:inline-block px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium transition"
          >
            View All Courses
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : course &&
            course.map((c) => (
              <div
                key={c.course_id}
                onClick={() => handleCourseClick(c)}
                className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full shadow-sm ${c.is_premium
                          ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black"
                          : "bg-white/90 text-gray-800"
                        }`}
                    >
                      {c.is_premium && <Award className="w-3 h-3 mr-1" />}
                      {c.level}
                    </span>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full shadow-sm">
                      {c.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold hover:text-blue-700 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {c.short_description}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{c.rating}</span>
                    <span>({c.rating_count.toLocaleString()})</span>
                  </div>

                  {/* Lessons + Duration */}
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{c.total_lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{c.estimated_time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price + Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      {/* Uncomment if price data is available */}
                      {/* <span className="text-lg font-bold">${c.price}</span>
                        <span className="text-sm text-gray-500 line-through">
                          ${c.originalPrice}
                        </span> */}
                    </div>
                    <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Mobile View All */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push("/courses/all", { scroll: true })}
            className="sm:hidden px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium transition"
          >
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
}

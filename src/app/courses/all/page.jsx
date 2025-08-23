"use client";

import { useMemo, useState } from "react";
import {
  Star,
  Clock,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  Search as SearchIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const ALL_COURSES = [
  {
    id: 1,
    title: "Complete React Developer Course",
    description:
      "Master React from basics to advanced concepts with real-world projects and best practices.",
    instructor: "Sarah Chen",
    instructorAvatar: "SC",
    rating: 4.9,
    students: 12450,
    duration: "42h",
    lessons: 156,
    level: "Intermediate",
    price: 89.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&h=900&fit=crop&q=80",
    isPremium: true,
    category: "Development",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    description:
      "Learn modern design principles, user research, prototyping, and create stunning interfaces.",
    instructor: "Alex Rodriguez",
    instructorAvatar: "AR",
    rating: 4.8,
    students: 8920,
    duration: "38h",
    lessons: 124,
    level: "Beginner",
    price: 79.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=900&fit=crop&q=80",
    isPremium: false,
    category: "Design",
  },
  {
    id: 3,
    title: "Data Science with Python",
    description:
      "Comprehensive guide to data analysis, machine learning, and visualization using Python.",
    instructor: "Dr. Emily Watson",
    instructorAvatar: "EW",
    rating: 4.9,
    students: 15600,
    duration: "55h",
    lessons: 189,
    level: "Advanced",
    price: 119.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop&q=80",
    isPremium: true,
    category: "Data Science",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    description:
      "Build effective marketing campaigns across social media, email, and content marketing.",
    instructor: "Mike Johnson",
    instructorAvatar: "MJ",
    rating: 4.7,
    students: 9340,
    duration: "28h",
    lessons: 98,
    level: "Beginner",
    price: 69.99,
    originalPrice: 139.99,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&q=80",
    isPremium: false,
    category: "Marketing",
  },
  {
    id: 5,
    title: "Advanced JavaScript Concepts",
    description:
      "Deep dive into closures, prototypes, async programming, and modern ES6+ features.",
    instructor: "David Kim",
    instructorAvatar: "DK",
    rating: 4.8,
    students: 11200,
    duration: "35h",
    lessons: 142,
    level: "Advanced",
    price: 94.99,
    originalPrice: 189.99,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1400&h=900&fit=crop&q=80",
    isPremium: true,
    category: "Development",
  },

];

export default function AllCoursesPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState("popular");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(ALL_COURSES.map((c) => c.category)))],
    []
  );

  const filtered = useMemo(() => {
    let list = ALL_COURSES.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q);
      const matchesCategory =
        !activeCategory || activeCategory === "All"
          ? true
          : c.category === activeCategory;
      return matchesQuery && matchesCategory;
    });

    if (sortBy === "popular")
      list = list.sort((a, b) => b.students - a.students);
    if (sortBy === "new") list = list.sort((a, b) => b.id - a.id);
    if (sortBy === "price-low") list = list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list = list.sort((a, b) => b.price - a.price);

    return list;
  }, [query, activeCategory, sortBy]);

  const totalStudents = useMemo(
    () => ALL_COURSES.reduce((acc, c) => acc + c.students, 0),
    []
  );

  function handleOpenCourse(id) {
    router.push(`/courses/${id}`);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* HERO */}
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-500 text-white py-24 sm:py-28">
            {/* Decorative pattern */}
            <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')] opacity-10"></div>

            <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* LEFT CONTENT */}
                <div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight max-w-3xl">
                    Learn{" "}
                    <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                      faster
                    </span>
                    , grow{" "}
                    <span className="bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
                      smarter
                    </span>
                    .
                  </h1>
                  <p className="mt-5 text-lg opacity-90 max-w-2xl">
                    Explore {ALL_COURSES.length} expert-led courses and join{" "}
                    {totalStudents.toLocaleString()} learners worldwide 🚀
                  </p>

                  {/* Search + Filter */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3 items-center">
                    <div className="relative">
                      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search courses, topics, or instructors..."
                        className="w-full rounded-xl py-3 pl-12 pr-4 text-black placeholder-gray-400 bg-white/90 backdrop-blur-sm border border-white/20 shadow-sm focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
               
                  </div>

                  {/* Category Chips */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() =>
                          setActiveCategory(cat === "All" ? null : cat)
                        }
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                          (activeCategory ?? "All") === cat
                            ? "bg-yellow-300 text-indigo-900 shadow-md"
                            : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT CONTENT (Enhanced Floating Preview Card) */}
                <div className="hidden md:flex justify-center relative">
                  <div className="relative w-[95%] max-w-md rounded-3xl bg-gray-900 text-green-400 shadow-2xl transform hover:scale-105 transition-all border border-gray-800 overflow-hidden">
                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      🚀 Live Coding
                    </span>

                    {/* Fake Editor */}
                    <div className="p-5 font-mono text-sm">
                      <p><span className="text-pink-400">function</span> <span className="text-blue-400">learn</span>() {'{'}</p>
                      <p className="ml-4">console.log(<span className="text-yellow-300">"Hello Future Devs! 💻"</span>)</p>
                      <p>{'}'}</p>
                    </div>

                    {/* Footer */}
                    <div className="p-4 bg-gray-800 flex justify-between items-center">
                      <span className="text-xs text-gray-400">Try interactive coding now</span>
                      <button className="px-4 py-1.5 text-xs rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-sm">
                        Start Free
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* COURSES GRID */}
        <section className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">All courses</h2>
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">
                {Math.min(filtered.length, visibleCount)}
              </span>{" "}
              of <span className="font-medium">{filtered.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-500">
                No courses found. Try a different search.
              </div>
            ) : (
              filtered.slice(0, visibleCount).map((course) => (
                <article
                  key={course.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform transition hover:-translate-y-2 flex flex-col"
                >
                  <div className="relative h-48 w-full">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          course.isPremium
                            ? "bg-yellow-300 text-black"
                            : "bg-white/90 text-gray-800"
                        }`}
                      >
                        {course.isPremium ? "Premium" : course.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-white/90 text-gray-800">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3
                      onClick={() => handleOpenCourse(course.id)}
                      className="text-lg font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer"
                    >
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 text-white flex items-center justify-center text-xs font-semibold">
                        {course.instructorAvatar}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-800">
                          {course.instructor}
                        </div>
                        <div className="text-xs text-gray-500">
                          {course.students.toLocaleString()} students
                        </div>
                      </div>
                      <div className="ml-auto text-sm text-gray-600 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={() => handleOpenCourse(course.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition"
                      >
                        Start Now
                      </button>

                      <button
                        onClick={() => alert("Added to wishlist (demo)")}
                        className="px-3 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
                      >
                        Wishlist
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {visibleCount < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((v) => v + 6)}
                className="px-6 py-2 rounded-full bg-white border shadow hover:shadow-md"
              >
                Load more
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

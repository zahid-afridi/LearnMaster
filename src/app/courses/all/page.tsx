// app/courses/all/page.tsx
// courses pages outer
"use client";

import { useMemo, useState } from "react";
import { Star, Clock, BookOpen, Users, Award, ChevronRight, Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Course = {
  id: number;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  price: number;
  originalPrice: number;
  image: string;
  isPremium: boolean;
  category: string;
};

const ALL_COURSES: Course[] = [
  // same sample data as before but with larger images (kept compact here)
  {
    id: 1,
    title: "Complete React Developer Course",
    description: "Master React from basics to advanced concepts with real-world projects and best practices.",
    instructor: "Sarah Chen",
    instructorAvatar: "SC",
    rating: 4.9,
    students: 12450,
    duration: "42h",
    lessons: 156,
    level: "Intermediate",
    price: 89.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1400&h=900&fit=crop&q=80",
    isPremium: true,
    category: "Development",
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    description: "Learn modern design principles, user research, prototyping, and create stunning interfaces.",
    instructor: "Alex Rodriguez",
    instructorAvatar: "AR",
    rating: 4.8,
    students: 8920,
    duration: "38h",
    lessons: 124,
    level: "Beginner",
    price: 79.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&h=900&fit=crop&q=80",
    isPremium: false,
    category: "Design",
  },
  {
    id: 3,
    title: "Data Science with Python",
    description: "Comprehensive guide to data analysis, machine learning, and visualization using Python.",
    instructor: "Dr. Emily Watson",
    instructorAvatar: "EW",
    rating: 4.9,
    students: 15600,
    duration: "55h",
    lessons: 189,
    level: "Advanced",
    price: 119.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop&q=80",
    isPremium: true,
    category: "Data Science",
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    description: "Build effective marketing campaigns across social media, email, and content marketing.",
    instructor: "Mike Johnson",
    instructorAvatar: "MJ",
    rating: 4.7,
    students: 9340,
    duration: "28h",
    lessons: 98,
    level: "Beginner",
    price: 69.99,
    originalPrice: 139.99,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=900&fit=crop&q=80",
    isPremium: false,
    category: "Marketing",
  },
  {
    id: 5,
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into closures, prototypes, async programming, and modern ES6+ features.",
    instructor: "David Kim",
    instructorAvatar: "DK",
    rating: 4.8,
    students: 11200,
    duration: "35h",
    lessons: 142,
    level: "Advanced",
    price: 94.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1400&h=900&fit=crop&q=80",
    isPremium: true,
    category: "Development",
  },
  {
    id: 6,
    title: "Photography Fundamentals",
    description: "Master camera settings, composition, lighting, and post-processing techniques.",
    instructor: "Lisa Park",
    instructorAvatar: "LP",
    rating: 4.6,
    students: 7850,
    duration: "24h",
    lessons: 76,
    level: "Beginner",
    price: 59.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1400&h=900&fit=crop&q=80",
    isPremium: false,
    category: "Photography",
  },
];

export default function AllCoursesPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"popular" | "new" | "price-low" | "price-high">("popular");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = useMemo(() => ["All", ...Array.from(new Set(ALL_COURSES.map((c) => c.category)))], []);

  const filtered = useMemo(() => {
    let list = ALL_COURSES.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q);
      const matchesCategory = !activeCategory || activeCategory === "All" ? true : c.category === activeCategory;
      return matchesQuery && matchesCategory;
    });

    if (sortBy === "popular") list = list.sort((a, b) => b.students - a.students);
    if (sortBy === "new") list = list.sort((a, b) => b.id - a.id);
    if (sortBy === "price-low") list = list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") list = list.sort((a, b) => b.price - a.price);

    return list;
  }, [query, activeCategory, sortBy]);

  const totalStudents = useMemo(() => ALL_COURSES.reduce((acc, c) => acc + c.students, 0), []);

  function handleOpenCourse(id: number) {
    router.push(`/courses/${id}`);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-blue-500 text-white py-20">
          <div className="container max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                {/* <p className="text-sm uppercase tracking-widest ">All Courses</p> */}
                <h1 className="mt-4 text-4xl sm:text-3xl font-extrabold leading-tight max-w-3xl">
                  Elegant, expert-led courses to elevate your skills.
                </h1>
                <p className="mt-4 text-lg opacity-90 max-w-2xl">Explore {ALL_COURSES.length} curated courses • {totalStudents.toLocaleString()} students</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-[1fr,auto] gap-3 items-center">
                  <div className="relative colot">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white-400 " />
                   <input
                        value={query}
                              onChange={(e) => setQuery(e.target.value)}
                               placeholder="Search courses, topics, or instructors..."
                               className="w-full rounded-full py-3 pl-12 pr-4 text-white border-1 shadow-sm placeholder-white-400" 
                          />
                  </div>
                  <div className="flex gap-2  justify-between">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="rounded-full py-2 px-4 bg-gray-100 text-black text-sm shadow-sm "
                      aria-label="Sort courses"
                    >
                      <option value="popular">Most Popular</option>
                      <option value="new">Newest</option>
                      <option value="price-low">Price: Low → High</option>
                      <option value="price-high">Price: High → Low</option>
                    </select>

                    <button
                      onClick={() => router.push("/courses")}
                      className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm"
                    >
                      Browse categories <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* category chips */}
                <div className="mt-6 flex flex-wrap gap-3 ">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat === "All" ? null : cat)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${(activeCategory ?? "All") === cat
                          ? "bg-white text-indigo-700 shadow"
                          : "bg-white/20 text-white hover:bg-white/30"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden md:block mb-4">
                <div className="rounded-2xl bg-white/8 p-6 backdrop-blur-md border border-white/10 mb-3">
                  <h3 className="text-lg font-semibold mb-3">Why LearnMaster?</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-3 items-start">
                      <div className="p-2 rounded bg-yellow-300 text-black"><Star className="w-4 h-4" /></div>
                      <div><strong>Top instructors</strong><div className="text-xs text-white/90">Carefully vetted experts & practical projects</div></div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="p-2 rounded bg-white text-indigo-700"><BookOpen className="w-4 h-4" /></div>
                      <div><strong>Complete curriculums</strong><div className="text-xs text-white/90">From fundamentals to advanced</div></div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="p-2 rounded bg-indigo-700 text-white"><Users className="w-4 h-4" /></div>
                      <div><strong>Community</strong><div className="text-xs text-white/90">Active forums & live sessions</div></div>
                    </li>
                  </ul>
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
            Showing <span className="font-medium">{Math.min(filtered.length, visibleCount)}</span> of <span className="font-medium">{filtered.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full py-20 text-center text-gray-500">No courses found. Try a different search.</div>
          ) : (
            filtered.slice(0, visibleCount).map((course) => (
              <article
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform transition hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-48 w-full">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.isPremium ? "bg-yellow-300 text-black" : "bg-white/90 text-gray-800"}`}>
                      {course.isPremium ? "Premium" : course.level}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-white/90 text-gray-800">{course.category}</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3
                    onClick={() => handleOpenCourse(course.id)}
                    className="text-lg font-semibold text-gray-900 hover:text-indigo-600 cursor-pointer"
                  >
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{course.description}</p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-400 text-white flex items-center justify-center text-xs font-semibold">
                      {course.instructorAvatar}
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-800">{course.instructor}</div>
                      <div className="text-xs text-gray-500">{course.students.toLocaleString()} students</div>
                    </div>
                    <div className="ml-auto text-sm text-gray-600 flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1"><BookOpen className="w-4 h-4" /><span>{course.lessons}</span></div>
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{course.duration}</span></div>
                    </div>

                    <div className="text-right">
                      {/* <div className="text-lg font-bold text-gray-900">${course.price.toFixed(2)}</div> */}
                      {/* <div className="text-xs line-through text-gray-400">${course.originalPrice.toFixed(2)}</div> */}
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
            <button onClick={() => setVisibleCount((v) => v + 6)} className="px-6 py-2 rounded-full bg-white border shadow hover:shadow-md">
              Load more
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

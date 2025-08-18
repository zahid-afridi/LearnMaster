// // app/home-client.tsx
// "use client";

// import { useEffect, useState } from "react";
// import {
//   Play,
//   ArrowRight,
//   Star,
//   Users,
//   BookOpen,
//   Code,
//   Palette,
//   BarChart3,
//   Megaphone,
//   Camera,
//   DollarSign,
//   Heart,
//   Globe,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import Header from "@/components/Header";
// import FeaturedCourses from "@/components/FeaturedCourses";
// import TestimonialsSection from "@/components/TestimonialsSection";
// import Footer from "@/components/Footer";
// import { useRouter } from "next/navigation";

// const categories = [
//   { id: 1, name: "Development", icon: Code, color: "bg-blue-500", courses: 450 },
//   { id: 2, name: "Design", icon: Palette, color: "bg-purple-500", courses: 320 },
//   { id: 3, name: "Data Science", icon: BarChart3, color: "bg-green-500", courses: 180 },
//   { id: 4, name: "Marketing", icon: Megaphone, color: "bg-orange-500", courses: 240 },
//   { id: 5, name: "Photography", icon: Camera, color: "bg-pink-500", courses: 160 },
//   { id: 6, name: "Business", icon: DollarSign, color: "bg-emerald-500", courses: 380 },
//   { id: 7, name: "Health", icon: Heart, color: "bg-red-500", courses: 120 },
//   { id: 8, name: "Languages", icon: Globe, color: "bg-indigo-500", courses: 200 },
// ];

// // ---- Category Carousel Component ----


// function CategoryCarousel({ onCategorySelect }: { onCategorySelect?: (c: string) => void }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsToShow, setItemsToShow] = useState(4);

//   // Responsive items count
//   useEffect(() => {
//     const updateItemsToShow = () => {
//       if (window.innerWidth < 640) {
//         setItemsToShow(2); // Mobile
//       } else {
//         setItemsToShow(4); // Desktop
//       }
//     };

//     updateItemsToShow();
//     window.addEventListener("resize", updateItemsToShow);

//     return () => window.removeEventListener("resize", updateItemsToShow);
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       prev + itemsToShow >= categories.length ? 0 : prev + itemsToShow
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? Math.max(0, categories.length - itemsToShow) : prev - itemsToShow
//     );
//   };

//   return (
//     <section className="py-16 bg-gray-100/30">
//       <div className="container max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="text-center mb-12">
//           <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-4">
//             Explore Top Categories
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover courses across various fields and start your learning journey today
//           </p>
//         </div>

//         <div className="relative">
//           {/* Prev Button */}
//           <button
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full shadow-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
//             onClick={prevSlide}
//             disabled={currentIndex === 0}
//           >
//             <ChevronLeft className="h-5 w-5" />
//           </button>

//           {/* Next Button */}
//           <button
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full shadow-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
//             onClick={nextSlide}
//             disabled={currentIndex + itemsToShow >= categories.length}
//           >
//             <ChevronRight className="h-5 w-5" />
//           </button>

//           {/* Carousel Items */}
//           <div className="overflow-hidden">
//             <div
//               className="flex transition-transform duration-300 ease-in-out gap-6"
//               style={{
//                 transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
//                 width: `${(categories.length / itemsToShow) * 100}%`,
//               }}
//             >
//               {categories.map((category) => (
//                 <div
//                   key={category.id}
//                   className="flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
//                   style={{ width: `${100 / categories.length}%` }}
//                   onClick={() => onCategorySelect?.(category.name)}
//                 >
//                   <div className="p-6 text-center space-y-4">
//                     <div
//                       className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
//                     >
//                       <category.icon className="w-8 h-8 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
//                       <p className="text-sm text-gray-600">{category.courses} courses</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Dots */}
//           <div className="flex justify-center mt-8 gap-2">
//             {Array.from({ length: Math.ceil(categories.length / itemsToShow) }).map((_, index) => (
//               <button
//                 key={index}
//                 className={`w-2 h-2 rounded-full transition-colors ${
//                   Math.floor(currentIndex / itemsToShow) === index
//                     ? "bg-blue-700"
//                     : "bg-gray-300"
//                 }`}
//                 onClick={() => setCurrentIndex(index * itemsToShow)}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// // ---- Home Client Component ----
// export default function HomeClient() {
//   const router= useRouter();
//   const onGetStarted = () => {
//     // Put navigation logic here (e.g., router.push('/courses'))
//     router.push('/courses/234234');
//     console.log("Get started clicked");
//   };

//   const onExploreCourses = () => {
//     console.log("Explore clicked");
//   };

//   return (
//     <>
//       <Header />

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue-700/5 via-white to-gray-100/30">
//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden>
//             <defs>
//               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
//                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
//               </pattern>
//             </defs>
//             <rect width="100" height="100" fill="url(#grid)" />
//           </svg>
//         </div>

//         <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <div className="space-y-8">
//               <span className="inline-flex items-center w-fit rounded-full border border-blue-700/20 bg-blue-700/10 px-3 py-1 text-sm font-medium text-blue-700">
//                 🎓 Trusted by 10M+ learners worldwide
//               </span>
//               <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
//                 Master New Skills with
//                 <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent block">
//                   Expert-Led Courses
//                 </span>
//               </h1>
//               <p className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed">
//                 Join millions of learners and unlock your potential with our comprehensive,
//                 text-based courses designed for deep understanding and practical application.
//               </p>

//               <div className="flex flex-wrap gap-6 sm:gap-8">
//                 <div className="flex items-center gap-2">
//                   <div className="w-10 h-10 bg-blue-700/10 rounded-full flex items-center justify-center">
//                     <BookOpen className="w-5 h-5 text-blue-700" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">1,000+</p>
//                     <p className="text-sm text-gray-600">Courses</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="w-10 h-10 bg-blue-700/10 rounded-full flex items-center justify-center">
//                     <Users className="w-5 h-5 text-blue-700" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">10M+</p>
//                     <p className="text-sm text-gray-600">Students</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="w-10 h-10 bg-blue-700/10 rounded-full flex items-center justify-center">
//                     <Star className="w-5 h-5 text-blue-700" />
//                   </div>
//                   <div>
//                     <p className="font-semibold">4.8/5</p>
//                     <p className="text-sm text-gray-600">Rating</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button
//                   onClick={onGetStarted}
//                   className="flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full px-8 h-12 text-lg font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
//                 >
//                   Get Started Free
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </button>

//                 <button
//                   onClick={onExploreCourses}
//                   className="flex items-center justify-center border border-blue-700/20 rounded-full px-8 h-12 text-lg font-medium hover:bg-blue-700/5"
//                 >
//                   <Play className="mr-2 h-4 w-4" />
//                   Explore Courses
//                 </button>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
//                 <div className="aspect-[4/3] bg-gradient-to-br from-blue-700/10 to-gray-100/20 p-8 flex items-center justify-center">
//                   <div className="text-center space-y-4">
//                     <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center mx-auto">
//                       <BookOpen className="w-10 h-10 text-white" />
//                     </div>
//                     <h3 className="font-semibold text-lg">Interactive Learning</h3>
//                     <p className="text-sm text-gray-600">Engage with rich content, take notes, and track your progress</p>
//                   </div>
//                 </div>

//                 <div className="p-6 border-t">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium">Advanced React Development</h4>
//                       <p className="text-sm text-gray-600">by Sarah Chen</p>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span className="text-sm font-medium">4.9</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full opacity-80 animate-pulse" />
//               <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-700/20 rounded-full" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories Section */}
//        <CategoryCarousel />

//       {/* Featured Courses Section */}
//        <FeaturedCourses />

//       <TestimonialsSection />

//       <Footer />
//     </>
//   );
// }

// ==========================================================>>>>
// =======================================================================================================================
// ==========================================================>>>>
// New  code with little changing somthing 

// app/home-client.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Play,
  ArrowRight,
  Star,
  Users,
  BookOpen,
  Code,
  Palette,
  BarChart3,
  Megaphone,
  Camera,
  DollarSign,
  Heart,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import FeaturedCourses from "@/components/FeaturedCourses";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

/* -------------------------------------------
   Categories
   NOTE: Added 4 more categories (IDs 9–12) ONLY.
   Icons reused from existing imports (no new imports).
-------------------------------------------- */
const categories = [
  { id: 1, name: "Development", icon: Code, color: "bg-blue-500", courses: 450 },
  { id: 2, name: "Design", icon: Palette, color: "bg-purple-500", courses: 320 },
  { id: 3, name: "Data Science", icon: BarChart3, color: "bg-green-500", courses: 180 },
  { id: 4, name: "Marketing", icon: Megaphone, color: "bg-orange-500", courses: 240 },
  { id: 5, name: "Photography", icon: Camera, color: "bg-pink-500", courses: 160 },
  { id: 6, name: "Business", icon: DollarSign, color: "bg-emerald-500", courses: 380 },
  { id: 8, name: "Languages", icon: Globe, color: "bg-indigo-500", courses: 200 },
  { id: 9,  name: "AI & Machine Learning", icon: BarChart3, color: "bg-teal-600", courses: 210 },
  { id: 10, name: "Cloud Computing",       icon: Globe,     color: "bg-cyan-600", courses: 190 },
  { id: 11, name: "Mobile Development",    icon: Code,      color: "bg-sky-600",  courses: 170 },
  { id: 12, name: "Project Management",    icon: Users,     color: "bg-amber-600",courses: 160 },
  { id: 7, name: "Motivation", icon: Heart, color: "bg-yellow-500", courses: 124 },
];

// ---- Category Carousel Component ----
function CategoryCarousel({ onCategorySelect }: { onCategorySelect?: (c: string) => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);

  // Responsive items count (kept exactly as you had it)
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(2); // Mobile
      } else {
        setItemsToShow(4); // Desktop
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, Math.max(0, categories.length - itemsToShow))
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 bg-gray-100/30">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-4">
            Explore Top Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover courses across various fields and start your learning journey today
          </p>
        </div>

        <div className="relative">
          {/* Prev Button */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full shadow-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Next Button */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full shadow-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-40"
            onClick={nextSlide}
            disabled={currentIndex >= categories.length - itemsToShow} // ✅ works with 1-step movement
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Carousel Items (sizes unchanged) */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{
                // ✅ Movement stays proportional to visible items; we only changed currentIndex logic above
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                // Track width untouched
                width: `${(categories.length / itemsToShow) * 100}%`,
              }}
            >
          {categories.map((category) => (
  <div
    key={`${category.name}-${category.id}`}
    className="flex-shrink-0 bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
    style={{ width: `${100 / categories.length}%` }}
    onClick={() => onCategorySelect?.(category.name)}
  >
    <div className="p-6 text-center space-y-4">
      <div
        className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
      >
        <category.icon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
        <p className="text-sm text-gray-600">{category.courses} courses</p>
      </div>
    </div>
  </div>
))}

            </div>
          </div>

          {/* Dots (left untouched) */}
          {/* <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(categories.length / itemsToShow) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsToShow) === index
                    ? "bg-blue-700"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index * itemsToShow)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}

// ---- Home Client Component ----
export default function HomeClient() {
  const router = useRouter();

  const onGetStarted = () => {
    router.push("/courses/234234");
    console.log("Get started clicked");
  };

  const onExploreCourses = () => {
    console.log("Explore clicked");
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700/5 via-white to-gray-100/30">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" aria-hidden>
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="inline-flex items-center w-fit rounded-full border border-blue-700/20 bg-blue-700/10 px-3 py-1 text-sm font-medium text-blue-700">
                🎓 Trusted by 10M+ learners worldwide
              </span>
              <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Master New Skills with
                <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent block">
                  Expert-Led Courses
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed">
                Join millions of learners and unlock your potential with our comprehensive,
                text-based courses designed for deep understanding and practical application.
              </p>

              <div className="flex flex-wrap gap-6 sm:gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-700/10 rounded-full flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold">1,000+</p>
                    <p className="text-sm text-gray-600">Courses</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-700/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold">10M+</p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-700/10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold">4.8/5</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-full px-8 h-12 text-lg font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <button
                  onClick={onExploreCourses}
                  className="flex items-center justify-center border border-blue-700/20 rounded-full px-8 h-12 text-lg font-medium hover:bg-blue-700/5"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Explore Courses
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-700/10 to-gray-100/20 p-8 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">Interactive Learning</h3>
                    <p className="text-sm text-gray-600">Engage with rich content, take notes, and track your progress</p>
                  </div>
                </div>

                <div className="p-6 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Advanced React Development</h4>
                      <p className="text-sm text-gray-600">by Sarah Chen</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full opacity-80 animate-pulse" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-700/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoryCarousel />

      {/* Featured Courses Section */}
      <FeaturedCourses />

      <TestimonialsSection />

      <Footer />
    </>
  );
}



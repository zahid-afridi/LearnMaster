import { Star, Clock, BookOpen, Users, Award } from "lucide-react"
import { useRouter } from "next/navigation";


export default function FeaturedCourses() {
  const router=useRouter();
  const featuredCourses = [
     {
    id: 1,
    title: "Complete React Developer Course",
    description: "Master React from basics to advanced concepts with real-world projects and best practices.",
    instructor: "Sarah Chen",
    instructorAvatar: "SC",
    rating: 4.9,
    students: 12450,
    duration: "42 hours",
    lessons: 156,
    level: "Intermediate",
    price: 89.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    isPremium: true,
    category: "Development"
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    description: "Learn modern design principles, user research, prototyping, and create stunning interfaces.",
    instructor: "Alex Rodriguez",
    instructorAvatar: "AR",
    rating: 4.8,
    students: 8920,
    duration: "38 hours",
    lessons: 124,
    level: "Beginner",
    price: 79.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    isPremium: false,
    category: "Design"
  },
  {
    id: 3,
    title: "Data Science with Python",
    description: "Comprehensive guide to data analysis, machine learning, and visualization using Python.",
    instructor: "Dr. Emily Watson",
    instructorAvatar: "EW",
    rating: 4.9,
    students: 15600,
    duration: "55 hours",
    lessons: 189,
    level: "Advanced",
    price: 119.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    isPremium: true,
    category: "Data Science"
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    description: "Build effective marketing campaigns across social media, email, and content marketing.",
    instructor: "Mike Johnson",
    instructorAvatar: "MJ",
    rating: 4.7,
    students: 9340,
    duration: "28 hours",
    lessons: 98,
    level: "Beginner",
    price: 69.99,
    originalPrice: 139.99,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    isPremium: false,
    category: "Marketing"
  },
  {
    id: 5,
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into closures, prototypes, async programming, and modern ES6+ features.",
    instructor: "David Kim",
    instructorAvatar: "DK",
    rating: 4.8,
    students: 11200,
    duration: "35 hours",
    lessons: 142,
    level: "Advanced",
    price: 94.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    isPremium: true,
    category: "Development"
  },
  {
    id: 6,
    title: "Photography Fundamentals",
    description: "Master camera settings, composition, lighting, and post-processing techniques.",
    instructor: "Lisa Park",
    instructorAvatar: "LP",
    rating: 4.6,
    students: 7850,
    duration: "24 hours",
    lessons: 76,
    level: "Beginner",
    price: 59.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
    isPremium: false,
    category: "Photography"
  }
  ]

  const HanldeCourseClick= () => {
    // Handle course click logic here
    router.push(`/courses/29384902348`);
  
  }

  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto cursor-pointer px-4 sm:px-6" onClick={HanldeCourseClick}>
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Featured Courses</h2>
            <p className="text-lg text-gray-600">
              Hand-picked courses by our experts to accelerate your learning
            </p>
          </div>
          <button className="hidden sm:inline-block px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium transition">
            View All Courses
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Premium Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                      course.isPremium
                        ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black"
                        : "bg-white/90 text-gray-800"
                    }`}
                  >
                    {course.isPremium && <Award className="w-3 h-3 mr-1" />}
                    {course.level}
                  </span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full shadow-sm">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold hover:text-blue-700 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                    {course.instructorAvatar}
                  </div>
                  <span className="text-sm font-medium">{course.instructor}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span>({course.students.toLocaleString()})</span>
                </div>

                {/* Lessons + Duration */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${course.price}</span>
                    <span className="text-sm text-gray-500 line-through">
                      ${course.originalPrice}
                    </span>
                  </div>
                  <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="text-center mt-12">
          <button className="sm:hidden px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 text-sm font-medium transition">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  )
}

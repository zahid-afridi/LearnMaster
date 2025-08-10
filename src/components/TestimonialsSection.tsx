import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    content:
      "LearnMaster completely transformed my career. The text-based courses allowed me to learn at my own pace and really understand complex concepts deeply. I landed my dream job thanks to the skills I gained here.",
    rating: 5,
    avatar: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "UX Designer",
    company: "Adobe",
    content:
      "The quality of instruction is exceptional. Each course is well-structured and the text format makes it easy to take notes and reference material later. I've completed 8 courses and each one exceeded my expectations.",
    rating: 5,
    avatar: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Microsoft",
    content:
      "What sets LearnMaster apart is the depth of content. The text-based approach means you get comprehensive explanations and can really digest the material. It's perfect for technical subjects.",
    rating: 5,
    avatar: "ER",
  },
  {
    id: 4,
    name: "David Park",
    role: "Marketing Manager",
    company: "Spotify",
    content:
      "I've tried many online learning platforms, but none compare to LearnMaster. The courses are practical, up-to-date, and the instructors are industry experts. Highly recommended!",
    rating: 5,
    avatar: "DP",
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Product Manager",
    company: "Netflix",
    content:
      "The comprehensive nature of the courses here is amazing. I can learn everything from basics to advanced topics all in one place. The text format is perfect for detailed learning.",
    rating: 5,
    avatar: "LW",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Full Stack Developer",
    company: "Airbnb",
    content:
      "LearnMaster helped me transition from a different field into tech. The step-by-step approach and detailed explanations made complex topics accessible. I'm now working at my dream company!",
    rating: 5,
    avatar: "JW",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-100/30">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their
            careers with our courses
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between p-6 space-y-4"
            >
              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quote className="absolute -top-2 -left-2 w-6 h-6 text-blue-700/20" />
                <p className="text-gray-600 leading-relaxed pl-4">
                  "{t.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="h-10 w-10 rounded-full bg-blue-700/10 flex items-center justify-center font-medium text-xs">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-600">
                    {t.role} at {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

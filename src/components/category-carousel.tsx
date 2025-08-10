import {
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
  LucideIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState, FC } from "react";

interface Category {
  id: number;
  name: string;
  icon: LucideIcon;
  color: string;
  courses: number;
}

const categories: Category[] = [
  { id: 1, name: "Development", icon: Code, color: "bg-blue-500", courses: 450 },
  { id: 2, name: "Design", icon: Palette, color: "bg-purple-500", courses: 320 },
  { id: 3, name: "Data Science", icon: BarChart3, color: "bg-green-500", courses: 180 },
  { id: 4, name: "Marketing", icon: Megaphone, color: "bg-orange-500", courses: 240 },
  { id: 5, name: "Photography", icon: Camera, color: "bg-pink-500", courses: 160 },
  { id: 6, name: "Business", icon: DollarSign, color: "bg-emerald-500", courses: 380 },
  { id: 7, name: "Health", icon: Heart, color: "bg-red-500", courses: 120 },
  { id: 8, name: "Languages", icon: Globe, color: "bg-indigo-500", courses: 200 },
];

interface CategoryCarouselProps {
  onCategorySelect?: (category: string) => void;
}

export const CategoryCarousel: FC<CategoryCarouselProps> = ({ onCategorySelect }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const itemsToShow = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= categories.length ? 0 : prev + itemsToShow
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? Math.max(0, categories.length - itemsToShow)
        : Math.max(0, prev - itemsToShow)
    );
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
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-12 w-12 rounded-full shadow-lg bg-background"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-12 w-12 rounded-full shadow-lg bg-background"
            onClick={nextSlide}
            disabled={currentIndex + itemsToShow >= categories.length}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Category Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
                width: `${(categories.length / itemsToShow) * 100}%`,
              }}
            >
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="flex-shrink-0 transition-all duration-200 cursor-pointer border-none shadow-md hover:shadow-xl hover:-translate-y-1"
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
                </Card>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(categories.length / itemsToShow) }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / itemsToShow) === index
                    ? "bg-blue-700"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index * itemsToShow)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

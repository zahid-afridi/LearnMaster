"use client";

import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  GraduationCap,
   Code, 
  Palette, 
  BarChart3, 
  Megaphone, 
  Camera, 
  DollarSign, 
  Heart, 
  Globe,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";
import Profile from '../../public/assets/profile.jpg'
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ModernHeaderProps {
  onNavigate?: (page: string) => void;
}

export default function Header({ onNavigate }: ModernHeaderProps) {
  const router= useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (page: string) => {
    setIsMobileMenuOpen(false);
    onNavigate?.(page);
  };

  const categories = [
  { id: 1, name: "Development", icon: Code, color: "bg-blue-500", courses: 450 },
  { id: 2, name: "Design", icon: Palette, color: "bg-purple-500", courses: 320 },
  { id: 3, name: "Data Science", icon: BarChart3, color: "bg-green-500", courses: 180 },
  { id: 4, name: "Marketing", icon: Megaphone, color: "bg-orange-500", courses: 240 },
  { id: 5, name: "Photography", icon: Camera, color: "bg-pink-500", courses: 160 },
  { id: 6, name: "Business", icon: DollarSign, color: "bg-emerald-500", courses: 380 },
  { id: 7, name: "Health", icon: Heart, color: "bg-red-500", courses: 120 },
  { id: 8, name: "Languages", icon: Globe, color: "bg-indigo-500", courses: 200 },
]
  return (
    <>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-200 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container max-w-7xl mx-auto">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu 
              <button
                onClick={() => setIsMobileMenuOpen(pre => !pre)}
                className="p-2 rounded-md hover:bg-gray-100 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button> */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>router.push("/")}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="font-poppins text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent hidden sm:block">
                  LearnMaster
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  placeholder="Search for courses, instructors, topics..."
                  className="pl-12 pr-4 h-12 bg-gray-100/50 border-none rounded-full focus:bg-white focus:ring-2 focus:ring-blue-700/20 transition-all outline-none w-full"
                />
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Mobile Search */}
              <button className="p-2 rounded-md hover:bg-gray-100 md:hidden">
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button className="relative hidden sm:flex p-2 rounded-md hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-md hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">Premium Student</p>
                </div>
                <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-blue-700/20 flex items-center justify-center bg-blue-700 text-white">
                  <Image
                    src={Profile}
                    alt="John Doe"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
{/* commit  menu icon for mobile from Header */}
      {/* Mobile Menu Overlay */}
      {/* {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          /> */}
          {/* <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 translate-x-0">
            <div className="p-6 space-y-4"> */}
              {/* <button
                onClick={() => handleNavigation("home")}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100/50"
              >
                Home
              </button> */}
              {/* <button
                onClick={() => handleNavigation("dashboard")}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100/50"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation("courses")}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100/50"
              >
                Courses
              </button>
              <button
                onClick={() => handleNavigation("categories")}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100/50"
              >
                Categories
              </button> */}
            {/* </div>
          </div> */}
        {/* </div>
      )} */}

      
    </>
  );
}

"use client";

import {
  Search,
  Bell,
  ShoppingCart,
  User,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import ProfileFallback from "../../public/assets/profile.jpg";
import { useDispatch } from "react-redux";
import { setActiveTab, setShowLogin } from "@/redux/slices/course/ShowLogin";

interface ModernHeaderProps {
  onNavigate?: (page: string) => void;
}

export default function Header({ onNavigate }: ModernHeaderProps) {
  const disptch=useDispatch()
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 transition-all duration-200 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-700 to-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-poppins text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent hidden sm:block">
              LearnMaster
            </span>
          </div>

          {/* Search */}
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
            <button className="p-2 rounded-md hover:bg-gray-100 md:hidden">
              <Search className="h-5 w-5" />
            </button>

            {status === "authenticated" && session?.user ? (
              <div className="flex items-center gap-3">
                {/* Notifications & Cart (Only show when logged in) */}
                <button className="relative p-2 rounded-md hover:bg-gray-100">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
                <button className="relative hidden sm:flex p-2 rounded-md hover:bg-gray-100">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    2
                  </span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                  >
                    <div className="text-right hidden lg:block">
                      <p className="text-sm font-medium">{session.user.name}</p>
                      <p className="text-xs text-gray-500">Premium Student</p>
                    </div>
                    <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-blue-700/20 flex items-center justify-center bg-blue-700 text-white">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "Profile"}
                          className="h-full w-full object-cover"
                          width={36}
                          height={36}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-500 text-white font-semibold text-sm">
                          {session.user.name ? (
                            session.user.name.charAt(0).toUpperCase()
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden animate-fadeIn">
                      <div className="p-2">
                        <button
                          onClick={() => router.push("/profile")}
                          className="flex w-full items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <User className="w-5 h-5 text-blue-600" /> Profile
                        </button>
                        <button
                          onClick={() => router.push("/settings")}
                          className="flex w-full items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <Settings className="w-5 h-5 text-purple-600" />{" "}
                          Settings
                        </button>
                        <button
                          onClick={() => router.push("/help")}
                          className="flex w-full items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <HelpCircle className="w-5 h-5 text-green-600" /> Help
                          & Support
                        </button>
                        <hr className="my-2" />
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex w-full items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          <LogOut className="w-5 h-5 text-red-600" /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Enhanced Login / Register buttons with modern elegant design
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Login Button - Subtle, sophisticated */}
                <button
                  onClick={() => disptch(setShowLogin(true))}
                  className="group cursor-pointer relative overflow-hidden px-4 sm:px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:text-blue-700 transition-all duration-300 ease-out border border-gray-200/60 hover:border-blue-300/40 bg-white/80 hover:bg-blue-50/30 backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                {/* Register Button - Bold, attention-grabbing */}
                <button
                  onClick={() =>{
                    disptch(setActiveTab("register"));
                    disptch(setShowLogin(true));
                  }
                    

                  }
                  className="group cursor-pointer relative overflow-hidden px-4 sm:px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-0.5 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-800 hover:via-blue-700 hover:to-indigo-700"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Get Started
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

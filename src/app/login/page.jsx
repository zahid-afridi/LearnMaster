"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // 🔹 Client-side validation
    if (!email && !password) {
      toast.error("Email & Password are required");
      setLoading(false);
      return;
    }
    if (!email) {
      toast.error("Email is required");
      setLoading(false);
      return;
    }
    if (!password) {
      toast.error("Password is required");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // manual redirect
      });

      console.log("🔹 signIn response:", res);

      if (res?.error) {
        // Backend error messages from authorize()
        toast.error(res.error);
        setLoading(false);
      } else {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 1200);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again!");
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* LEFT - Form */}
      <div className="flex justify-center items-center px-6 sm:px-10 py-12">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Welcome Back 👋
            </h2>
            <p className="text-gray-500 text-center text-sm mb-6">
              Log in to continue your learning journey
            </p>

            {/* Message */}
            {message && (
              <div
                className={`text-center text-sm font-medium mb-4 px-3 py-2 rounded-lg ${messageType === "success"
                  ? "bg-green-50 text-green-600 border border-green-200"
                  : "bg-red-50 text-red-600 border border-red-200"
                  }`}
              >
                {message}
              </div>
            )}

            {/* Google Button (not set up yet, needs Google provider config) */}
            <button
              type="button"
              className="w-full cursor-pointer flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm text-sm mb-4"
              onClick={() => signIn("google", { callbackUrl: "/" })}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-200" />
              <span className="px-2 text-gray-400 text-xs">or</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Form */}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />

              <div className="flex justify-between text-xs text-gray-600">
                <label className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="w-3.5 h-3.5 text-indigo-600"
                  />
                  Remember me
                </label>
                <a
                  href="/forgot-password"
                  className="text-indigo-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow text-sm"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-xs text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT - Sidebar */}
      <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-12 relative rounded-r-2xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-center drop-shadow-lg">
          Welcome Back to LMS 🎓
        </h1>
        <p className="text-base max-w-sm text-center text-indigo-100 leading-relaxed mb-8">
          Pick up right where you left off, and continue your journey of learning
          and growth 🚀.
        </p>

        {/* Decorative illustration / icon */}
        <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center shadow-inner">
          <span className="text-5xl">🔑</span>
        </div>

        {/* Floating gradient shapes */}
        <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-16 right-12 w-32 h-32 bg-pink-400/40 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 right-6 w-20 h-20 bg-indigo-300/30 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}

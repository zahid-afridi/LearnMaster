// new functional code

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/feature/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ===========================
  // EMAIL + PASSWORD VALIDATION
  // ===========================
  const validateForm = () => {
    if (!email.trim()) {
      toast.error("Email is required!");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Enter a valid email!");
      return false;
    }
    if (!password.trim()) {
      toast.error("Password is required!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return false;
    }
    return true;
  };

  // ===========================
  // LOGIN FUNCTION (Axios)
  // ===========================
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });

      const data = res.data;

      // Save token
      localStorage.setItem("token", data.token);

      // Save user in Redux
      dispatch(setUser(data.user));

      toast.success("Login successful!");
      setLoading(false);

      // Redirect
      window.location.href = "/";
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Login failed! Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" richColors />

      <main className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full shadow-md"></div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              InnovateU
            </h1>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Log in to continue your learning journey.
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-4 pt-5 pb-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-transparent"
              />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 pt-5 pb-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder-transparent"
              />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline absolute right-4 top-1/2 -translate-y-1/2"
              >
                Forgot?
              </Link>
            </div>

            <button
              className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-md hover:bg-primary/90 transition-colors"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login with Email"}
            </button>

            <div className="flex items-center my-3">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
              <span className="mx-3 text-gray-400 dark:text-gray-500 text-sm">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-shadow shadow-sm"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Login with Google
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

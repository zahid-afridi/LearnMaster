"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      toast.error("Enter a valid email!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/forgot-password", { email });

      toast.success(res.data.message);
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending OTP!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <Toaster richColors />

      <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Forgot Password?
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSend} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full px-4 pt-5 pb-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary outline-none placeholder-transparent"
            />
            <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-primary">
              Email Address
            </label>
          </div>

          <button
            className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Back to{" "}
          <Link href="/login" className="text-primary font-semibold underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

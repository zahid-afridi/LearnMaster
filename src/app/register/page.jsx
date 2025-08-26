"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function Page() {
    const [message, setMessage] = useState(""); // success or error message
    const [messageType, setMessageType] = useState(""); // "success" or "error"
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setMessageType("");
        setLoading(true);

        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        if (!name || !email || !password) {
            setMessage("All fields are required");
            setMessageType("error");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/user/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message || "Registration successful!");
                setMessageType("success");
                e.target.reset();
            } else {
                setMessage(data.message || "Something went wrong");
                setMessageType("error");
            }
        } catch (err) {
            setMessage("Network error. Try again.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Side */}
            <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-10 relative overflow-hidden">
                <h1 className="text-4xl font-extrabold mb-4 leading-snug text-center">
                    Your Learning Journey <br /> Starts Here 🚀
                </h1>
                <p className="text-base text-indigo-100 max-w-sm text-center leading-relaxed">
                    Join thousands of learners and unlock new skills every day with our
                    powerful LMS platform.
                </p>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute top-16 right-12 w-28 h-28 bg-purple-400/30 rounded-full blur-2xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center px-6 sm:px-10 md:px-14 py-12 bg-white">
                <div className="w-full max-w-sm sm:max-w-md mx-auto">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Create Your Account
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            Start learning new skills today!
                        </p>
                    </div>

                    {/* Inline message */}
                    {message && (
                        <p
                            className={`text-center mb-4 ${messageType === "success" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {message}
                        </p>
                    )}

                    {/* Google Button */}
                    <button className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm text-sm sm:text-base mb-6">
                        <FcGoogle className="text-xl sm:text-2xl" />
                        Continue with Google
                    </button>

                    <div className="flex items-center my-6">
                        <hr className="flex-1 border-gray-200" />
                        <span className="px-3 text-gray-400 text-sm">or</span>
                        <hr className="flex-1 border-gray-200" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-start gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                                htmlFor="terms"
                                className="text-xs sm:text-sm text-gray-600 leading-5"
                            >
                                I agree to the{" "}
                                <a href="/terms" className="text-indigo-600 hover:underline">
                                    Terms & Conditions
                                </a>{" "}
                                and{" "}
                                <a href="/privacy" className="text-indigo-600 hover:underline">
                                    Privacy Policy
                                </a>
                                .
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-md text-sm sm:text-base"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-center text-xs sm:text-sm text-gray-600 mt-6">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

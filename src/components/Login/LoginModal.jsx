"use client";

import React, { useEffect, useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTab, setShowLogin } from "@/redux/slices/course/ShowLogin";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

export default function LoginModal() {
    const dispatch = useDispatch();
    const { status } = useSession();
    const { showLogin, active_Tab } = useSelector((state) => state.showLogin);

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // close modal on successful login
    useEffect(() => {
        if (status === "authenticated") {
            setGoogleLoading(false);
            dispatch(setShowLogin(false));
        }
    }, [status, dispatch]);


    const onClose = () => {
        if (!loading && !googleLoading) {
            dispatch(setShowLogin(false));
        }
    };

    if (!showLogin) return null;

    // 🔹 Login submit
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            toast.error("Email & Password are required");
            setLoading(false);
            return;
        }

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success("Login successful!");
                dispatch(setShowLogin(false));
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Register submit
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        if (!name || !email || !password) {
            toast.error("All fields are required");
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
                toast.success(data.message || "Registration successful 🎉");

                // ✅ auto login after register
                const loginRes = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (loginRes?.error) {
                    toast.error("Invalid email or password");
                } else {
                    toast.success("Login successful!");
                    dispatch(setShowLogin(false));
                }
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (err) {
            console.error("Register error:", err);
            toast.error("Network error. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Google login
    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            await signIn("google", { redirect: false });
            // no manual close here — useSession effect will close it when status becomes "authenticated"
        } catch (err) {
            toast.error("Google login failed!");
            setGoogleLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 z-[99999999999] flex items-center justify-center min-h-screen bg-black/50 backdrop-blur-sm">
            {/* Modal */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
                {/* Close button */}
                <button
                    onClick={onClose}
                    disabled={loading || googleLoading}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer disabled:opacity-40"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Tabs */}
                <div className="flex justify-around mb-6 border-b border-gray-200">
                    <button
                        onClick={() => dispatch(setActiveTab("login"))}
                        className={`pb-2 font-medium cursor-pointer ${active_Tab === "login"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => dispatch(setActiveTab("register"))}
                        className={`pb-2 font-medium cursor-pointer ${active_Tab === "register"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500"
                            }`}
                    >
                        Register
                    </button>
                </div>

                {/* Google Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={googleLoading}
                    className="w-full cursor-pointer flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm text-sm mb-4 disabled:opacity-50"
                >
                    <FcGoogle className="text-xl" />
                    {googleLoading
                        ? "Connecting..."
                        : active_Tab === "login"
                            ? "Login with Google"
                            : "Register with Google"}
                </button>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="px-2 text-xs text-gray-400">or</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Login Form */}
                {active_Tab === "login" && (
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full outline-none text-sm"
                            />
                        </div>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <Lock className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full outline-none text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                )}

                {/* Register Form */}
                {active_Tab === "register" && (
                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="w-full outline-none text-sm"
                            />
                        </div>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full outline-none text-sm"
                            />
                        </div>
                        <div className="flex items-center border rounded-lg px-3 py-2">
                            <Lock className="w-4 h-4 text-gray-400 mr-2" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full outline-none text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Register"}
                        </button>
                    </form>
                )}
            </div>

            {/* Animation */}
            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}

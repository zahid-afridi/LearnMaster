"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  resetStatus,
} from "@/redux/feature/userSlice";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  // =======================
  // Reset Redux status on page load
  // =======================
  useEffect(() => {
    dispatch(resetStatus());
  }, []);

  // =======================
  // Handle Input Changes
  // =======================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // =======================
  // Handle Image Upload
  // =======================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  // =======================
  // Handle Form Submit
  // =======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading());

    try {
      let base64Image = null;

      if (profileImageFile) {
        base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(profileImageFile);
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
        });
      }

      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          bio: formData.bio,
          profile_images: base64Image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.message || data.error || "Registration failed";
        dispatch(setError(message));
        toast.error(message);
        return;
      }

      toast.success("OTP sent to your email. Check inbox/spam.");
      localStorage.setItem("pending_email", formData.email);

      dispatch(resetStatus()); // clear loading state

      router.push(
        `/register/verify?email=${encodeURIComponent(formData.email)}`
      );
    } catch (err) {
      dispatch(setError(err.message));
      toast.error(err.message);
    }
  };

  // =======================
  // UI
  // =======================
  return (
    <div className="bg-gray-100 dark:bg-gray-900 font-sans min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" richColors />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Create Account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Join InnovateU and start learning today.
        </p>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={
                profileImage ||
                "https://cdn-icons-png.flaticon.com/512/847/847969.png"
              }
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border-4 border-primary shadow-md object-cover"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-primary text-white text-xs p-1.5 rounded-full cursor-pointer hover:bg-primary/90 transition"
            >
              <span className="material-symbols-outlined text-base">edit</span>
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Upload Profile Picture
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-lg border ${
              error?.toLowerCase?.().includes("email")
                ? "border-red-500"
                : "border-gray-300"
            } dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition`}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

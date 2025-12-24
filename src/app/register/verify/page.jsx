"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "@/redux/feature/userSlice";
import { Toaster, toast } from "sonner";

export default function VerifyPage() {
  const search = useSearchParams();
  const email = search.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoadingLocal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const verifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");

    setLoadingLocal(true);
    dispatch(setLoading());

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(setError(data.error || "Verification failed"));
        toast.error(data.error || "Verification failed");
        setLoadingLocal(false);
        return;
      }

      // success: save token and update redux
      if (data.token) localStorage.setItem("token", data.token);

      dispatch(
        setUser({
          user_id: data.user?.user_id,
          name: data.user?.name,
          email: data.user?.email,
          bio: data.user?.bio,
          profile_images: data.user?.profile_images,
        })
      );

      toast.success("Verified! Redirecting...");
      router.push("/");
    } catch (err) {
      dispatch(setError(err.message));
      toast.error(err.message);
    } finally {
      setLoadingLocal(false);
    }
  };

  const resend = async () => {
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.error || "Can't resend OTP");
      toast.success("OTP resent");
    } catch (err) {
      toast.error("Error resending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" richColors />
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Verify your email</h2>
        <p className="mb-4">We sent a 6-digit code to <strong>{email}</strong></p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-3 rounded border mb-4"
        />

        <button
          onClick={verifyOtp}
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded mb-2"
        >
          {loading ? "Verifying..." : "Verify & Create Account"}
        </button>

        <button onClick={resend} className="w-full border py-2 rounded">
          Resend OTP
        </button>
      </div>
    </div>
  );
}

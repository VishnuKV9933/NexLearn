"use client";
import { sendOtp, verifyOtp } from "@/lib/auth";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
interface OTPInputProps {
  mobile: string;
  onBack: () => void;
  onRegister: () => void;
}

export default function OTPInput({
  mobile,
  onBack,
  onRegister,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resending, setResending] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(30);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = async () => {
    if (timer > 0 || resending) return;

    setResending(true);
    try {
      const data = await sendOtp(mobile);

      if (data.success) {
        toast.success("OTP sent successfully!");
        setTimer(30);
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Resend error", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length < 6) return toast.error("Please enter the 6-digit code");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("mobile", mobile);
      formData.append("otp", otp);


      const data = await verifyOtp(mobile, otp);

      if (data.success) {
        if (data.login) {
          if (data.access_token)
             document.cookie = `access_token=${data.access_token}; path=/; max-age=86400`;
            localStorage.setItem("token", data.access_token);
               localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
          window.location.href = "/";
        } else {
          onRegister();
        }
      } else {
        toast.error(data.message || "Invalid OTP code");
      }
    } catch (err) {
      console.error("Verification error", err);
      toast.error("Failed to verify OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Enter the code we texted you
        </h2>
        <p className="mt-2 leading-6 text-gray-600 py-4">
          We&apos;ve sent an SMS to{" "}
          <span className=" text-gray-800">{mobile}</span>
        </p>

        {/* Input Section */}
        <div className="relative mt-6">
          <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] text-gray-400 z-10">
            SMS code
          </label>
          <div className="border border-gray-300 rounded-xl px-4 py-4 bg-white focus-within:border-blue-500 transition-all">
            <input
              type="text"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="123 456"
              suppressHydrationWarning
              className="w-full bg-transparent outline-none font-semibold text-black text-2xl tracking-[0.4em] placeholder:tracking-normal placeholder:text-gray-200"
            />
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 leading-5 pr-4">
          Your 6 digit code is on its way. This can sometimes take a few moments
          to arrive.
        </p>

        <button
          onClick={handleResendCode}
          disabled={timer > 0 || resending}
          suppressHydrationWarning
          className={`text-sm font-bold underline mt-8 transition-colors block
            ${timer > 0 || resending ? "text-gray-300 cursor-not-allowed no-underline" : "text-[#1e2d3d] hover:text-black"}
          `}
        >
          {resending
            ? "Sending..."
            : timer > 0
              ? `Resend code in ${timer}s`
              : "Resend code"}
        </button>
      </div>

      <button
        onClick={handleVerifyOTP}
        disabled={loading}
        suppressHydrationWarning
        className="w-full bg-[#1e2d3d] text-white py-4 rounded-xl font-semibold hover:bg-black transition-all disabled:opacity-50 shadow-lg"
      >
        {loading ? "Verifying..." : "Get Started"}
      </button>
    </div>
  );
}

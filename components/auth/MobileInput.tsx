"use client";
import Link from "next/link";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { sendOtp } from "@/lib/auth";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

interface MobileInputProps {
  mobile: string;
  setMobile: (val: string) => void;
  onNext: () => void;
}

export default function MobileInput({
  mobile,
  setMobile,
  onNext,
}: MobileInputProps) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSendOTP = async () => {
    if (mobile.length < 12) {
      return toast.error("Please enter a valid 10-digit mobile number");
    }

    setLoading(true);
    const toastId = toast.loading("Sending OTP...");

    try {
      const data = await sendOtp(mobile);

      if (data.success) {
        toast.success(data.message || "OTP sent successfully!", {
          id: toastId,
        });
        onNext();
      } else {
        toast.error(data.message || "Failed to send OTP", { id: toastId });
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Enter your phone number
        </h2>
        <p className="mt-2 leading-6 text-gray-600 py-5">
          We use your mobile number to identify your account
        </p>

        <div className="relative mt-8 phone-container">
          <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] text-gray-400 z-10">
            Phone number
          </label>

          <PhoneInput
            country={"in"}
            value={mobile}
            onChange={(value) => setMobile("+" + value)}
            disabled={loading}
            countryCodeEditable={false}
            prefix="+"
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: true,
            }}
            containerClass="!w-full"
            inputClass="!w-full !h-[56px] !text-lg !font-semibold !rounded-xl !border-gray-300 focus:!border-blue-500 !bg-white !text-black !pl-[55px]"
            buttonClass="!bg-transparent !border-none !rounded-l-xl !pl-2"
            dropdownClass="!rounded-lg"
          />
        </div>

        <style jsx global>{`
          .phone-container .form-control:focus {
            border-color: #3b82f6 !important;
            box-shadow: none !important;
          }
          /* This prevents the flag area from looking like a separate button */
          .phone-container .selected-flag {
            background: transparent !important;
            cursor: default !important;
          }
          .phone-container .selected-flag:hover {
            background: transparent !important;
          }
          /* Removes the dropdown arrow since code is not editable */
          .phone-container .selected-flag .arrow {
            display: none !important;
          }
        `}</style>

        <p className="text-xs text-gray-400 mt-4 text-center">
          By tapping Get started, you agree to the{" "}
          <Link href="#" className="text-gray-500 underline underline-offset-2">
            Terms & Conditions
          </Link>
        </p>
      </div>

      <button
        onClick={handleSendOTP}
        disabled={loading}
        className="w-full bg-[#1e2d3d] text-white py-4 rounded-xl font-semibold hover:bg-black transition-all disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
      >
        {loading && (
          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {loading ? "Sending..." : "Get Started"}
      </button>
    </div>
  );
}

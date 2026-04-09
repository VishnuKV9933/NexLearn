"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
interface ProfileFormProps {
  mobile: string;
}

export default function ProfileForm({ mobile }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    qualification: "",
    profile_image: null as File | null,
    imagePreview: "",
  });

  const qualifications = [
    "High School",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD",
    "Other",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        return toast.error("Image size should be less than 2MB");
      }

      setFormData({
        ...formData,
        profile_image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) return toast.error("Please enter your name");
    if (!formData.email.trim()) return toast.error("Please enter your email");
    if (!formData.qualification)
      return toast.error("Please select your qualification");
    if (!formData.profile_image)
      return toast.error("Please upload a profile image");

    setLoading(true);
    const loadingToast = toast.loading("Creating your profile...");

    try {
      const data = new FormData();
      data.append("mobile", mobile);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("qualification", formData.qualification);
      data.append("profile_image", formData.profile_image);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/create-profile`,
        {
          method: "POST",
          body: data,
        },
      );

      const result = await response.json();

      if (result.success) {
        toast.success(result.message || "Profile created successfully!", {
          id: loadingToast,
        });
         document.cookie = `access_token=${result.access_token}; path=/; max-age=86400`;
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);
        router.push("/");
      } else {
        toast.error(result.message || "Failed to create profile", {
          id: loadingToast,
        });
      }
    } catch (error) {
      console.error("Profile creation error:", error);
      toast.error("Something went wrong. Please try again.", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-4 flex-shrink-0">
        Add Your Details
      </h2>

      <div className="flex-1 overflow-y-auto no-scrollbar py-2 space-y-6">
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        <div className="flex justify-center mb-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
          <div
            onClick={() => !loading && fileInputRef.current?.click()}
            className="w-28 h-28 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden relative"
          >
            {formData.imagePreview ? (
              <img
                src={formData.imagePreview}
                className="w-full h-full object-cover"
                alt="Preview"
              />
            ) : (
              <div className="text-center p-2">
                <svg
                  className="w-6 h-6 mx-auto text-gray-400 mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-[10px] text-gray-400">
                  Add Your Profile picture
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] text-gray-400 z-10">
            Name*
          </label>
          <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500">
            <input
              type="text"
              placeholder="Enter your Full Name"
              disabled={loading}
              className="w-full outline-none text-gray-800 font-medium placeholder:text-gray-300 bg-transparent"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] text-gray-400 z-10">
            Email*
          </label>
          <div className="border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500">
            <input
              type="email"
              placeholder="Enter your Email Address"
              disabled={loading}
              className="w-full outline-none text-gray-800 font-medium placeholder:text-gray-300 bg-transparent"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="relative">
          <label className="absolute -top-2.5 left-4 bg-white px-2 text-[13px] text-gray-400 z-10">
            Your qualification*
          </label>
          <div className="relative border border-gray-300 rounded-xl bg-white focus-within:border-blue-500">
            <select
              disabled={loading}
              value={formData.qualification}
              onChange={(e) =>
                setFormData({ ...formData, qualification: e.target.value })
              }
              className={`w-full appearance-none bg-transparent px-4 py-3 outline-none font-medium cursor-pointer ${formData.qualification ? "text-gray-800" : "text-gray-300"}`}
            >
              <option value="" disabled hidden>
                Choose Qualification
              </option>
              {qualifications.map((q) => (
                <option key={q} value={q} className="text-gray-800">
                  {q}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path
                  d="M1 1.5L7 7.5L13 1.5"
                  stroke="#1C3141"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex-shrink-0">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#1e2d3d] text-white py-4 rounded-xl font-semibold hover:bg-black transition-all disabled:opacity-50 shadow-lg flex justify-center items-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {loading ? "Creating Profile..." : "Get Started"}
        </button>
      </div>
    </div>
  );
}

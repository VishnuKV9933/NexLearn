"use client";

import Image from "next/image";
import logo from "../../public/assets/header/headerLogo.png";
import { logout } from "@/lib/fetchClient";

export default function Header() {

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="w-24"></div>

      <div className="flex-1 flex justify-center">
        <Image
          src={logo}
          alt="NexLearn Logo"
          width={150}
          height={40}
          className="object-contain h-auto"
          priority
        />
      </div>

      <div className="w-24 flex justify-end">
        <button
          onClick={logout}
          className=" bg-[#177A9C] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

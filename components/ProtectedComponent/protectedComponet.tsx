"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
   const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
     const token = localStorage.getItem("access_token");

     if (!token) {
       router.replace("/login");
     } else {
      setIsChecking(false);
     }
  }, [router]);

 if (isChecking) return null; 

  return <>{children}</>;
}
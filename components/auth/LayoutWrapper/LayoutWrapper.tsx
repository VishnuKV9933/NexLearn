"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideHeader = pathname === "/login";

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}
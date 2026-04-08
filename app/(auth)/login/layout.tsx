import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Login | NexLearn",
   description: "Login to your NexLearn account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
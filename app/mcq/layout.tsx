import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCQ | NexLearn",
  description: "Attend mqc test",
};

export default function MCQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
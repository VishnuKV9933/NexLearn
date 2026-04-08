import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/components/StoreProvider/StoreProvider";
import LayoutWrapper from "@/components/auth/LayoutWrapper/LayoutWrapper";
export const metadata: Metadata = {
  title: "NexLearn",
  description: "Nexlearn home page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Gen Blog",
  description: "A Next.js blog starter with Tailwind CSS and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* className={inter.className + " h-full"} */}
      <body className={"h-full dark:bg-gray-800"}>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { BASE_URL } from "./lib/constants";

export const metadata: Metadata = {
  title: {
    template: '%s | NextGen Blog',
    default: 'NextGen Blog',
  },
  description:  "A blog for the next generation",
  metadataBase: BASE_URL,
  generator: 'Next.js',
  applicationName: 'NexGen Blog',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  creator: 'Gautam Thapar',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={"h-full dark:bg-gray-800"}>{children}</body>
    </html>
  );
}

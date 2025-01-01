import type { Metadata } from "next";

import "./globals.css";
import ReactQueryProvider from "@/components/providers/react-query-provider";

export const metadata: Metadata = {
  title: {
    default: "Ucourse",
    template: "%s | Ucourse",
  },
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}

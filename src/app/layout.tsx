import type { Metadata } from "next";

import "./globals.css";
import { getServerSession } from "next-auth";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import SessionAuthProvider from "@/components/providers/session-auth-provider";
import authOptions from "@/lib/authOptions";

export const metadata: Metadata = {
  title: {
    default: "Ucourse",
    template: "%s | Ucourse",
  },
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <SessionAuthProvider session={session}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

import "./globals.css";
import { getServerSession } from "next-auth";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import SessionAuthProvider from "@/components/providers/session-auth-provider";
import authOptions from "@/lib/authOptions";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    default: "Urcourse",
    template: "%s | Urcourse",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
  openGraph: {
    title: "Urcourse",
    description:
      "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
    type: "website",
    locale: "id_ID",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
    siteName: "Urcourse",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className=" scroll-smooth">
        <NextTopLoader showSpinner={false} />
        <SessionAuthProvider session={session}>
          <ReactQueryProvider>
            {children}
            <Toaster closeButton position="bottom-right" />
          </ReactQueryProvider>
        </SessionAuthProvider>
      </body>
    </html>
  );
}

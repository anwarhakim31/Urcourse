"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Averia_Serif_Libre } from "next/font/google";
import { usePathname } from "next/navigation";

const font = Averia_Serif_Libre({
  subsets: ["latin"],
  weight: "400",
});

const LogoComponent = () => {
  const pathname = usePathname();

  return (
    <Link
      href={pathname.startsWith("/admin/") ? "/admin/dashboard" : "/"}
      className="flex items-center "
    >
      <Image src="/logo.png" alt="logo" width={40} height={40} priority />
      <span
        style={{ fontFamily: font.style.fontFamily }}
        className="text-2xl text-purple-700  tracking-wide font-medium"
      >
        learn
      </span>
    </Link>
  );
};

export default LogoComponent;

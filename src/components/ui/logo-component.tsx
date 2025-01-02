"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rubik } from "next/font/google";
import { usePathname } from "next/navigation";

const font = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const LogoComponent = () => {
  const pathname = usePathname();

  return (
    <Link
      href={pathname.startsWith("/admin/") ? "/admin/dashboard" : "/"}
      className="flex items-center gap-2 "
    >
      <Image src="/logo.svg" width={40} height={40} alt="logo" priority />
      <span
        style={{ fontFamily: font.style.fontFamily }}
        className="text-lg text-indigo-700  font-medium"
      >
        Urcourse
      </span>
    </Link>
  );
};

export default LogoComponent;

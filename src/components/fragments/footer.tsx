import React from "react";
import { Separator } from "../ui/separator";
import LogoComponent from "../ui/logo-component";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white ">
      <div className="container">
        <Separator />
        <div className="py-20 flex items-center justify-between flex-col md:flex-row gap-8 md:gap-4">
          <LogoComponent title={true} />
          <p className="w-[300px] text-sm text-slate-700 text-center">
            Online learning platform designed to help users enhance their skills
            with high-quality materials and engaging learning experiences. It
            offers access to various courses in fields like technology,
            business, and design, curated by industry experts.
          </p>
          <div className="flex-center gap-4">
            <Link
              href={"https://www.instagram.com/urcourse.id"}
              target={"_blank"}
              className="flex-center w-10 h-10 rounded-full bg-indigo-700"
            >
              <Instagram size={20} strokeWidth={1.5} className="text-white" />
            </Link>

            <Link
              href={"https://www.twitter.com/urcourse.id"}
              target={"_blank"}
              className="flex-center w-10 h-10 rounded-full bg-indigo-700"
            >
              <Twitter size={20} strokeWidth={1.5} className="text-white" />
            </Link>
            <Link
              href={"https://www.facebook.com/urcourse.id"}
              target={"_blank"}
              className="flex-center w-10 h-10 rounded-full bg-indigo-700"
            >
              <Facebook size={20} strokeWidth={1.5} className="text-white" />
            </Link>
          </div>
        </div>
        <Separator />
        <div className="flex-center p-4 text-xs text-slate-500 ">
          <p>Urcourse © 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

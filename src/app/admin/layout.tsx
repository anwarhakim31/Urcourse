import HeaderAdmin from "@/components/fragments/header-admin";
import Sidebar from "@/components/fragments/sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex ">
      <aside className="hidden lg:block h-screen w-56">
        <Sidebar />
      </aside>
      <main className="flex-1 overflow-hidden">
        <header className="border-b px-4 md:px-7 py-2.5 border-slate-300 bg-white">
          <HeaderAdmin />
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

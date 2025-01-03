import HeaderAdmin from "@/components/fragments/header-admin";
import Sidebar from "@/components/fragments/sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex ">
      <aside className="hidden lg:block h-screen w-56">
        <Sidebar />
      </aside>
      <main className="flex-1">
        <header className="border-b px-7 py-2.5 border-slate-300">
          <HeaderAdmin />
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

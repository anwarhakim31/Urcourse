"use client";
import React from "react";
import LogoComponent from "../ui/logo-component";
import { sidebarItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();

  return (
    <div className="w-full h-full border-r flex flex-col bg-white shadow-sm overflow-y-auto border-slate-300">
      <div className="p-3  flex-center">
        <LogoComponent />
      </div>
      <div className="flex flex-col w-full ">
        {sidebarItems.map((item: (typeof sidebarItems)[0]) => (
          <Link
            href={item.path}
            key={item.name}
            onClick={onClose}
            className={cn(
              "flex items-center gap-x-2 text-slate-600 text-sm font-medium pl-6 transition-all hover:text-slate-700 hover:bg-indigo-400/10",
              pathname.startsWith(item.path) &&
                "bg-indigo-400/20 text-indigo-700 hover:bg-indigo-400/20 hover:text-indigo-700"
            )}
          >
            <div className="flex items-center gap-x-2 py-4">
              {item.icon && <item.icon size={18} strokeWidth={1.5} />}
              <span className="text-sm">{item.name}</span>
            </div>

            <div
              className={cn(
                "bg-indigo-700 h-full w-1 ml-auto opacity-0 transition-all duration-200",

                pathname.startsWith(item.path) && "opacity-100"
              )}
            ></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

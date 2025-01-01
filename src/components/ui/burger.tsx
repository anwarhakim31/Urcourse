import { cn } from "@/lib/utils";
import React from "react";

const Burger = ({ open }: { open: boolean }) => {
  return (
    <div className="flex justify-center flex-col p-0.5   w-6 h-6 space-y-1 group  ">
      <div
        className={cn(
          "w-full h-0.5 bg-slate-600 trnsform duration-200 ease-in-out",
          open && "-rotate-45"
        )}
      ></div>
      <div
        className={cn(
          "w-full h-0.5 bg-slate-600 trnsform duration-200 ease-in-out",
          open && "translate-x-5 opacity-0"
        )}
      ></div>
      <div
        className={cn(
          "w-1/2 h-0.5 group-hover:w-full bg-slate-600 transform duration-200 ease-in-out",
          open && "w-full rotate-45"
        )}
      ></div>
    </div>
  );
};

export default Burger;

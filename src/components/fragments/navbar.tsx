import React from "react";
import Link from "next/link";

import { navItem } from "@/utils/constants";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";

const Navbar = ({ onClose }: { onClose?: () => void }) => {
  const path = usePathname();

  return (
    <div className="flex items-center justify-center flex-col md:flex-row gap-2  w-full h-full">
      {navItem.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          onClick={onClose}
          className={cn(
            "relative px-2 text-sm py-1.5 font-medium ",
            item.path === path && "text-indigo-700",
            item.path !== path &&
              "after:w-0 after:absolute after:left-0  after:bottom-0 hover:after:h-0.5 hover:after:w-full hover:after:bg-indigo-700 after:transition-all after:duration-300 after:ease-linear"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;

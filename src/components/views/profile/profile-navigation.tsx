import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileNavigation = () => {
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-[300px] bg-white rounded-lg h-max  p-6 space-y-4 flex flex-col indigo border">
      <Link
        href={"/profile/user"}
        className={cn(
          "font-medium text-sm rounded-md px-4 py-2.5 text-slate-800 hover:text-indigo-700",
          pathname === "/profile" && "text-indigo-700 bg-indigo-400/20",
          pathname === "/profile/user" && "text-indigo-700 bg-indigo-400/20"
        )}
      >
        <span>My profile</span>
      </Link>
      <Link
        href={"/profile/course"}
        className={cn(
          "font-medium text-sm rounded-md px-4 py-2 text-slate-800 hover:text-indigo-700",
          pathname === "/profile/course" && "text-indigo-700 bg-indigo-400/20"
        )}
      >
        <span>My Course</span>
      </Link>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className={cn(
          "font-medium text-sm rounded-md px-4 py-2 text-slate-800 hover:text-indigo-700 text-left"
        )}
      >
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileNavigation;

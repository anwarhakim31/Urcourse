import React from "react";
import Link from "next/link";
import Image from "next/image";
import { splitFullName } from "@/utils/helpers";
import { navItem } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = ({ onClose }: { onClose?: () => void }) => {
  const session = useSession();
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
      {session.data?.user ? (
        <Link
          href="/profile"
          className="w-9 h-9 rounded-full overflow-hidden bg-gray-200"
        >
          {session.data.user.photo ? (
            <Image
              src={session.data.user.photo || ""}
              width={255}
              height={255}
              alt={session?.data?.user?.fullname || ""}
              className=""
              priority
            />
          ) : (
            <div className="w-full h-full flex-center bg-indigo-700">
              <span className="text-sm font-semibold text-white">
                {splitFullName(session?.data?.user?.fullname || "")}
              </span>
            </div>
          )}
        </Link>
      ) : (
        <div className="flex items-center flex-col  md:flex-row gap-4 w-full p-4">
          <Link href={"/login"} className="btn px-4 py-1.5 w-full">
            Login
          </Link>
          <Link href={"/register"} className="btn px-4 py-1.5 w-full">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

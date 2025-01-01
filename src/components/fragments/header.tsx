"use client";
import React from "react";
import LogoComponent from "../ui/logo-component";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { splitFullName } from "@/utils/helpers";

const Header = () => {
  const session = useSession();

  return (
    <div className="fixed top-0 left-0 w-full z-50  border-b">
      <header className="container h-14 flex items-center justify-between">
        <LogoComponent />
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
          <div className="flex items-center gap-2">
            <Link href={"/login"} className="btn px-4 py-1.5">
              Login
            </Link>
            <Link href={"/register"} className="btn px-4 py-1.5">
              Register
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;

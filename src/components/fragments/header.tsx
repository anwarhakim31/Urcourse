"use client";
import React from "react";
import LogoComponent from "../ui/logo-component";
import { useSession } from "next-auth/react";
import Burger from "../ui/burger";
import Navbar from "./navbar";
import Image from "next/image";
import { splitFullName } from "@/utils/helpers";
import Link from "next/link";
const Header = () => {
  const session = useSession();
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [isScroll, setIsScroll] = React.useState(false);

  const handleToggle = () => {
    if (pending) return;

    setPending(true);
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }

    setTimeout(() => {
      setPending(false);
    }, 500);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <div className="relative">
      <header
        className={`fixed top-0 left-0 w-full    z-[1000] ${
          isScroll &&
          "shadow-[0_5px_8px_rgba(0,0,0,0.1)] border-b bg-white backdrop-blur-sm"
        } ${open && "bg-white"} `}
      >
        <div className="container  h-14 flex items-center justify-between  gap-4">
          <LogoComponent />

          <div className="flex items-center gap-4">
            <nav className="hidden md:block">
              <Navbar onClose={handleToggle} />
            </nav>
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
              <Link href={"/login"} className="btn px-4 py-1.5 w-full">
                Login
              </Link>
            )}

            <button onClick={handleToggle} className="block md:hidden">
              <Burger open={open} />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed top-0 left-0 w-full z-50 flex-center md:hidden mt-14 h-[calc(100vh-3.5rem)]  bg-white">
          <Navbar onClose={handleToggle} />
        </div>
      )}
    </div>
  );
};

export default Header;

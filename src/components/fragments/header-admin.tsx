"use client";

import React from "react";
import Sidebar from "./sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Burger from "../ui/burger";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { splitFullName } from "@/utils/helpers";
import { SearchCommand } from "./search-command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const HeaderAdmin = () => {
  const session = useSession();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 976px)");

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center w-full">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            onClick={() => setOpen(true)}
            className="flex-center lg:hidden "
          >
            <Burger open={open} />
          </SheetTrigger>
          {isMobile && (
            <SheetContent side={"left"} className="p-0 bg-white w-full">
              <SheetTitle />
              <SheetDescription />
              <Sidebar onClose={() => setOpen(false)} />
            </SheetContent>
          )}
        </Sheet>

        <SearchCommand />
      </div>

      <Popover>
        <PopoverTrigger className="flex gap-2 items-center">
          <figure className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 ml-auto">
            {session?.data?.user?.photo ? (
              <Image
                src={session.data.user.photo || ""}
                width={255}
                height={255}
                alt={session?.data?.user?.fullname || ""}
                className="w-full h-full object-center object-cover"
                priority
              />
            ) : (
              <figcaption className="w-full h-full flex-center bg-indigo-700">
                <span className="text-sm font-semibold text-white">
                  {splitFullName(session?.data?.user?.fullname || "")}
                </span>
              </figcaption>
            )}
          </figure>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0 mt-2 mr-5">
          <div className="p-2 select-none">
            <p className="text-sm ">{session?.data?.user?.fullname}</p>
            <p className="text-xs ">Administrator</p>
          </div>

          <Separator />

          {/* <ProfileSheet /> */}
          <button
            className="text-sm text-left w-full p-2 block hover:bg-indigo-400/20 transition-all duration-200 ease-in-out"
            aria-label="Logout"
            type="button"
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
          >
            Logout
          </button>
        </PopoverContent>
      </Popover>

      <Link href="/profile"></Link>
    </div>
  );
};

export default HeaderAdmin;

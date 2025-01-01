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
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { splitFullName } from "@/utils/helpers";
import { SearchCommand } from "./search-command";

const HeaderAdmin = () => {
  const session = useSession();
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 976px)");

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2 items-center w-full">
        {isMobile && (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              onClick={() => setOpen(true)}
              className="flex-center lg:hidden "
            >
              <Burger open={open} />
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0 bg-white w-full">
              <SheetTitle />
              <SheetDescription />
              <Sidebar onClose={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
        )}
        <SearchCommand />
      </div>

      <Link
        href="/profile"
        className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 ml-auto"
      >
        {session?.data?.user?.photo ? (
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
    </div>
  );
};

export default HeaderAdmin;

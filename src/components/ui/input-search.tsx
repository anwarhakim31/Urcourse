"use client";
import React from "react";
import { Input } from "./input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const InputSearch = ({ ...props }: React.ComponentProps<typeof Input>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = React.useState(searchParams.get("search") || "");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setTimeout(() => {
      const param = new URLSearchParams(searchParams);

      if (value) {
        if (pathname !== "/course") param.set("page", "1");
        param.set("search", value);
      } else {
        if (value === "") param.delete("search");
        if (value === "" && param.size === 1) param.delete("page");
      }

      const url = `${pathname}?${param.toString()}`;
      router.replace(url);
    }, 500);
  };

  return (
    <div className="relative w-full bg-white rounded-full md:max-w-[300px]">
      <Search
        width={16}
        height={16}
        strokeWidth={1.5}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-700"
      />

      <Input
        type="search"
        onChange={handleSearch}
        value={search}
        className={cn("pl-10 rounded-full bg-white text-sm ", props.className)}
        {...props}
      />
    </div>
  );
};

export default InputSearch;

"use client";

import * as React from "react";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { sidebarItems } from "@/utils/constants";
import Link from "next/link";

export function SearchCommand() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "r" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        className="w-full max-w-[220px]  rounded-md border hidden md:flex items-center justify-between"
        onClick={() => setOpen(true)}
      >
        <div className="flex gap-2 items-center px-2 flex-1">
          <Search strokeWidth={1.5} size={18} />
          <p className="text-sm">Search...</p>
        </div>
        <kbd className="pointer-events-none inline-flex h-8 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>R
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {sidebarItems.map((item: (typeof sidebarItems)[0]) => (
              <CommandItem key={item.path} value={item.name}>
                <Link href={item.path} className="flex items-center gap-2">
                  {" "}
                  {item.icon && <item.icon size={16} strokeWidth={1.5} />}
                  <span>{item.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}

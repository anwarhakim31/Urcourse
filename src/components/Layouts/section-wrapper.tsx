import React from "react";
import { ScrollArea } from "../ui/scroll-area";

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollArea className=" h-[calc(100vh-3.6rem)] ">
      <section className="p-8">{children}</section>
    </ScrollArea>
  );
};

export default SectionWrapper;

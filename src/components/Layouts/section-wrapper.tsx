import React from "react";
import { ScrollArea } from "../ui/scroll-area";

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollArea className=" h-[calc(100vh-3.6rem)] p-4">{children}</ScrollArea>
  );
};

export default SectionWrapper;

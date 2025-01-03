import React, { Fragment } from "react";
import { ScrollArea } from "../ui/scroll-area";

const SectionWrapper = ({
  children,
  isScroll,
}: {
  children: React.ReactNode;
  isScroll?: boolean;
}) => {
  return (
    <Fragment>
      {isScroll ? (
        <ScrollArea className=" h-[calc(100vh-3.6rem)] ">
          <section className="p-8">{children}</section>
        </ScrollArea>
      ) : (
        <section className="h-[calc(100vh-3.6rem)] p-8 overflow-hidden">
          {children}
        </section>
      )}
    </Fragment>
  );
};

export default SectionWrapper;

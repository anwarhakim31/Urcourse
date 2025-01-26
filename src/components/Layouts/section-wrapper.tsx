import React, { Fragment } from "react";
import { ScrollArea } from "../ui/scroll-area";

const SectionWrapper = ({
  children,
  isScroll,
  isPadding = true,
}: {
  children: React.ReactNode;
  isScroll?: boolean;
  isPadding?: boolean;
}) => {
  return (
    <Fragment>
      {isScroll ? (
        <ScrollArea
          className={` h-[calc(100vh-3.6rem)] ${isPadding ? "p-4 md:p-8" : ""}`}
        >
          <section className={` w-full`}>{children}</section>
        </ScrollArea>
      ) : (
        <section className="p-4 h-[calc(100vh-3.6rem)] md:p-8">
          {children}
        </section>
      )}
    </Fragment>
  );
};

export default SectionWrapper;

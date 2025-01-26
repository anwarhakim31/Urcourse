"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { accordionData } from "@/utils/constants";
import Image from "next/image";
import React from "react";

const DiffrentView = () => {
  const [openItem, setOpenItem] = React.useState<string | null>(null);
  const [imageNow, setImageNow] = React.useState<string | null>(
    "/accordion/acor1.png"
  );
  const [isImageVisible, setIsImageVisible] = React.useState(true);

  const toggleAccordion = (value: string) => {
    if (
      value !== openItem &&
      imageNow !== accordionData.find((item) => item.value === value)?.image
    ) {
      setIsImageVisible(false);
      setTimeout(() => {
        const image = accordionData.find((item) => item.value === value)?.image;
        if (image) {
          setImageNow(image);
        }
        setIsImageVisible(true);
      }, 300);
    }
    setOpenItem(value);
  };

  return (
    <section className="pt-24  container ">
      <h1 className="text-center capitalize text-2xl md:text-3xl text-slate-700 ">
        Why urcourse is different?
      </h1>
      <p className=" mt-4 text-slate-700 max-w-[600px] text-center mx-auto">
        It&apos;s time to wisely choose learning resources. Not only is the
        material guaranteed, Dicoding Academy also has professional reviewers
        who will review your code.
      </p>
      <div className="flex items-center mt-20 gap-6">
        <Accordion
          type="single"
          collapsible
          className="space-y-6 w-full md:w-1/2"
          value={openItem?.toString()}
          onValueChange={setOpenItem}
        >
          {accordionData.map((item) => (
            <AccordionItem value={item.value} key={item.value}>
              <AccordionTrigger
                onClick={() => toggleAccordion(item.value)}
                className="text-base px-4 border border-b-0  rounded-tl-md rounded-tr-md bg-white font-medium "
              >
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="p-4 border-x rounded-bl-md rounded-br-md bg-white text-gray-700 ">
                {item.content}
                <div className=" w-full  flex-center md:hidden">
                  <Image
                    src={imageNow || "/accordion/acor1.png"}
                    alt={"image"}
                    width={500}
                    height={500}
                    priority
                    className={cn(
                      "w-full object-contain  transition-opacity duration-400 ease-in-out",
                      isImageVisible ? "opacity-100" : "opacity-0"
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="hidden w-full  md:w-1/2  md:flex-center">
          <Image
            src={imageNow || "/accordion/acor1.png"}
            alt={"image"}
            width={500}
            height={500}
            priority
            className={cn(
              "w-full object-contain  transition-opacity duration-300 ease-in-out",
              isImageVisible ? "opacity-100" : "opacity-0"
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default DiffrentView;

import { Course } from "@/types/model";
import { formatCurrency } from "@/utils/helpers";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({ item }: { item: Course }) => {
  return (
    <Link href={"/course/" + item.id}>
      <div className="rounded-md border shadow-md flex flex-col overflow-hidden border-slate-300">
        <div className="flex-1">
          <div className="relative w-full aspect-video">
            <Image
              src={item.image || ""}
              alt={item.title}
              width={500}
              height={500}
              priority
              className="absolute inset-0 w-full h-full"
            />
            <span className="absolute flex items-center gap-2 pointer-events-none border-indigo-700 z-[1] border rounded-full font-medium bg-indigo-100 px-2 py-1 text-xs top-2 right-2">
              <Gem size={16} strokeWidth={1.5} className="text-indigo-700" />{" "}
              {item.level}
            </span>
          </div>
          <div className="p-2.5 pb-4">
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-slate-700 text-sm">{item?.category?.name}</p>
            <p className="mt-2 text-indigo-700 font-medium">
              {formatCurrency((item.price as number) || 0)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

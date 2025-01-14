import { Course } from "@/types/model";
import { formatCurrency } from "@/utils/helpers";
import { Gem, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({ item }: { item: Course }) => {
  return (
    <Link href={"/course/" + item.id}>
      <div className="rounded-md  border flex flex-col overflow-hidden bg-white ">
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
          </div>
          <div className="p-2.5 pb-4">
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-slate-700 text-sm">{item?.category?.name}</p>
            <p className="mt-2 text-indigo-700 font-medium">
              {formatCurrency((item.price as number) || 0)}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="flex items-center gap-2  text-xs">
                <Star size={16} className="fill-yellow-500 text-yellow-500" />
                0/5
              </span>
              <span className="flex items-center gap-2 pointer-events-none text-indigo-700 border rounded-full font-medium  bg-indigo-100 px-4 py-0.5 text-xs">
                <Gem size={16} strokeWidth={1.5} className="text-indigo-700" />{" "}
                {item.level}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

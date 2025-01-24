import { cn } from "@/lib/utils";
import { Course } from "@/types/model";
import { formatCurrency } from "@/utils/helpers";
import { Gem, Ribbon, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({ item, isPaid }: { item: Course; isPaid: boolean }) => {
  return (
    <Link href={"/course/" + item.id}>
      <div className="rounded-md  border flex flex-col overflow-hidden bg-white ">
        <div className="flex-1">
          <div className="relative w-full aspect-video overflow-hidden rounded-md">
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
              {isPaid ? "Paid" : formatCurrency((item.price as number) || 0)}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="flex items-center gap-2  text-xs">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                {item.averageRating}/5
              </span>
              <div className="flex-center gap-2">
                <Ribbon
                  size={18}
                  strokeWidth={1.5}
                  className={cn("text-orange-500")}
                />
                <Gem
                  size={18}
                  strokeWidth={1.5}
                  className={cn(
                    "text-indigo-700",
                    item.level === "Beginner" && "text-green-500",
                    item.level === "Intermediate" && "fill-yellow-500",
                    item.level === "Advanced" && "fill-red-500"
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

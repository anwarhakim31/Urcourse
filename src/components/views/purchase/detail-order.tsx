import React, { Fragment } from "react";
import Image from "next/image";
import { Purchase } from "@/types/model";
import { Book } from "lucide-react";
const DetailOrder = ({ purchase }: { purchase: Purchase }) => {
  return (
    <Fragment>
      <div className="flex gap-4 items-center">
        <div className="flex-center w-10 h-10 rounded-full bg-indigo-700">
          <Book size={18} color="white" />
        </div>
        <h3 className="font-semibold text-lg">Your Course</h3>
      </div>

      <div className="flex gap-2 flex-col">
        <div className="mt-6 relative w-full aspect-video rounded-md overflow-hidden border">
          <Image
            src={"/course/js.webp"}
            alt="qr"
            width={300}
            height={300}
            priority
            className="w-full h-full"
          />
        </div>
        <div className="flex-1  mt-2">
          <h5 className="font-medium text-md">{purchase?.course?.title}</h5>
          <p className="text-slate-700 text-md">
            {purchase?.course?.category?.name}
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailOrder;

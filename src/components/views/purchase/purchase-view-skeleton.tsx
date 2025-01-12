import { Skeleton } from "@/components/ui/skeleton";
import {
  overthecounter,
  virtualAccountItem,
  walletqrisItem,
} from "@/utils/constants";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

const PurchaseViewSkeleton = () => {
  return (
    <div className="py-24">
      <div className="flex flex-col  lg:flex-row container gap-6">
        <div className="block lg:hidden h-[200px] bg-white rounded-tr-md rounded-tl-md border p-6 w-full lg:w-[400px] ">
          <div className="flex gap-4 items-center">
            <Skeleton className="flex-center w-10 h-10 rounded-full "></Skeleton>
            <Skeleton className="font-semibold text-lg ">Your Course</Skeleton>
          </div>

          <div className="flex gap-2 flex-col">
            <div className="mt-6 relative w-full aspect-video rounded-md overflow-hidden border">
              <Skeleton className="w-full h-full"></Skeleton>
            </div>
            <div className="flex-1  mt-2">
              <h5 className="font-medium text-md">
                <Skeleton></Skeleton>
              </h5>
              <p className="text-slate-700 text-md">
                <Skeleton></Skeleton>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-white rounded-md border p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="flex-center h-10 w-10 rounded-full 0"></Skeleton>
            <h3 className="font-semibold text-lg">
              <Skeleton></Skeleton>
            </h3>
          </div>

          <div className="mt-6 max-w-[600px]">
            <h5 className="font-medium text-sm text-slate-700">
              <Skeleton></Skeleton>
            </h5>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {walletqrisItem.map((item) => (
                <Skeleton key={item.name} className="w-1/2 h-10"></Skeleton>
              ))}
            </div>
          </div>
          <div className="mt-6 ">
            <h5 className="font-medium text-sm text-slate-700">
              <Skeleton></Skeleton>
            </h5>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {virtualAccountItem.map((item) => (
                <Skeleton key={item.name} className="w-1/2 h-10"></Skeleton>
              ))}
            </div>
          </div>
          <div className="mt-6 ">
            <h5 className="font-medium text-sm text-slate-700">
              <Skeleton></Skeleton>
            </h5>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {overthecounter.map((item) => (
                <Skeleton key={item.name} className="w-1/2 h-10"></Skeleton>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div className="hidden lg:block bg-white rounded-tr-md rounded-tl-md border p-6 w-full lg:w-[400px] h-fit">
            <div className="flex gap-4 items-center">
              <Skeleton className="flex-center w-10 h-10 rounded-full bg-indigo-700"></Skeleton>
              <h3 className="font-semibold text-lg">Your Course</h3>
            </div>

            <div className="flex gap-2 flex-col">
              <div className="mt-6 relative w-full aspect-video rounded-md overflow-hidden border">
                <Skeleton className="w-full h-full"></Skeleton>
              </div>
              <div className="flex-1  mt-2">
                <h5 className="font-medium text-md">
                  <Skeleton></Skeleton>
                </h5>
                <p className="text-slate-700 text-md">
                  <Skeleton></Skeleton>
                </p>
              </div>
            </div>
          </div>

          <div className=" bg-white rounded-md lg:rounded-tr-none lg:rounded-tl-none border lg:border-t-0 p-6 w-full lg:w-[400px] h-fit">
            <div className="flex items-center gap-4">
              <Skeleton className="flex-center h-10 w-10 rounded-full bg-indigo-700"></Skeleton>
              <h3 className="font-semibold text-lg">
                <Skeleton></Skeleton>
              </h3>
            </div>

            <div className="space-y-4 mt-4">
              <div className=" text-sm flex justify-between items-center">
                <Skeleton className=" w-1/3 h-5"></Skeleton>
                <Skeleton className=" w-1/3 h-5"></Skeleton>
              </div>
              <div className=" text-sm flex justify-between items-center">
                <Skeleton className=" w-1/3 h-5"></Skeleton>
                <Skeleton className=" w-1/3 h-5"></Skeleton>
              </div>
              <Separator />
              <div className=" text-sm flex justify-between items-center">
                <Skeleton className=" w-1/3 h-5"></Skeleton>
                <Skeleton className=" w-1/3 h-5"></Skeleton>
              </div>
            </div>
            <div className="mt-8 flex-center flex-col">
              <Skeleton className=" w-1/2 h-10"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseViewSkeleton;

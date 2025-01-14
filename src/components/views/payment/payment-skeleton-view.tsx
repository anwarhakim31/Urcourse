import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const PaymentSkeleteonView = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="flex flex-col items-start lg:flex-row  container gap-6">
        <div className="w-full ">
          <div className="rounded-md border p-6 bg-white">
            <Skeleton className="flex items-center h-[4.5rem] w-full p-4  rounded-md gap-4"></Skeleton>
            <div className="flex justify-between  gap-2 mt-4">
              <div className="flex gap-2">
                <div className="relative  w-[150px]  aspect-video rounded-md  overflow-hidden">
                  <Skeleton className="w-full h-full"></Skeleton>
                </div>
                <div>
                  <Skeleton className="font-semibold  h-5 w-24"></Skeleton>
                  <Skeleton className="font-semibold mt-2 h-4 w-20"></Skeleton>
                </div>
              </div>
              <div className="hidden md:flex flex-col ">
                <Skeleton className="font-semibold mt-2 h-4 w-24"></Skeleton>
                <Skeleton className="font-semibold mt-2 h-8 w-24"></Skeleton>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 md:hidden  ">
              <Skeleton className="font-semibold mt-2 h-4 w-24"></Skeleton>
              <Skeleton className="font-semibold mt-2 h-8 w-14 ml-auto"></Skeleton>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-24 h-6"></Skeleton>

                <Skeleton className="border h-12 w-28 flex items-center gap-2 rounded-md p-2"></Skeleton>
              </div>
            </div>
            <Skeleton className="border h-12 w-full rounded-md mt-4"></Skeleton>
          </div>
          <div className="rounded-md border p-6 bg-white mt-6 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-[155px]">
                <Skeleton className="w-24 h-5"></Skeleton>
              </div>
              <Skeleton className="w-24 h-5"></Skeleton>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[155px]">
                <Skeleton className="w-24 h-5"></Skeleton>
              </div>
              <Skeleton className="w-24 h-5"></Skeleton>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[155px]">
                <Skeleton className="w-24 h-5"></Skeleton>
              </div>
              <Skeleton className="w-24 h-5"></Skeleton>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[500px]">
          <div className="w-full rounded-md border p-6 h-[5.5rem] bg-white flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
            <Skeleton className="w-24 h-5"></Skeleton>
          </div>
          <div className="w-full mt-6 rounded-md border p-6 min-h-[14rem] bg-white  gap-2">
            <Skeleton className="text-sm font-semibold text-transparent w-10">
              Notes
            </Skeleton>
            <div className=" mt-4 text-sm text-transparent space-y-2">
              <Skeleton>sss</Skeleton>
              <Skeleton>sss</Skeleton>
              <Skeleton>sss</Skeleton>
              <Skeleton>sss</Skeleton>
            </div>
          </div>
          <div className="w-full rounded-md border mt-6 p-6 bg-white flex items-center gap-2">
            <Skeleton className="w-10 h-10 rounded-full"></Skeleton>
            <div>
              <Skeleton className="w-24 h-5"></Skeleton>
              <Skeleton className="w-24 h-4 mt-3"></Skeleton>
              <Skeleton className="w-24 h-4 mt-2"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentSkeleteonView;

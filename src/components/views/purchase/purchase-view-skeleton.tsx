import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  creditcard,
  overthecounter,
  virtualAccountItem,
  walletqrisItem,
} from "@/utils/constants";

import React from "react";

const PurchaseViewSkeleton = () => {
  return (
    <div className="py-24">
      <div className="flex flex-col  lg:flex-row container gap-6">
        <div className="block lg:hidden bg-white rounded-tr-md rounded-tl-md border p-6 w-full lg:w-[400px] ">
          <div className="flex gap-4 items-center">
            <Skeleton className="flex-center h-10 w-10 rounded-full 0"></Skeleton>
            <Skeleton className="text-lg text-transparent">
              Choose your payment method
            </Skeleton>
          </div>

          <div className="flex gap-2 flex-col">
            <div className="mt-6 relative w-full aspect-video rounded-md overflow-hidden border">
              <Skeleton className="w-full h-full"></Skeleton>
            </div>
            <div className="flex-1  mt-2">
              <Skeleton className="font-medium text-md text-transparent">
                Javascript Dasar
              </Skeleton>
              <Skeleton className="text-transparent text-md mt-1">
                Frontend Web
              </Skeleton>
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-white rounded-md border p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="flex-center h-10 w-10 rounded-full 0"></Skeleton>
            <Skeleton className="text-lg text-transparent">
              Choose your payment method
            </Skeleton>
          </div>

          <div className="mt-6 max-w-[600px]">
            <Skeleton className="text-transparent text-sm w-fit">
              E-Wallet & QRIS
            </Skeleton>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {walletqrisItem.map((item) => (
                <Skeleton
                  key={item.name}
                  className="flex items-center gap-2 border text-transparent rounded-md px-4 py-1.5 text-xs "
                >
                  <div className="w-[50px] h-[25px]"></div>
                  <span>{item.name}</span>
                </Skeleton>
              ))}
            </div>
          </div>
          <div className="mt-6 ">
            <Skeleton className="text-transparent text-sm w-fit">
              Virtual Account
            </Skeleton>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {virtualAccountItem.map((item) => (
                <Skeleton
                  key={item.name}
                  className="flex items-center gap-2 border text-transparent rounded-md px-4 py-1.5 text-xs "
                >
                  <div className="w-[50px] h-[25px]"></div>
                  <span>{item.name}</span>
                </Skeleton>
              ))}
            </div>
          </div>
          <div className="mt-6 ">
            <Skeleton className="text-transparent text-sm w-fit">
              Over The Counter
            </Skeleton>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {overthecounter.map((item) => (
                <Skeleton
                  key={item.name}
                  className="flex items-center gap-2 border text-transparent rounded-md px-4 py-1.5 text-xs "
                >
                  <div className="w-[50px] h-[25px]"></div>
                  <span>{item.name}</span>
                </Skeleton>
              ))}
            </div>
          </div>
          <div className="mt-6 ">
            <Skeleton className="text-transparent text-sm w-fit">
              Credit Card
            </Skeleton>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {creditcard.map((item) => (
                <Skeleton
                  key={item.name}
                  className="flex items-center gap-2 border text-transparent rounded-md px-4 py-1.5 text-xs "
                >
                  <div className="w-[50px] h-[25px]"></div>
                  <span>{item.name}</span>
                </Skeleton>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div className="hidden lg:block bg-white rounded-tr-md rounded-tl-md border p-6 w-full lg:w-[400px] h-fit">
            <div className="flex gap-4 items-center">
              <Skeleton className="flex-center w-10 h-10 rounded-full"></Skeleton>
              <Skeleton className="text-transparent text-lg">
                Your Course
              </Skeleton>
            </div>

            <div className="flex gap-2 flex-col">
              <div className="mt-6 relative w-full aspect-video rounded-md overflow-hidden border">
                <Skeleton className="w-full h-full"></Skeleton>
              </div>
              <div className="flex-1  mt-2">
                <Skeleton className="font-medium text-md text-transparent">
                  Javascript Dasar
                </Skeleton>
                <Skeleton className="text-transparent text-md mt-1">
                  Frontend Web
                </Skeleton>
              </div>
            </div>
          </div>

          <div className=" bg-white rounded-md lg:rounded-tr-none lg:rounded-tl-none border lg:border-t-0 p-6 w-full lg:w-[400px] h-fit">
            <div className="flex items-center gap-4">
              <Skeleton className="flex-center h-10 w-10 rounded-full"></Skeleton>
              <Skeleton className="font-semibold text-lg text-transparent">
                Order Summary
              </Skeleton>
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

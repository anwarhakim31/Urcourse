"use client";

import React from "react";
import PaymentExpiredComponent from "./payment-expired-component";
import Image from "next/image";
import { formatCurrency, formatPaymentWith } from "@/utils/helpers";
import { Separator } from "@/components/ui/separator";
import PaymentActionComponent from "./payment-action-component";
import { cn } from "@/lib/utils";
import PaymentInfo from "./payment-info-component";
import useGetStatusTransaction from "@/hooks/transaction/useGetStatusTransaction";
import PaymentSkeletonView from "./payment-skeleton-view";

const PaymentView = ({ invoice }: { invoice: string }) => {
  const { data, isLoading, timeRemaining } = useGetStatusTransaction(invoice);

  const { image, name } = React.useMemo(() => {
    return formatPaymentWith(
      data?.data?.paymentName.toLocaleUpperCase() as string
    );
  }, [data]);

  return (
    <React.Fragment>
      {!isLoading ? (
        <main className="pt-24 pb-16 bg-back">
          <div className="flex flex-col items-start lg:flex-row  container gap-6">
            <div className="w-full ">
              <div className="rounded-md border p-6 bg-white">
                <PaymentExpiredComponent
                  transaction={data?.data}
                  timeRemaining={timeRemaining}
                  courseId={data?.data?.purchase?.course?.id}
                />
                <div className="flex justify-between  gap-2 mt-4">
                  <div className="flex gap-2">
                    <div className="relative  w-[150px]  aspect-video rounded-md  overflow-hidden">
                      <Image
                        src={data?.data?.purchase?.course?.image || ""}
                        alt={data?.data?.purchase?.course?.title || ""}
                        width={500}
                        height={500}
                        className="absolute inset-0 w-full h-full"
                        priority
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold ">
                        {data?.data?.purchase?.course?.title}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {data?.data?.purchase?.course?.category?.name}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex flex-col ">
                    <p className="text-slate-600 text-sm">Total Payment</p>
                    <p className="font-semibold text-lg ml-auto">
                      {formatCurrency(data?.data?.amount || 0)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 md:hidden  ">
                  <p className="text-slate-600 text-sm">Total Payment</p>
                  <p className="font-semibold text-lg ml-auto">
                    {formatCurrency(data?.data?.amount || 0)}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <p className="text-sm">Payment With</p>
                    <div className="border flex items-center gap-2 rounded-md p-2  bg-slate-50">
                      <Image
                        src={image}
                        alt={name}
                        width={500}
                        height={500}
                        className="h-8 w-14"
                        priority={true}
                      />
                      <p className="text-sm font-medium">{name}</p>
                    </div>
                  </div>
                  <PaymentActionComponent transcation={data?.data} />
                </div>
              </div>
              <div className="rounded-md border p-6 bg-white mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-slate-600 text-sm w-[155px]">
                    Status Transaction
                  </p>
                  <p
                    className={cn(
                      "px-4 py-0.5 border-2 rounded-full text-xs text-orange-400 border-orange-400",
                      data?.data?.status === "PAID"
                        ? "text-green-500 border-green-500"
                        : "",
                      data?.data?.status === "FAILED" &&
                        "text-red-500 border-red-500"
                    )}
                  >
                    {data?.data?.status}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-slate-600 text-sm w-[155px]">
                    No Transaction
                  </p>
                  <p className="text-sm">{data?.data?.invoice || "-"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-slate-600 text-sm w-[155px]">
                    Transaction Created
                  </p>
                  <p className="text-sm">
                    {
                      new Date(data?.data?.createdAt || Date.now())
                        .toISOString()
                        .split("T")[0]
                    }
                  </p>
                </div>
              </div>
            </div>

            <PaymentInfo />
          </div>
        </main>
      ) : (
        <PaymentSkeletonView />
      )}
    </React.Fragment>
  );
};

export default PaymentView;

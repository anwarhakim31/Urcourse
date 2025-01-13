"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Transaction } from "@/types/model";
import { formatCurrency, formatTimeClockId } from "@/utils/helpers";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const PaymentSuccessView = ({ transaction }: { transaction: Transaction }) => {
  const router = useRouter();
  return (
    <main className="pt-24 pb-16 flex-center">
      <div className="relative  w-full max-w-[420px] shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-lg bg-white p-4 pb-12 md:p-6 md:pb-14">
        <div className="rounded-full w-14 h-14 absolute flex-center  -top-8 shadow-md bg-white left-1/2 -translate-x-1/2">
          <div className="flex-center bg-green-500 w-8 h-8 rounded-full">
            <Check className="text-white " size={18} />
          </div>
        </div>
        <h1 className="mt-6 text-center font-medium text-lg">
          Payment Success!
        </h1>
        <p className="mt-2 mb-4  text-center text-slate-600">
          Your payment has been successfully done.
        </p>
        <Separator />
        <span className="block mt-4 text-slate-600 text-center">
          Total Payment
        </span>
        <h3 className="mt-2 text-center font-semibold text-lg">
          {formatCurrency(transaction?.amount || 0)}
        </h3>
        <div className="space-y-4 mt-4">
          <div className="flex-between">
            <p className="text-sm text-slate-600">Invoice</p>
            <p className="text-sm font-medium">{transaction?.invoice}</p>
          </div>
          <div className="flex-between">
            <p className="text-sm text-slate-600">Payment Time</p>
            <p className="text-sm font-medium">
              {formatTimeClockId(transaction.updatedAt || new Date())}
            </p>
          </div>
          <div className="flex-between">
            <p className="text-sm text-slate-600">Payment Method</p>
            <p className="text-sm font-medium">{transaction?.paymentName}</p>
          </div>
        </div>
        <Button
          onClick={() =>
            router.replace("/course/" + transaction.purchase?.course?.id)
          }
          className="w-full mt-8"
        >
          Start to Learn
        </Button>
        <Button
          variant={"outline"}
          onClick={() => router.replace("/")}
          className="w-full mt-4"
        >
          Back to Home
        </Button>
      </div>
    </main>
  );
};

export default PaymentSuccessView;

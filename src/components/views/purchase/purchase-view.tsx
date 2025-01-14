"use client";
import {
  overthecounter,
  virtualAccountItem,
  walletqrisItem,
} from "@/utils/constants";

import React, { useMemo, useRef } from "react";
import ButtonMethod from "./button-method";
import { Separator } from "@/components/ui/separator";
import { LoadingButton } from "@/components/ui/loading-button";
import { calculateFeeAndPPN, formatCurrency } from "@/utils/helpers";
import { Purchase } from "@/types/model";
import DetailOrder from "./detail-order";
import { CreditCard, ScrollText } from "lucide-react";
import useCreateTransaction from "@/hooks/transaction/useCreateTransaction";
import { Badge } from "@/components/ui/badge";

const PurchaseView = ({ purchase }: { purchase: Purchase }) => {
  const [isError, setIsError] = React.useState(false);
  const paymentRef = useRef<HTMLDivElement>(null);

  const [method, setMethod] = React.useState<{
    name: string;
    image: string;
    type: string;
  } | null>(null);

  const { tax, total, ppn } = useMemo(() => {
    return calculateFeeAndPPN(
      purchase?.price as number,
      method?.type as string
    );
  }, [method, purchase]);

  const { mutate, isPending } = useCreateTransaction();

  const handleContinue = () => {
    if (!method) {
      const element = paymentRef.current;
      if (element) {
        const offsetTop = element.offsetTop - 60;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }

      return setIsError(true);
    }

    mutate({
      purchaseId: purchase.id as string,
      paymentName: method?.name as string,
      paymentType: method?.type as string,
    });
  };

  return (
    <main className="py-24">
      <div className="flex flex-col  lg:flex-row container gap-6">
        <div className="block lg:hidden  bg-white rounded-tr-md rounded-tl-md border p-6 w-full lg:w-[400px] h-fit">
          <DetailOrder purchase={purchase} />
        </div>
        <div
          className="w-full h-fit bg-white rounded-md border p-6"
          ref={paymentRef}
        >
          <div className="flex items-center gap-4">
            <div className="flex-center h-10 w-10 rounded-full bg-indigo-700">
              <CreditCard size={18} color="white" />
            </div>
            <h3 className="font-semibold text-lg">
              Choose your payment method
            </h3>
          </div>

          <div className="mt-6 max-w-[600px]">
            <h5 className="font-medium text-sm text-slate-700">
              E-Wallet & QRIS
            </h5>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {walletqrisItem.map((item) => (
                <ButtonMethod
                  item={item}
                  key={item.name}
                  method={method}
                  disabled={isPending}
                  onClick={() => {
                    setMethod(item);
                    if (isError) setIsError(false);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 ">
            <h5 className="font-medium text-sm text-slate-700">
              Virtual Account
            </h5>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {virtualAccountItem.map((item) => (
                <ButtonMethod
                  item={item}
                  key={item.name}
                  method={method}
                  disabled={isPending}
                  onClick={() => {
                    setMethod(item);
                    if (isError) setIsError(false);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 ">
            <h5 className="font-medium text-sm text-slate-700">
              Over The Counter
            </h5>
            <div className="flex items-center flex-wrap gap-4 mt-2">
              {overthecounter.map((item) => (
                <ButtonMethod
                  item={item}
                  key={item.name}
                  method={method}
                  disabled={isPending}
                  onClick={() => {
                    setMethod(item);
                    if (isError) setIsError(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div className="hidden lg:block bg-white rounded-tr-md rounded-tl-md border p-6 w-full lg:w-[400px] h-fit">
            <DetailOrder purchase={purchase} />
          </div>

          <div className=" bg-white rounded-md lg:rounded-tr-none lg:rounded-tl-none border lg:border-t-0 p-6 w-full lg:w-[400px] h-fit">
            <div className="flex items-center gap-4">
              <div className="flex-center h-10 w-10 rounded-full bg-indigo-700">
                <ScrollText size={18} color="white" />
              </div>
              <h3 className="font-semibold text-lg">Order Summary</h3>
            </div>

            <div className="space-y-4 mt-4">
              <p className="text-slate-900 text-sm flex justify-between items-center">
                Subtotal{" "}
                <span className="font-semibold">
                  {formatCurrency(purchase.price as number)}
                </span>
              </p>
              <p className="text-slate-900 text-sm flex justify-between items-center">
                Tax Transaction{" "}
                <span className="font-semibold">{formatCurrency(tax)}</span>
              </p>
              <p className="text-slate-900 text-sm flex justify-between items-center">
                PPN 11%
                <span className="font-semibold">
                  {formatCurrency(ppn || 0)}
                </span>
              </p>
              <Separator />
              <p className="text-slate-900 text-sm flex justify-between items-center">
                <span className="font-semibold">Total</span>{" "}
                <span className="font-semibold">
                  {formatCurrency((total as number) || 0)}
                </span>
              </p>
            </div>
            <div className="mt-8 flex-center flex-col">
              {isError && (
                <Badge variant="destructive" className="mb-4">
                  Choose your payment method first
                </Badge>
              )}
              <LoadingButton
                className="w-full rounded-full "
                loading={isPending}
                disabled={isPending}
                onClick={handleContinue}
              >
                Continue Payment
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PurchaseView;

import { Button } from "@/components/ui/button";
import useCreatePurchase from "@/hooks/purchase/useCreatePurchase";
import { Transaction } from "@/types/model";
import { AlarmClock, X } from "lucide-react";
import React, { Fragment } from "react";

const PaymentExpiredComponent = ({
  transaction,
  timeRemaining,
  courseId,
}: {
  transaction: Transaction;
  timeRemaining: string;
  courseId: string;
}) => {
  const { mutate, isPending } = useCreatePurchase();

  return (
    <Fragment>
      {transaction?.status === "PENDING" ? (
        <div className="flex items-center p-4 bg-orange-100 rounded-md gap-4">
          <div className="w-10 h-10 rounded-full bg-orange-300 flex-center">
            <div className="w-8 h-8 rounded-full bg-orange-400 flex-center">
              <AlarmClock color="white" size={18} />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">
              Let &apos; s Pay your transaction!
            </p>
            <p className="text-sm">
              Payment time remaining{" "}
              <span className="font-semibold text-red-500">
                {timeRemaining || "00:00:00"}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center p-4 bg-red-200 rounded-md gap-4">
            <div className="w-10 h-10 rounded-full bg-red-400 flex-center">
              <div className="w-8 h-8 rounded-full bg-red-500 flex-center">
                <X color="white" size={18} />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">Payment Expired</p>
              <p className="text-sm">You can try to puchase again</p>
            </div>
          </div>
          <Button
            className="rounded-full mt-4 w-full h-10"
            disabled={isPending}
            onClick={() => mutate({ courseId })}
          >
            Puchase Again
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default PaymentExpiredComponent;

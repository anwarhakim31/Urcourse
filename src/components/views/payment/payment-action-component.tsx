import { Transaction } from "@/types/model";
import React from "react";
import { toast } from "sonner";

const PaymentActionComponent = ({
  transcation,
}: {
  transcation: Transaction;
}) => {
  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="w-full flex items-center  bg-indigo-400/20 p-4 rounded-md">
        <p className="text-sm w-[150px]">No. Virtual Account </p>
        <p className="font-bold text-sm ">{transcation.xenditCode}</p>
        <button
          className="ml-2 text-sm font-bold text-indigo-700"
          onClick={() =>
            navigator.clipboard
              .writeText(transcation.xenditCode as string)
              .then(() => toast.success("Payment code copied"))
          }
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default PaymentActionComponent;

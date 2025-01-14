import { Transaction } from "@/types/model";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const PaymentActionComponent = ({
  transcation,
}: {
  transcation: Transaction;
}) => {
  return (
    <div className="mt-4 flex items-center gap-4">
      {transcation?.status === "PENDING" &&
      transcation?.paymentMethod === "VIRTUAL_ACCOUNT" ? (
        <div className="w-full flex items-center h-12 bg-indigo-400/20 p-4 rounded-md">
          <p className="text-sm w-[150px]">No. Virtual Account </p>
          <p className="font-bold text-sm ">{transcation.paymentCode}</p>
          <button
            className="ml-2 text-sm font-bold text-indigo-700"
            onClick={() =>
              navigator.clipboard
                .writeText(transcation.paymentCode as string)
                .then(() => toast.success("Payment code copied"))
            }
          >
            Copy
          </button>
        </div>
      ) : null}
      {transcation?.status === "PENDING" &&
      transcation?.paymentMethod === "EWALLET" ? (
        <Link
          className="btn h-12 w-full flex-center gap-2"
          href={transcation.paymentCode as string}
          target="_blank"
        >
          <LinkIcon size={24} className="text-white" />
          <span className="text-white text-md">
            {" "}
            Connect {transcation?.paymentName}
          </span>
        </Link>
      ) : null}
    </div>
  );
};

export default PaymentActionComponent;

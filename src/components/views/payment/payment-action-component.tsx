import { Transaction } from "@/types/model";
import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const PaymentActionComponent = ({
  transcation,
}: {
  transcation: Transaction;
}) => {
  return (
    <>
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
      transcation?.paymentMethod === "EWALLET" &&
      transcation?.paymentName !== "QRIS" ? (
        <Link
          className="btn h-10 w-full md:w-fit px-8 flex-center gap-2"
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
      {transcation?.status === "PENDING" &&
      transcation?.paymentMethod === "CREDIT_CARD" ? (
        <Link
          className="btn h-10  flex-center w-full md:w-fit px-10 rounded-full gap-2"
          href={transcation.paymentCode as string}
        >
          Pay Now
        </Link>
      ) : null}
      {transcation?.status === "PENDING" &&
      transcation?.paymentMethod === "OVER_THE_COUNTER" ? (
        <div className="w-full flex items-center h-12 bg-indigo-400/20 p-4 rounded-md">
          <p className="text-sm w-[150px]">No Payment </p>
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
      transcation?.paymentName === "QRIS" ? (
        <div className=" flex items-center  w-full">
          <Image
            src={transcation.paymentCode as string}
            alt="qris"
            width={150}
            height={150}
            priority
          />
        </div>
      ) : null}
    </>
  );
};

export default PaymentActionComponent;

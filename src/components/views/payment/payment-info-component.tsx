import { AlertCircle, Lock } from "lucide-react";
import React from "react";

const PaymentInfo = () => {
  return (
    <div className="w-full lg:w-[500px]">
      <div className="w-full rounded-md border p-6 bg-white flex items-center gap-2">
        <div className="flex-center gap-2">
          <p className="font-semibold italic text-sm">
            guaranteed{" "}
            <span className="text-indigo-700 block text-center">Safe</span>
          </p>
          <AlertCircle className="fill-indigo-700 text-white" />
        </div>
        <p className="text-sm">
          This transaction is guaranteed to be safe and reliable
        </p>
      </div>
      <div className="w-full mt-6 rounded-md border p-6 bg-white  gap-2">
        <h5 className="text-sm font-semibold">Notes</h5>
        <ol className="list-decimal list-inside mt-4 text-sm text-slate-800">
          <li>
            Copy the transaction number if you&apos;re making a transaction
          </li>
          <li>
            There&apos;s no need to refresh the page; the transaction status
            will update automatically.
          </li>
          <li>Complete your payment before the deadline.</li>
          <li>
            Pay the exact amount requested, including the unique code if
            applicable.
          </li>
        </ol>
      </div>
      <div className="w-full rounded-md border mt-6 p-6 bg-white flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Lock className=" text-yellow-500" />
        </div>
        <div>
          <h5 className="text-sm font-semibold">Keep Your Data Safe</h5>
          <p className="text-sm">
            Your payment data and proof are confidential. Do not share them with
            anyone
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;

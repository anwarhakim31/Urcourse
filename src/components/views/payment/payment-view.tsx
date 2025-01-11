"use client";

import { Transaction } from "@/types/model";
import React from "react";

const PaymentView = ({ transaction }: { transaction: Transaction }) => {
  console.log(transaction);

  return (
    <main className="py-24">
      <div className="flex flex-col  lg:flex-row container gap-6">
        <div className="block lg:hidden  bg-white rounded-tr-md rounded-tl-md border p-6 w-full lg:w-[400px] h-fit"></div>
      </div>
    </main>
  );
};

export default PaymentView;

import PaymentSuccessView from "@/components/views/payment/success/payment-success-view";
import { db } from "@/lib/db";
import { Transaction } from "@/types/model";
import { redirect } from "next/navigation";
import React from "react";

const PaymetSuccessPage = async ({
  params,
}: {
  params: { paymentId: string };
}) => {
  const transaction = await db.transaction.findUnique({
    where: {
      invoice: params.paymentId,
    },
    include: {
      purchase: {
        include: {
          course: true,
        },
      },
    },
  });
  console.log(transaction);

  if (!transaction || transaction.status !== "PAID") {
    return redirect("/");
  }

  return (
    <React.Fragment>
      <PaymentSuccessView transaction={transaction as Transaction} />
    </React.Fragment>
  );
};

export default PaymetSuccessPage;

import PaymentSuccessView from "@/components/views/payment/success/payment-success-view";
import { db } from "@/lib/db";
import { Transaction } from "@/types/model";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Payment",
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

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

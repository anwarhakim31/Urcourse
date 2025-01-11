import Header from "@/components/fragments/header";
import PaymentView from "@/components/views/payment/payment-view";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Transaction } from "@/types/model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Fragment } from "react";

const PaymentPage = async ({ params }: { params: { paymentId: string } }) => {
  const { paymentId } = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const payment = await db.transaction.findUnique({
    where: {
      id: paymentId,
      status: "PENDING",
    },
  });

  if (!payment) {
    return redirect("/");
  }

  return (
    <Fragment>
      <Header />
      <PaymentView transaction={payment as Transaction} />
    </Fragment>
  );
};

export default PaymentPage;

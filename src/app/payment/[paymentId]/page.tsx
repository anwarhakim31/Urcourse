import Header from "@/components/fragments/header";
import PaymentView from "@/components/views/payment/payment-view";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Transaction } from "@/types/model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Fragment, Suspense } from "react";

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
    include: {
      purchase: {
        include: {
          course: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });

  if (!payment) {
    return redirect("/");
  }

  return (
    <Fragment>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentView transaction={payment as Transaction} />
      </Suspense>
    </Fragment>
  );
};

export default PaymentPage;

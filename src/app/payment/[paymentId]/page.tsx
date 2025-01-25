import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import PaymentView from "@/components/views/payment/payment-view";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Metadata } from "next";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Fragment } from "react";

export const metadata: Metadata = {
  title: "Payment",
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

const PaymentPage = async ({ params }: { params: { paymentId: string } }) => {
  const { paymentId } = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const payment = await db.transaction.findUnique({
    where: {
      invoice: paymentId,
    },
  });

  if (!payment) {
    return redirect("/");
  }

  if (payment.status === "PAID") {
    return redirect(`/payment/${paymentId}/success`);
  }

  return (
    <Fragment>
      <Header />

      <PaymentView invoice={paymentId} />
      <Footer />
    </Fragment>
  );
};

export default PaymentPage;

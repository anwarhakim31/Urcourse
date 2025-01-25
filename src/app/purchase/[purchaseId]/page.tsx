import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import PurchaseView from "@/components/views/purchase/purchase-view";
import authOptions from "@/lib/authOptions";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import React, { Fragment } from "react";

export const metadata: Metadata = {
  title: "Purchase",
  description:
    "A platform that empowers your learning journey with engaging, accessible, and expertly crafted courses to help you achieve your goals.",
};

const PurchaseId = async ({ params }: { params: { purchaseId: string } }) => {
  const { purchaseId } = params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login?callbackUrl=/purchase/" + purchaseId);
  }

  const purchase = await db.purchase.findUnique({
    where: {
      id: purchaseId,
    },
    include: {
      course: {
        include: {
          category: true,
        },
      },
    },
  });
  if (
    !purchase ||
    purchase.userId !== session?.user?.id ||
    purchase.status !== "PENDING"
  ) {
    return redirect("/");
  }

  return (
    <Fragment>
      <Header />
      <PurchaseView purchaseId={purchaseId} />
      <Footer />
    </Fragment>
  );
};

export default PurchaseId;

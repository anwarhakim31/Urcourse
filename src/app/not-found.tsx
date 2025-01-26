import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import Image from "next/image";
import React from "react";

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="flex-center flex-col h-screen  ">
        <Image
          src={"/notfound.svg"}
          width={500}
          height={500}
          alt="notfound"
          priority
        />
        <h1 className="mt-8 text-center font-medium text-xl">Page Not Found</h1>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default NotFoundPage;

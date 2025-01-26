"use client";
import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className="flex-center flex-col h-screen">
        <h1 className="text-9xl ">500</h1>
        <p className="mt-8 text-center font-medium text-xl">
          Internal Server Error
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;

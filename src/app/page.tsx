import Header from "@/components/fragments/header";
import CarouselView from "@/components/views/home/carousel-view";
import React from "react";

import "swiper/css";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-[url('/background-top.svg')]  bg-top bg-no-repeat min-h-screen">
        <CarouselView />
      </main>
    </>
  );
}

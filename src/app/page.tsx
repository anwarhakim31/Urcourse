import Header from "@/components/fragments/header";
import CarouselView from "@/components/views/home/carousel-view";
import DiffrentView from "@/components/views/home/diffrent-view";
import TrustedHomeView from "@/components/views/home/trusted-view";
import React from "react";

import "swiper/css";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-back py-28">
        <CarouselView />
        <TrustedHomeView />
        <DiffrentView />
      </main>
    </>
  );
}

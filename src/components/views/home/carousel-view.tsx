"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const CarouselView = () => {
  const slides = [1, 2, 3];
  const duplicatedSlides = [...slides, ...slides];
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  if (loading) {
    return (
      <div className=" w-full mt-[3.5rem] bg-indigo-400/20 flex-center py-4">
        <div className="w-full aspect-[16/8] bg-slate-50 max-h-[268px]  md:w-[50vw] lg:h-[300px]  rounded-lg"></div>
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay]}
      centeredSlides={true}
      spaceBetween={200}
      slidesPerView="auto"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      speed={1000}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        990: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3,
        },
      }}
      className="mt-[3.5rem] bg-indigo-400/20  "
      onInit={(swiper) => swiper.autoplay.start()}
    >
      {duplicatedSlides.map((slide, index) => (
        <SwiperSlide key={index}>
          {({ isActive }) => (
            <div
              className={`transition-all duration-300 flex items-center justify-center rounded-lg  ${
                isActive
                  ? "scale-100 z-10 opacity-100"
                  : "scale-50 opacity-50 z-0 "
              }  aspect-[16/9] max-h-[300px] w-full lg:h-[300px] lg:w-[75vw] lg:-translate-x-[calc(50%-12vw)]   overflow-hidden `}
            >
              <Image
                src={`/carousel/c${slide}.png`}
                alt={`Carousel ${slide}`}
                width={650}
                height={500}
                priority
                className="w-auto h-auto rounded-lg"
              />
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CarouselView;

"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const CarouselView = () => {
  const slides = [1, 2, 3];
  const duplicatedSlides = [...slides, ...slides];
  const [loading, setLoading] = React.useState(true);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  if (loading) {
    return (
      <div className=" w-full  pt-1.5 pb-8 flex-center ">
        <div className="w-full px-2 py-2  aspect-[16/8]  max-h-[260px]  flex-center md:w-[50vw] lg:h-[260px]  ">
          <Image
            src={`/carousel/c1.png`}
            alt={`Carousel 1`}
            width={650}
            height={500}
            priority
            className="w-auto h-full scale-90"
          />
        </div>
      </div>
    );
  }

  return (
    <section className="">
      <Swiper
        modules={[Autoplay, Pagination]}
        centeredSlides={true}
        spaceBetween={200}
        slidesPerView="auto"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        onSlideChange={(swiper) =>
          setActiveIndex(
            swiper.realIndex === 3
              ? 0
              : swiper.realIndex === 4
              ? 1
              : swiper.realIndex === 5
              ? 2
              : swiper.realIndex
          )
        }
        pagination={{
          clickable: true, // Membuat pagination dapat diklik
          dynamicBullets: true, // Opsional: membuat bullet pagination dinamis
        }}
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
        onInit={(swiper) => swiper.autoplay.start()}
      >
        {duplicatedSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`transition-all cursor-grab duration-300 flex items-center justify-center   ${
                  isActive
                    ? "scale-100 z-10 opacity-100"
                    : "scale-75 opacity-50 z-0 "
                }  aspect-[16/9] max-h-[275px] w-full lg:h-[275px] lg:w-[100vw] lg:-translate-x-[calc(50%-12vw)] p-2   overflow-hidden `}
              >
                <Image
                  src={`/carousel/c${slide}.png`}
                  alt={`Carousel ${slide}`}
                  width={650}
                  height={500}
                  priority
                  className="w-auto h-full "
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex mt-4 items-center justify-center gap-2 ">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`transition-all ease-in duration-300 h-2 rounded-full ${
              activeIndex === index ? "bg-indigo-700 w-10" : "bg-slate-400 w-8"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default CarouselView;

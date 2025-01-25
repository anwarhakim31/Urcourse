import Image from "next/image";
import React from "react";

const TrustedHomeView = () => {
  return (
    <section className="pt-24  container ">
      <h1 className="text-center  text-3xl text-slate-700 mb-16">Trusted By</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <figure className="flex-center w-full h-[65px] lg:h-[70px] bg-white border p-2 rounded-sm">
          <Image
            src="/trusted/google.png"
            alt="trusted"
            width={150}
            height={100}
            priority
            className="w-auto h-full"
          />
        </figure>
        <figure className="flex-center w-full h-[65px] lg:h-[70px] bg-white  border p-2 rounded-sm">
          <Image
            src="/trusted/microsoft.png"
            alt="trusted"
            width={150}
            height={100}
            className="w-auto h-full"
          />
        </figure>
        <figure className="flex-center w-full h-[65px] lg:h-[70px] bg-white  border p-2 rounded-sm">
          <Image
            src="/trusted/aws.png"
            alt="trusted"
            width={150}
            height={100}
            className="w-auto h-full"
          />
        </figure>
        <figure className="flex-center w-full h-[65px] lg:h-[70px] bg-white  border p-2 rounded-sm">
          <Image
            src="/trusted/lenovo.png"
            alt="trusted"
            width={150}
            height={100}
            className="w-auto h-full"
          />
        </figure>
      </div>
    </section>
  );
};

export default TrustedHomeView;

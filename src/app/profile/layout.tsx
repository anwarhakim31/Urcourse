"use client";
import Header from "@/components/fragments/header";
import ProfileNavigation from "@/components/views/profile/profile-navigation";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Header />
      <main className="bg-back min-h-screen">
        <div className="container w-full flex flex-col lg:flex-row   pt-20 pb-16 gap-8 ">
          <ProfileNavigation />
          <section className="relative overflow-hidden w-full min-h-[calc(100vh-150px)] bg-white rounded-lg border ">
            {children}
          </section>
        </div>
      </main>
    </React.Fragment>
  );
};

export default ProfileLayout;

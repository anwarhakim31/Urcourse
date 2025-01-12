"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import useCreatePurchase from "@/hooks/purchase/useCreatePurchase";
import { cn } from "@/lib/utils";
import { Course } from "@/types/model";

import { Wallet } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const CourseDetailAction = ({ course }: { course: Course }) => {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { mutate, isPending } = useCreatePurchase();

  const handleClick = () => {
    if (!session.data?.user) {
      return router.push(
        "/login?callbackUrl=" +
          encodeURIComponent(process.env.NEXT_PUBLIC_DOMAIN + pathname)
      );
    }

    mutate(
      { courseId: course.id as string },
      {
        onSuccess: (res) => {
          router.push("/purchase/" + res.data.id);
        },
      }
    );
  };

  return (
    <div className=" border w-full xl:w-[350px] h-fit rounded-md p-6 xl:my-6  text-secondary bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-indigo-600 via-indigo-800 to-indigo-900">
      <h1 className="font-semibold text-xl mb-4">Ready to start learning?</h1>
      <p className="text-sm ">
        Track your progress, Watch the video lessons, Exercise your knowledge,
        and more.{" "}
      </p>
      <LoadingButton
        disabled={isPending}
        variant={"outline"}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-2 text-sm mt-8 w-full text-indigo-700 hover:text-indigo-700  ",
          isPending && "cursor-not-allowed bg-white"
        )}
      >
        <Wallet size={18} />
        <span>{isPending ? "Purchasing..." : "Purchase Now"}</span>
      </LoadingButton>
    </div>
  );
};

export default CourseDetailAction;

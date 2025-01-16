"use client";
import RatingStar from "@/components/fragments/rating-star";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { Textarea } from "@/components/ui/textarea";
import useCreateRating from "@/hooks/course/rating/useCreateRating";

import { cn } from "@/lib/utils";
import { Course, Reviews } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, X } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  rating: z.number().min(1, "Rating is required").max(5, "Rating is required"),
  comment: z.string().min(1, "Review is required"),
});

const CourseReview = ({
  isPaid,
  course,
  isReviewed,
  reviews,
}: {
  isReviewed: boolean;
  isPaid: boolean;
  course: Course;
  reviews: Reviews[];
}) => {
  const reviewRef = useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: course?.id as string,
      rating: 0,
      comment: "",
    },
  });

  const [isReview, setIsReview] = React.useState(false);

  const { mutate, isPending } = useCreateRating(setIsReview);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  React.useEffect(() => {
    if (isReview) {
      reviewRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isReview]);

  return (
    <div className="mt-6 p-4 rounded-md border bg-white" ref={reviewRef}>
      <h1 className="font-semibold text-xl capitalize">Reviews & Ratings </h1>
      <div className="flex mt-2 flex-wrap gap-2 items-center justify-between">
        <div className="flex  gap-2 items-center">
          <h3 className="font-semibold text-indigo-700 text-5xl">
            {(course?.averageRating as number) || 0}
          </h3>
          <div className="mt-1">
            <RatingStar
              averageRating={(course?.averageRating as number) || 0}
            />
            <p className="text-xs font-medium mt-1 text-slate-600">
              {course?.ratingCount} reviews
            </p>
          </div>
        </div>
        {!isReview && isPaid && !isReviewed && (
          <Button
            disabled={isPending}
            onClick={() => {
              setIsReview(true);
              form.reset();
            }}
          >
            Give a Review
          </Button>
        )}
      </div>
      {isReview && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative my-8  border-b-4 border-indigo-700 p-4 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-md"
          >
            <button
              type="button"
              disabled={isPending}
              onClick={() => setIsReview(false)}
              className="absolute top-2 right-2 w-6 h-6 hover:bg-red-500 flex-center rounded-full bg-red-400 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]"
            >
              <X size={14} color="white" />
            </button>

            <h3 className="text-center font-medium text-base">
              Rate this course{" "}
            </h3>
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex-center flex-col">
                  <FormControl>
                    <div className="flex gap-2 my-4">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          strokeWidth={1.5}
                          key={index}
                          size={26}
                          onClick={() => field.onChange(index + 1)}
                          className={
                            index < field.value
                              ? "fill-yellow-300 text-yellow-300 cursor-pointer"
                              : "text-yellow-300 cursor-pointer"
                          }
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn("font-medium text-xs ")}>
                    Review
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              disabled={isPending}
              loading={isPending}
              className="w-full mt-4 "
            >
              Submit
            </LoadingButton>
          </form>
        </Form>
      )}
      <div className="mt-8 ">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="mb-4 border-b border-indigo-400/20 rounded-lg p-4 flex gap-2"
            >
              <figure className="rounded-full h-12 w-12 overflow-hidden bg-slate-200">
                <Image
                  src={review.user.photo}
                  alt={review.user.fullname}
                  width={50}
                  height={50}
                  priority
                  className="w-full h-full object-cover"
                />
              </figure>
              <div>
                <p className="font-medium mb-1">{review.user.fullname}</p>
                <RatingStar averageRating={review.rating || 0} />
                <p className="mt-2 text-sm text-slate-600 first-letter:capitalize">
                  {review.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center min-h-8 text-sm  text-slate-500">
            Not yet reviewed
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseReview;

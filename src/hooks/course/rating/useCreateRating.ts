import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const useCreateRating = (
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>
) => {
  return useMutation({
    mutationFn: async (data: {
      courseId: string;
      rating: number;
      comment: string;
    }) => {
      const res = await instance.post("/courses/rating", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Rating created successfully");
      setIsReview(false);
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useCreateRating;

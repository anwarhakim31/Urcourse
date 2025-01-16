import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const useProgressCourse = (
  courseId: string,
  setActive: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: { listId: string; type: string }) => {
      const res = await instance.post(
        `/courses/${courseId}/curriculum/progress`,
        data
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("this chapter is completed");
      router.refresh();
      setActive(true);
      // const path = res?.data?.nextList
      //   ? `/course/${courseId}/${res.data.nextList}`
      //   : `/course/${courseId}`;

      // router.push(path);
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useProgressCourse;

import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Category } from "@/types/model";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const usePutCategory = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  return useMutation({
    mutationFn: async (data: Category) => {
      const res = await instance.put("/category?id" + id, data);
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      setOpen(false);
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default usePutCategory;

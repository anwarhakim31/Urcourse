import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Category } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const useCreateCategory = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: async (data: Category) => {
      const res = await instance.post("/category", data);
      return res.data;
    },
    onSuccess: (res) => {
      query.invalidateQueries({ queryKey: ["category"] });
      toast.success(res.message);
      setOpen(false);
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default useCreateCategory;

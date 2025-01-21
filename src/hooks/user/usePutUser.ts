import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { User } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const usePutUser = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  id: string
) => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: async (data: User) => {
      const res = await instance.put("/user?id=" + id, data);
      return res.data;
    },
    onSuccess: (res) => {
      query.invalidateQueries({ queryKey: ["user"] });
      toast.success(res.message);
      setOpen(false);
    },
    onError: (error: Error) => {
      ResponseErrorAxios(error);
    },
  });
};

export default usePutUser;

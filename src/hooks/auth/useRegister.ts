import { instance } from "@/lib/interceptor";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

const useRegister = (
  form: UseFormReturn<{ email: string; fullname: string; password: string }>
) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const mutate = useMutation({
    mutationFn: async (data: {
      fullname: string;
      email: string;
      password: string;
    }) => {
      const res = await instance.post("/auth/register", data);

      return res.data;
    },
  });

  const handleRegister = async (data: {
    fullname: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    mutate.mutate(data, {
      onSuccess: async () => {
        try {
          const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
            callbackUrl: "/",
          });

          if (response?.ok) {
            router.push("/");
          } else {
            setLoading(false);
          }
        } catch (error) {
          return toast.error(error as string);
        }
      },
      onError: (error: Error) => {
        setLoading(false);
        if (
          error instanceof AxiosError &&
          error.response?.data &&
          error.response?.data.code === 400
        ) {
          form.setError("email", { message: error.response.data.message });
        } else {
          return ResponseErrorAxios(error);
        }
      },
    });
  };

  return { handleRegister, loading };
};

export default useRegister;

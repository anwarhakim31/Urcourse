import ProfileFormControl from "@/components/fragments/profile-form-control";

import { Form, FormField } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LoadingButton } from "../ui/loading-button";
import { ResponseErrorAxios } from "@/lib/response-error";
import useChangePassword from "@/hooks/auth/useChangePassword";

const FormSchema = z
  .object({
    oldPassword: z.string().min(1, {
      message: "Kata sandi lama harus diisi",
    }),
    newPassword: z.string().min(5, {
      message: "Kata sandi baru minimal 5 karakter",
    }),
    confPassword: z.string().min(1, {
      message: "Konfirmasi kata sandi harus diisi",
    }),
  })
  .refine((data) => data.newPassword === data.confPassword, {
    path: ["confPassword"],
    message: "Konfirmasi kata sandi harus sama dengan kata sandi baru",
  });

const ProfileChangePassView = ({
  setIsPassword,
}: {
  setIsPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathaname = usePathname();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confPassword: "",
    },
  });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success("Password updated successfully");
        setIsPassword(false);
      },
      onError: (err: Error) => {
        return ResponseErrorAxios(err);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <ProfileFormControl
              type="password"
              field={field}
              label="Old Password"
              placeholder="*******"
            />
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <ProfileFormControl
              type="password"
              field={field}
              label="New Password"
              placeholder="*******"
            />
          )}
        />
        <FormField
          control={form.control}
          name="confPassword"
          render={({ field }) => (
            <ProfileFormControl
              type="password"
              field={field}
              label="Confirm Password"
              placeholder="*******"
            />
          )}
        />
        <LoadingButton
          loading={isPending}
          disabled={isPending}
          className={`${
            pathaname.startsWith("/admin/") ? "" : "md:w-[200px]   "
          } ml-auto text-sm h-10 mt-6 w-full `}
        >
          Simpan
        </LoadingButton>
      </form>
    </Form>
  );
};

export default ProfileChangePassView;

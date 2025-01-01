import AuthFormControl from "@/components/fragments/auth-form-control";
import { Badge } from "@/components/ui/badge";
import { Form, FormField } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import useResetPassword from "@/hooks/auth/useResetpassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" })
      .min(6, { message: "Confirm password must be at least 6 characters" }),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPasswordView = ({
  setSuccess,
}: {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: searchParams.get("token") || "",
    },
  });

  const { handleReset, error, loading } = useResetPassword(setSuccess);

  const onSubmit = (data: { password: string; token: string }) => {
    handleReset(data);
  };

  return (
    <Form {...form}>
      {error && (
        <Badge
          variant={"default"}
          className="w-full bg-red-100 text-red-600 flex-center py-1.5 text-sm mb-2 hover:bg-red-100"
        >
          {error}
        </Badge>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <AuthFormControl
                field={field}
                label="Password"
                type="password"
                placeholder="*********"
              />
            )}
          />
        </div>
        <div className="mt-4">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <AuthFormControl
                field={field}
                label="Confirm Password"
                type="password"
                placeholder="*********"
              />
            )}
          />
        </div>

        <LoadingButton
          loading={loading}
          disabled={loading}
          type="submit"
          className="w-full mt-8"
        >
          Submit
        </LoadingButton>
        <span className="text-xs text-center block mt-2">
          Remember your password?{" "}
          <Link href="/login" className="hover:underline  text-purple-700">
            Login
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default ResetPasswordView;

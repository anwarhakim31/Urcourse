"use client";
import AuthFormControl from "@/components/fragments/auth-form-control";
import { Form, FormField } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import useRegister from "@/hooks/auth/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "Email is required",
    })
    .email({ message: "Invalid email address" }),
  fullname: z
    .string()
    .nonempty({ message: "Fullname is required" })
    .min(6, { message: "Fullname must be at least 6 characters" }),
  password: z.string().nonempty({ message: "Password is required" }).min(6, {
    message: "Password must be at least 6 characters",
  }),
});

const RegisterView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullname: "",
      password: "",
    },
  });

  const { loading, handleRegister } = useRegister(form);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handleRegister(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <AuthFormControl
                field={field}
                label="Email"
                placeholder="exemple@domain.com"
              />
            )}
          />
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <AuthFormControl
                field={field}
                label="fullname"
                placeholder="John Doe"
                type="text"
              />
            )}
          />
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <AuthFormControl
                field={field}
                label="Password"
                placeholder="*******"
                type="password"
              />
            )}
          />
        </div>

        <LoadingButton
          disabled={loading}
          aria-label="Register"
          loading={loading}
          type="submit"
          className="w-full mt-8"
        >
          Register
        </LoadingButton>
        <span className="text-xs text-center block mt-2">
          have an account?{" "}
          <Link href="/login" className="hover:underline  text-indigo-700">
            Login
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default RegisterView;

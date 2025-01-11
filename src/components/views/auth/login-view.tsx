import { Badge } from "@/components/ui/badge";
import { Form, FormField } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useLogin from "@/hooks/auth/useLogin";
import DataFormControl from "@/components/fragments/data-form-control";

const formSchema = z.object({
  email: z.string().nonempty({
    message: "Email is required",
  }),
  password: z.string().nonempty({ message: "Password is required" }),
});

const LoginView = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleLogin, error, loading } = useLogin();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handleLogin(data);
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
            name="email"
            render={({ field }) => (
              <DataFormControl
                field={field}
                label="Email"
                placeholder="exemple@domain.com"
              />
            )}
          />
        </div>
        <div className="mt-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <DataFormControl
                field={field}
                label="Password"
                placeholder="*******"
                type="password"
              />
            )}
          />
        </div>
        <Link
          href="/forget-password"
          className="text-xs mt-3  hover:underline block ml-auto w-max text-indigo-700"
        >
          Forget Password?
        </Link>
        <LoadingButton
          loading={loading}
          disabled={loading}
          type="submit"
          className="w-full mt-6"
        >
          Login
        </LoadingButton>
        <span className="text-xs text-center block mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="hover:underline  text-indigo-700">
            Register
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default LoginView;

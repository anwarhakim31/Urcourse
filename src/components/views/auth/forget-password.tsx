import DataFormControl from "@/components/fragments/data-form-control";
import { Badge } from "@/components/ui/badge";
import { Form, FormField } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import useForgetPassword from "@/hooks/auth/useForgetPassword";
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
});

const ForgetPagsswordView = ({
  setSuccess,
}: {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleForget, error, loading } = useForgetPassword(setSuccess);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    handleForget(data);
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

        <LoadingButton
          loading={loading}
          disabled={loading}
          type="submit"
          className="w-full mt-8"
        >
          Send
        </LoadingButton>
        <span className="text-xs text-center block mt-2">
          Remember your password?{" "}
          <Link href="/login" className="hover:underline  text-indigo-700">
            Login
          </Link>
        </span>
      </form>
    </Form>
  );
};

export default ForgetPagsswordView;

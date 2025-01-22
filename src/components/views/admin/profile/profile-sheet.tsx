import ProfileFormControl from "@/components/fragments/profile-form-control";

import { Form, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useSession } from "next-auth/react";
import { LoadingButton } from "@/components/ui/loading-button";
import PhotoProfile from "@/components/fragments/photo-profile";
import useChangeProfile from "@/hooks/auth/useChangeProfile";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ResponseErrorAxios } from "@/lib/response-error";
import ProfileChangePassView from "@/components/fragments/profile-change-password";

const FormSchema = z.object({
  email: z.string().min(1, { message: "Nama pengguna harus diisi" }).email({
    message: "Invalid email address",
  }),
  fullname: z.string().min(1, { message: "Nama lengkap harus diisi" }),
  photo: z.string().optional(),
});

export function ProfileSheet() {
  const session = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: session?.data?.user?.email || "",
      fullname: session?.data?.user?.fullname || "",
      photo: session?.data?.user?.photo || "",
    },
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfile, setIsProfile] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);

  const { mutate, isPending } = useChangeProfile();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    mutate(data, {
      onSuccess: (res) => {
        setIsOpen(false);
        session.update({ ...session.data, user: res.user });
        toast.success("Profile updated successfully");
      },
      onError: (error) => {
        if (error instanceof AxiosError && error.response?.status === 400) {
          return form.setError("email", {
            message: error.response.data.message,
          });
        } else {
          return ResponseErrorAxios(error);
        }
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="text-sm w-full p-2 block hover:bg-indigo-400/20 transition-all duration-200 ease-in-out text-left">
          Profile
        </button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>
            Manage your information and privicy.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] px-4 pb-8">
          <div className="mt-8 flex w-full justify-end items-center gap-2">
            <Label
              htmlFor="edit"
              className="text text-xs font-medium text-gray-500"
            >
              Change Profil
            </Label>
            <Switch
              onCheckedChange={() => setIsProfile(!isProfile)}
              checked={isProfile}
              id="edit"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4 px-1"
            >
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <PhotoProfile
                    field={field}
                    fullname={form.watch("fullname")}
                    isEdit={isProfile}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <ProfileFormControl
                    field={field}
                    label="Email"
                    type="text"
                    placeholder="example@domain.com"
                    isEdit={isProfile}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <ProfileFormControl
                    field={field}
                    label="Fullname"
                    type="text"
                    placeholder="John Doe"
                    isEdit={isProfile}
                  />
                )}
              />
              {isProfile && (
                <LoadingButton
                  type="submit"
                  className="w-full h-10 mt-6"
                  loading={isPending}
                  disabled={isPending}
                >
                  Save
                </LoadingButton>
              )}
            </form>
          </Form>

          <div className="mt-8 flex w-full justify-end items-center gap-2">
            <Label
              htmlFor="edit"
              className="text text-xs font-medium text-gray-500"
            >
              Change Password
            </Label>
            <Switch
              onCheckedChange={() => setIsPassword(!isPassword)}
              checked={isPassword}
              id="edit"
            />
          </div>
          {isPassword && (
            <ProfileChangePassView setIsPassword={setIsPassword} />
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

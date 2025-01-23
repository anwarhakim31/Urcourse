"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import { LoadingButton } from "@/components/ui/loading-button";
import PhotoProfile from "@/components/fragments/photo-profile";
import useChangeProfile from "@/hooks/auth/useChangeProfile";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ResponseErrorAxios } from "@/lib/response-error";
import ProfileChangePassView from "@/components/fragments/profile-change-password";
import { Form, FormField } from "@/components/ui/form";
import ProfileFormControl from "@/components/fragments/profile-form-control";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const FormSchema = z.object({
  email: z.string().min(1, { message: "Nama pengguna harus diisi" }).email({
    message: "Invalid email address",
  }),
  fullname: z.string().min(1, { message: "Nama lengkap harus diisi" }),
  photo: z.string().optional(),
});

const ProfileUserView = () => {
  const session = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: session?.data?.user?.email || "",
      fullname: session?.data?.user?.fullname || "",
      photo: session?.data?.user?.photo || "",
    },
  });

  const [isProfile, setIsProfile] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);

  const { mutate, isPending } = useChangeProfile();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    mutate(data, {
      onSuccess: (res) => {
        setIsProfile(false);
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
    <React.Fragment>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="relative  top-0 right-0 bg-[url('/cover.png')] h-32 bg-cover bg-right bg-no-repeat w-full ">
            <h1 className="p-6 text-white font-semibold text-lg">My Profile</h1>
            <div className="absolute top-[60px] left-6">
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <PhotoProfile
                    field={field}
                    fullname={session?.data?.user?.fullname || ""}
                    isEdit={isProfile}
                    row={true}
                  />
                )}
              />
            </div>
          </div>
          <div className="relative p-6 mt-2">
            <div className="mt-8 mb-4 flex w-full justify-end items-center gap-2">
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
                  classname="mt-8"
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
                className="w-full md:w-[150px] h-10 ml-auto mt-6"
                loading={isPending}
                disabled={isPending}
              >
                Save
              </LoadingButton>
            )}
          </div>
        </form>
      </Form>
      <div className="px-6">
        <div className="mt-8 mb-6 flex w-full justify-end items-center gap-2">
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
        {isPassword && <ProfileChangePassView setIsPassword={setIsPassword} />}
      </div>
    </React.Fragment>
  );
};

export default ProfileUserView;

import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import DataFormControl from "@/components/fragments/data-form-control";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import { User } from "@/types/model";

import usePutUser from "@/hooks/user/usePutUser";

export function ModalEditUser({
  id,
  data,
  open,
  setOpen,
}: {
  id?: string;
  data?: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{id ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription className="text-sm"></DialogDescription>
          </DialogHeader>
          <ProfileForm setOpen={setOpen} id={id} data={data} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{id ? "Edit Category" : "Add Category"}</DrawerTitle>
          <DrawerDescription className="text-sm"></DrawerDescription>
        </DrawerHeader>
        <ProfileForm setOpen={setOpen} id={id} data={data} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const formSchema = z.object({
  fullname: z.string().nonempty({ message: "fullname is required" }),
  password: z.string().optional(),
});

function ProfileForm({
  setOpen,
  data,
  id,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: User;
  id?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: data?.fullname || "",
      password: "",
    },
  });

  const { mutate: mutatePut, isPending: isPendingPut } = usePutUser(
    setOpen,
    id as string
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutatePut(data);
  };

  return (
    <Form {...form}>
      <form className="mx-4 md:mx-0" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <DataFormControl
              field={field}
              label="Fullname"
              placeholder="Ex: John Doe"
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <DataFormControl
              field={field}
              label="Password"
              placeholder="Ex: John Doe"
            />
          )}
        />
        <LoadingButton
          type="submit"
          disabled={isPendingPut}
          loading={isPendingPut}
          className="mt-6 w-full md:w-[150px]"
        >
          Save
        </LoadingButton>
      </form>
    </Form>
  );
}

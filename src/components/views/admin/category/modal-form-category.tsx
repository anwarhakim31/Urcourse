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
import { Category } from "@/types/model";

import usePutCategory from "@/hooks/category/usePutCategory";
import useCreateCategory from "@/hooks/category/useCreateCategory";

export function ModalFormCategory({
  id,
  data,
  open,
  setOpen,
}: {
  id?: string;
  data?: Category;
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
  name: z.string().nonempty({ message: "Name is required" }),
});

function ProfileForm({
  setOpen,
  data,
  id,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: Category;
  id?: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
    },
  });

  const { mutate: mutatePut, isPending: isPendingPut } = usePutCategory(
    setOpen,
    id as string
  );
  const { mutate: mutatePost, isPending: isPendingPost } =
    useCreateCategory(setOpen);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!id) return mutatePost(data);
    else return mutatePut(data);
  };

  return (
    <Form {...form}>
      <form className="mx-4 md:mx-0" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <DataFormControl
              field={field}
              label="Name"
              placeholder="Ex: Mathematics"
            />
          )}
        />
        <LoadingButton
          type="submit"
          disabled={isPendingPut || isPendingPost}
          loading={isPendingPut || isPendingPost}
          className="mt-6 w-full md:w-[150px]"
        >
          Save
        </LoadingButton>
      </form>
    </Form>
  );
}

import * as React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import DataFormControl from "@/components/fragments/data-form-control";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateCourse from "@/hooks/course/useCreateCourse";
import { LoadingButton } from "@/components/ui/loading-button";
import { toast } from "sonner";
import { ResponseErrorAxios } from "@/lib/response-error";
import { useRouter } from "next/navigation";

export function ModalAddCourse() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Course</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Give basic details about the course</DialogTitle>
            <DialogDescription className="text-sm">
              What would you like to title the course?
            </DialogDescription>
          </DialogHeader>
          <ProfileForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Add Course</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Give basic details about the course</DrawerTitle>
          <DrawerDescription className="text-sm">
            What would you like to title the course?
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm setOpen={setOpen} />
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
  title: z.string().nonempty({ message: "Title is required" }),
});

function ProfileForm({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const router = useRouter();
  const { mutate, isPending } = useCreateCourse();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success(res.message);
        router.push("/admin/course/" + res.data.id);
        setOpen(false);
      },
      onError: (error: Error) => {
        ResponseErrorAxios(error);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-4 md:mx-0">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <DataFormControl
              field={field}
              label="Title"
              placeholder="Ex: Web development"
            />
          )}
        />
        <LoadingButton
          type="submit"
          disabled={isPending}
          loading={isPending}
          className="mt-6 w-full md:w-fit"
        >
          Save changes
        </LoadingButton>
      </form>
    </Form>
  );
}

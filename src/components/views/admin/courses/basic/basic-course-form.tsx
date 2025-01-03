"use client";

import AreaFormControl from "@/components/fragments/area-form-control";

import DataFormControl from "@/components/fragments/data-form-control";
import ImageFormControl from "@/components/fragments/image-form-control";
import PriceFormControl from "@/components/fragments/price-form-control";
import SelectFormControl from "@/components/fragments/select-form-control";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import usePatchCourse from "@/hooks/course/usePatchCourse";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Course } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface PropsType {
  course: Course;
}

const formSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  categoryId: z.string().nonempty({ message: "Category is required" }),
  level: z
    .preprocess(
      (val) => (val === "" ? null : val),
      z.enum(["Beginner", "Intermediate", "Advanced"]).nullable()
    )
    .optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.coerce.number().optional(),
});

const BasicCourseForm = ({ course }: PropsType) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      categoryId: course.categoryId || "",
      level: (course.level as "Beginner" | "Intermediate" | "Advanced") || null,
      description: course.description || "",
      image: course.image || "",
      price: course.price || undefined,
    },
    shouldFocusError: true,
  });
  const router = useRouter();
  const { mutate, isPending } = usePatchCourse(course?.id || "");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Course updated successfully");
        router.refresh();
      },
      onError: (error: Error) => {
        ResponseErrorAxios(error);
      },
    });
  };

  useEffect(() => {
    if (form.formState.isSubmitted && form.formState.errors) {
      const errorField = Object.keys(form.formState.errors)[0];

      if (errorField) {
        form.setFocus(errorField as keyof z.infer<typeof formSchema>);
      }
    }
  }, [form.formState.errors, form?.formState.isSubmitted, form]);

  return (
    <Form {...form}>
      <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
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

        <div className="mt-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <AreaFormControl
                field={field}
                label="Description"
                className={` w-full break-all `}
              />
            )}
          />
        </div>
        <div className="flex items-center flex-col md:flex-row gap-4 mt-4 w-full">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <SelectFormControl
                field={field}
                label="Category"
                data={[{ id: "1", value: "Web development" }]}
                isLoading={false}
                placeholder="Select Category"
              />
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <SelectFormControl
                field={field}
                label="Level"
                data={[{ id: "1", value: "Web development" }]}
                isLoading={false}
                placeholder="Select Level"
              />
            )}
          />
        </div>
        <div className="mt-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <PriceFormControl field={field} label="Price" />
            )}
          />
        </div>
        <div className="mt-4 w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <ImageFormControl field={field} label="Banner" />
            )}
          />
        </div>
        <div className="flex flex-col-reverse items-center gap-4 md:flex-row mt-4">
          <Button
            variant={"outline"}
            type="button"
            className="w-full md:max-w-[150px]"
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isPending}
            disabled={isPending}
            type="submit"
            className="w-full md:max-w-[150px]"
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default BasicCourseForm;

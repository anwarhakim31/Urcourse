"use client";

import AccessFormControl from "@/components/fragments/access-form-control";
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
import { Category, Course } from "@/types/model";
import { levelArray } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface PropsType {
  course: Course;
  category: Category[];
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
  certificate: z.boolean().optional(),
  image: z.string().optional(),
  price: z.coerce.number().optional(),
});

const BasicCourseForm = ({ course, category }: PropsType) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      categoryId: course.categoryId || "",
      level: (course.level as "Beginner" | "Intermediate" | "Advanced") || null,
      description: course.description || "",
      image: course.image || "",
      price: course.price || undefined,
      certificate: course?.certificate || false,
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

  return (
    <div className="px-4 md:px-8 pb-8 pt-4">
      <Form {...form}>
        <p className="text-sm text-slate-500 ">
          Manage the basic information for your course
        </p>
        <form className="mt-4 " onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <DataFormControl
                required={true}
                field={field}
                label="Title"
                placeholder="Ex: Web development"
              />
            )}
          />
          <div className="flex items-center flex-col md:flex-row gap-4 mt-4 w-full">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <SelectFormControl
                  field={field}
                  label="Category"
                  data={category?.map((c) => ({
                    id: c.id as string,
                    value: c.name,
                  }))}
                  isLoading={false}
                  placeholder="Select Category"
                  required
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
                  data={levelArray}
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
          <div className="mt-4">
            <FormField
              control={form.control}
              name="certificate"
              render={({ field }) => (
                <AccessFormControl
                  field={field}
                  label="Certificate"
                  description="Give certificate to the student"
                />
              )}
            />
          </div>

          <div className="flex flex-col-reverse items-center gap-4 md:flex-row mt-4">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => router.push("/admin/course")}
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
    </div>
  );
};

export default BasicCourseForm;

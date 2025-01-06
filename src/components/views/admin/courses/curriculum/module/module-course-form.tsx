"use client";

import AccessFormControl from "@/components/fragments/access-form-control";
import AreaFormControl from "@/components/fragments/area-form-control";

import DataFormControl from "@/components/fragments/data-form-control";
import FileFormControl from "@/components/fragments/file-form-control";
import ResourceForm from "@/components/fragments/resource-form";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import useCreateModule from "@/hooks/course/module/useCreateModule";
import { ResponseErrorAxios } from "@/lib/response-error";
import { Module } from "@/types/model";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface PropsType {
  module?: Module;
  courseId: string;
}

const formSchema = z.object({
  title: z.string().nonempty({ message: "title is required" }),
  video: z.string().optional(),
  description: z.string().optional(),
  isFree: z.boolean().optional(),
  resource: z
    .array(
      z.object({
        name: z.string().nonempty({ message: "Resource name is required" }),
        file: z.string().nonempty({ message: "Resource file is required" }),
      })
    )
    .optional(),
});

const ModuleCourseForm = ({ module, courseId: id }: PropsType) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: module?.title || "",
      description: module?.description,
      video: module?.video,
      isFree: module?.isFree || false,
      resource: module?.resource || [],
    },
    shouldFocusError: true,
  });
  const router = useRouter();

  const field = useFieldArray({
    control: form.control,
    name: "resource",
  });

  const { mutate, isPending } = useCreateModule(id);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Module created successfully");

        router.push("/admin/course/" + id + "/curriculum");
        router.refresh();
      },
      onError: (error: Error) => {
        ResponseErrorAxios(error);
      },
    });
  };

  return (
    <Form {...form}>
      <div className="flex items-center justify-between mt-4 ">
        <div>
          <h1 className="text-2xl font-semibold text-slate-700">Module</h1>
          <p className="text-sm text-slate-500">
            Manage the module curriculum for this course
          </p>
        </div>
      </div>
      <form className="mt-4 " onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <DataFormControl
              field={field}
              label="Title"
              placeholder="Ex: Web development"
              required
            />
          )}
        />

        <div className="mt-4">
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FileFormControl field={field} label="Video" />
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
        <ResourceForm form={form} field={field} />

        <div className="mt-4">
          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <AccessFormControl
                field={field}
                label="Accessibility"
                description="Everyone can access this module for FREE"
              />
            )}
          />
        </div>

        <div className="flex flex-col-reverse items-center gap-4 md:flex-row mt-4">
          <Button
            variant={"outline"}
            type="button"
            disabled={isPending}
            className="w-full md:max-w-[150px]"
            onClick={() => router.back()}
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

export default ModuleCourseForm;

"use client";

import AreaFormControl from "@/components/fragments/area-form-control";

import DataFormControl from "@/components/fragments/data-form-control";

import ImageFormControl from "@/components/fragments/image-form-control";
import ResourceForm from "@/components/fragments/resource-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";

import { Exercise } from "@/types/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import ExerciseQuestionComp from "./exercise-question-comp";
import useCreateExercise from "@/hooks/course/excercise/useCreateExercise";
import usePatchExercise from "@/hooks/course/excercise/usePatchExercise";
import { Input } from "@/components/ui/input";

interface PropsType {
  exercise?: Exercise;
  courseId: string;
  exerciseId?: string;
}

const formSchema = z.object({
  title: z.string().nonempty({ message: "title is required" }),
  image: z.string().optional(),
  description: z.string().optional(),
  duration: z.string().optional(),
  resource: z
    .array(
      z.object({
        name: z.string().nonempty({ message: "Resource name is required" }),
        file: z.string().nonempty({ message: "Resource file is required" }),
      })
    )
    .optional(),
  questions: z
    .array(
      z.object({
        text: z.string().nonempty({ message: "Question is required" }),
        answers: z
          .array(
            z.object({
              text: z.string().nonempty({ message: "Answer is required" }),
              isCorrect: z.boolean(),
            })
          )

          .max(4, {
            message: "At most 4 answers are required",
          }),
      })
    )
    .optional(),
});
const ExerciseCourseForm = ({ exercise, courseId, exerciseId }: PropsType) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: exercise?.title || "",
      description: exercise?.description || "",
      duration: exercise?.duration || "",
      image: exercise?.image || "",
      resource: exercise?.resourse || [],
      questions: exercise?.questions || [],
    },
    shouldFocusError: true,
  });

  const router = useRouter();

  const field = useFieldArray({
    control: form.control,
    name: "resource",
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    useCreateExercise(courseId);
  const { mutate: mutatePatch, isPending: isPendingPatch } = usePatchExercise(
    courseId,
    exerciseId as string
  );

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!exerciseId) return mutateCreate(data);
    else return mutatePatch(data);
  };

  const fieldQuestion = useFieldArray({
    control: form.control,
    name: "questions",
  });

  console.log(form.watch("questions"));

  return (
    <Form {...form}>
      <div className="flex items-center justify-between mt-4 ">
        <div>
          <h1 className="text-2xl font-semibold text-slate-700">Exercise</h1>
          <p className="text-sm text-slate-500">
            Manage the exercise curriculum for this course
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
              placeholder="Ex: Chapter 1"
              required
            />
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel className="font-medium text-xs ">Duration</FormLabel>
              <div className="relative w-full">
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    type="number"
                    min={1}
                    step={1}
                    max={60}
                    placeholder="5"
                    className={"text-sm bg-white"}
                  />
                </FormControl>
              </div>

              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="mt-4 w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <ImageFormControl field={field} label="Image" />
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
        <ExerciseQuestionComp
          append={(value: {
            text: string;
            answers: { text: string; isCorrect: boolean }[];
          }) => {
            fieldQuestion.append(value);
          }}
          fields={fieldQuestion.fields}
          remove={fieldQuestion.remove}
          update={(
            index: number,
            value: {
              text: string;
              answers: { text: string; isCorrect: boolean }[];
            }
          ) => {
            fieldQuestion.update(index, value);
          }}
        />
        <ResourceForm form={form} field={field} />

        <div className="flex flex-col-reverse items-center gap-4 md:flex-row mt-4">
          <Button
            variant={"outline"}
            type="button"
            disabled={isPendingCreate || isPendingPatch}
            className="w-full md:max-w-[150px]"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <LoadingButton
            loading={isPendingCreate || isPendingPatch}
            disabled={isPendingCreate || isPendingPatch}
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

export default ExerciseCourseForm;

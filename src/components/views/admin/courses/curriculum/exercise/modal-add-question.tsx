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
import { zodResolver } from "@hookform/resolvers/zod";

import { LoadingButton } from "@/components/ui/loading-button";

import AreaFormControl from "@/components/fragments/area-form-control";
import { v4 as uuid } from "uuid";
import { CircleHelp, Plus } from "lucide-react";
import AnswerFormControl from "@/components/fragments/answer-form-control";

type QuestionFieldArray = {
  append: (value: {
    text: string;
    answers: { text: string; isCorrect: boolean }[];
  }) => void;
};

export function ModalAddQuestion({ append }: QuestionFieldArray) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          type="button"
          className="mt-2 bg-blue-700 hover:bg-blue-800 flex items-center gap-2"
          onClick={() => {
            setOpen(true);
          }}
        >
          <CircleHelp className="w-4 h-4" /> Add Question
        </Button>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-base font-medium">
              Create Question and Answers
            </DialogTitle>
            <DialogDescription className="text-sm"></DialogDescription>
          </DialogHeader>
          <ProfileForm setOpen={setOpen} append={append} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Button
        className="mt-2 bg-blue-700 hover:bg-blue-800 flex items-center gap-2"
        onClick={() => {
          setOpen(true);
        }}
        type="button"
      >
        <CircleHelp className="w-4 h-4" /> Add Question
      </Button>
      <DrawerContent>
        <DrawerHeader className="text-left ">
          <DrawerTitle className="text-base">
            Create Question and Answers
          </DrawerTitle>
          <DrawerDescription className="text-sm"></DrawerDescription>
        </DrawerHeader>
        <ProfileForm setOpen={setOpen} append={append} />
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
  text: z.string().nonempty({ message: "Question is required" }),
  id: z.string().optional(),
  answers: z
    .array(
      z.object({
        text: z.string().nonempty({ message: "Answer is required" }),
        isCorrect: z.boolean(),
      })
    )
    .min(1, { message: "At least 1 answers are required" })
    .max(4, {
      message: "At most 4 answers are required",
    }),
});

function ProfileForm({
  setOpen,
  append,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  append: (value: {
    text: string;
    answers: { text: string; isCorrect: boolean }[];
  }) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: uuid(),
      text: "",
      answers: [],
    },
    mode: "all",
  });

  const answer = form.watch("answers");

  React.useEffect(() => {
    if (answer.length > 0) {
      form.clearErrors("answers");
    }
  }, [form, answer]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!data.answers.some((answer) => answer.isCorrect)) {
      form.setError("answers", {
        message: "At least one answer must be correct",
      });
      return;
    }

    console.log(data.text);
    if (data.text === "<p><br></p>") {
      form.setError("text", { message: "Question is required" });
      return;
    }

    append(data);
    setOpen(false);
  };

  return (
    <Form {...form}>
      <form className="mx-4 md:mx-0 ">
        <div className=" max-h-[calc(100vh-210px)] overflow-auto scrollbar-none p-0.5">
          <div className=" w-full">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <AreaFormControl
                  field={field}
                  label="Question"
                  placeholder="Question"
                />
              )}
            />
          </div>
          <div className="block mt-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-xs">Answers</span>

              {form.getValues("answers").length < 4 && (
                <button
                  type="button"
                  className="w-6 h-6 rounded-full shadow-lg flex-center border bg-indigo-700 text-white"
                  title="Add Answer"
                  onClick={() => {
                    form.setValue("answers", [
                      ...form.watch("answers"),
                      { text: "", isCorrect: false },
                    ]);
                  }}
                >
                  <Plus size={14} />
                </button>
              )}
            </div>
            {form.formState.errors.answers && (
              <p className="text-red-500 text-xs text-center">
                {form.formState.errors.answers.message}
              </p>
            )}

            <div className="mt-2 space-y-2">
              {form.watch("answers").map((_, i) => (
                <AnswerFormControl
                  key={i + 1}
                  field={{
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      form.setValue(`answers.${i}.text`, e.target.value);
                    },
                    value: form.watch(`answers.${i}.text`),
                  }}
                  checkbox={{
                    onCheck: () => {
                      form.setValue(
                        `answers.${i}.isCorrect`,
                        !form.watch(`answers.${i}.isCorrect`)
                      );
                    },
                    checked: form.watch(`answers.${i}.isCorrect`),
                  }}
                  placeholder={`Answer ${i + 1}`}
                  index={i}
                  onClose={() => {
                    form.setValue(
                      "answers",
                      form.watch("answers").filter((_, j) => j !== i)
                    );
                  }}
                  setError={
                    (form?.formState?.errors?.answers &&
                      form?.formState?.errors?.answers[i] &&
                      (form?.formState?.errors?.answers[i].text
                        ?.message as string)) ||
                    ""
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <LoadingButton
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          className="mt-6 w-full"
        >
          Add
        </LoadingButton>
      </form>
    </Form>
  );
}

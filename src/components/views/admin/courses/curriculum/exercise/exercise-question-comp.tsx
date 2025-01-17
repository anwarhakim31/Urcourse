import React from "react";

import { ModalAddQuestion } from "./modal-add-question";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Question } from "@/types/model";
import { X } from "lucide-react";
import { ModalEditQuestion } from "./modal-edit-question";

type QuestionFieldArray = {
  append: (value: {
    text: string;
    answers: { text: string; isCorrect: boolean }[];
  }) => void;
  fields: Question[];
  remove: (index: number) => void;
  update: (
    index: number,
    value: {
      text: string;
      answers: { text: string; isCorrect: boolean }[];
    }
  ) => void;
};
const ExerciseQuestionComp: React.FC<QuestionFieldArray> = ({
  append,
  fields,
  remove,
  update,
}) => {
  return (
    <div className="mt-4">
      <div>
        <Label className={cn("font-medium text-xs ")}>Question</Label>
      </div>
      <ModalAddQuestion append={append} />
      <div>
        {fields &&
          fields.map((item: Question, i: number) => {
            return (
              <div
                key={item.id}
                className=" bg-indigo-400/20 p-4 mt-4 rounded-md border border-dashed border-indigo-700"
              >
                <div className="flex items-center gap-2 justify-end">
                  <ModalEditQuestion
                    update={update}
                    dataEdit={{
                      text: item?.text || "",
                      answers: item?.answers || [],
                    }}
                    index={i}
                  />
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="rounded-full block  p-1 bg-red-500 text-white hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div>
                  <Label className={cn("font-medium text-xs text-indigo-700")}>
                    Question {i + 1}
                  </Label>
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: item.text || "" }}
                  />
                </div>
                <div>
                  <Label className={cn("font-medium text-xs text-indigo-700")}>
                    Answer
                  </Label>
                  <div className="list-[latin] list-inside ">
                    {item.answers &&
                      item?.answers?.map((answer, index) => (
                        <p key={i} className="text-xs">
                          {index === 0
                            ? "A. "
                            : index === 1
                            ? "B. "
                            : index === 2
                            ? "C. "
                            : "D. "}
                          {answer.text}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ExerciseQuestionComp;

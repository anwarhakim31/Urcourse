import React, { InputHTMLAttributes } from "react";
import { FormControl, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const AnswerFormControl = ({
  field,

  placeholder,
  index,
  onClose,
  setError,
  checkbox,
}: {
  field: InputHTMLAttributes<HTMLInputElement>;
  setError: string;
  placeholder?: string;
  index: number;
  onClose: () => void;
  checkbox: {
    onCheck: () => void;
    checked: boolean;
  };
}) => {
  return (
    <FormItem className="">
      <div className="relative w-full flex items-center ">
        <FormControl>
          <div className="relative group w-full ">
            <span className="absolute left-0 top-1/2 border-r py-1.5 px-2.5 text-slate-800 group-focus-within:text-indigo-700 -translate-y-1/2 group-focus-within:border-indigo-500">
              {index + 1 === 1
                ? "A"
                : index + 1 === 2
                ? "B"
                : index + 1 === 3
                ? "C"
                : "D"}
            </span>
            <Input
              {...field}
              autoComplete="off"
              type="text"
              placeholder={placeholder}
              className={cn(
                "text-sm w-full rounded-none rounded-tl rounded-bl bg-white pl-10"
              )}
            />
          </div>
        </FormControl>
        <button
          type="button"
          onClick={onClose}
          className=" py-3 px-2  bg-red-500 rounded-tr-md rounded-br-md"
        >
          <X size={14} color="white" />
        </button>
        <Checkbox
          className="ml-2"
          onCheckedChange={checkbox.onCheck}
          checked={checkbox.checked}
        />
      </div>

      {setError && (
        <p className="text-red-500 text-xs font-medium">{setError}</p>
      )}
    </FormItem>
  );
};

export default AnswerFormControl;

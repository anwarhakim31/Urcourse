import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface typeProps {
  field: React.ComponentProps<typeof Input>;
  label: string;
  type: string;
  placeholder: string;
  classname?: string;
  isEdit?: boolean;
}

const ProfileFormControl: React.FC<typeProps> = ({
  field,
  label,
  type,
  placeholder,
  classname,
  isEdit = true,
}) => {
  return (
    <>
      <FormItem className="sm:flex sm:items-center gap-4 mb-3">
        <FormLabel
          className={`${
            isEdit ? "" : "pointer-events-none"
          } mt-2 block w-[170px] text-xs`}
        >
          {label}
        </FormLabel>
        <FormControl>
          <Input
            placeholder={placeholder}
            type={type}
            {...field}
            autoComplete="off"
            className={`text-sm ${
              isEdit
                ? "pointer-events-auto border shadow "
                : "pointer-events-none border-none shadow-none"
            } ${classname}`}
          />
        </FormControl>
      </FormItem>
      <FormMessage className="sm:ml-[140px]" />
    </>
  );
};

export default ProfileFormControl;

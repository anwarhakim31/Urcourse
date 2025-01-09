import React, { HtmlHTMLAttributes } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import SelectSearchOption from "./select-search-option";
import { cn } from "@/lib/utils";

interface PropsType {
  field: HtmlHTMLAttributes<HTMLInputElement>;
  label: string;
  placeholder: string;
  isLoading: boolean;
  className?: string;
  required?: boolean;
  data: {
    id: string;
    value: string;
  }[];
}

const SelectFormControl: React.FC<PropsType> = ({
  field,
  placeholder,
  label,
  isLoading,
  data,
  className,
  required,
}) => {
  return (
    <FormItem>
      <FormLabel
        className={cn(
          "font-medium text-xs ",
          required && "after:content-['*'] after:ml-1 after:text-red-500",
          className
        )}
      >
        {label}
      </FormLabel>
      <FormControl>
        <SelectSearchOption
          field={field}
          placeholder={placeholder}
          data={data}
          isLoading={isLoading}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SelectFormControl;

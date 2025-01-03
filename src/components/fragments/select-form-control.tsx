import React, { HtmlHTMLAttributes } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import SelectSearchOption from "./select-search-option";

interface PropsType {
  field: HtmlHTMLAttributes<HTMLInputElement>;
  label: string;
  placeholder: string;
  isLoading: boolean;
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
}) => {
  return (
    <FormItem>
      <FormLabel className="text-xs">{label}</FormLabel>
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

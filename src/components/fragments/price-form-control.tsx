import React, { InputHTMLAttributes } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const PriceFormControl = ({
  field,
  label,

  className,
}: {
  field: InputHTMLAttributes<HTMLInputElement>;
  label: string;

  className?: string;
}) => {
  return (
    <FormItem>
      <FormLabel className="font-medium text-xs">{label}</FormLabel>
      <FormControl>
        <div className="relative w-full ">
          <Input
            {...field}
            type="number"
            autoComplete="off"
            step={1000}
            min={0}
            className={cn("text-sm pl-8 bg-white", className)}
          />
          <p className="absolute left-0  top-1/2 text-sm p-2 -translate-y-1/2  ">
            Rp.
          </p>
        </div>
      </FormControl>

      <FormMessage />
    </FormItem>
  );
};

export default PriceFormControl;

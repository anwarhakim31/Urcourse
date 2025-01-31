import React from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Switch } from "../ui/switch";

const AccessFormControl = ({
  field,
  label,
  description,
}: {
  field: {
    value: boolean | undefined;
    onChange: (value: boolean | undefined) => void;
  };
  label: string;
  description: string;
}) => {
  return (
    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm bg-white">
      <div className="relative w-full flex justify-between items-center">
        <div>
          <FormLabel className="font-medium text-xs">{label}</FormLabel>
          <FormDescription>{description}</FormDescription>
        </div>
        <FormControl>
          <Switch checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
      </div>

      <FormMessage />
    </FormItem>
  );
};

export default AccessFormControl;

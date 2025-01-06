/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormField } from "../ui/form";
import DataFormControl from "./data-form-control";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { Pencil, PlusCircle, X } from "lucide-react";
import FileFormControl from "./file-form-control";
import { Button } from "../ui/button";
import Link from "next/link";

interface ResourceFormProps {
  form: UseFormReturn<any>;
  field: UseFieldArrayReturn<any>;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ form, field }) => {
  const [isEdit, setIsEdit] = React.useState(true);

  React.useEffect(() => {
    field.fields.forEach((_, i) => {
      if (
        form.watch(`resource.${i}.file`) !== "" &&
        form.watch(`resource.${i}.name`) !== ""
      ) {
        return setIsEdit(false);
      }
      return setIsEdit(true);
    });
  }, [form, field, setIsEdit]);

  return (
    <div className="mt-4">
      <h3 className="text-base font-medium ">Resource (opsional)</h3>
      <p className="text-sm mt-1">
        Add resource to this module to make it more interactive
      </p>
      {field.fields.map((f, i) => (
        <div
          key={f.id}
          className=" bg-indigo-400/20 p-4 mt-4 rounded-md border border-indigo-700"
        >
          <div className="flex items-center gap-2 justify-end">
            {form.watch(`resource.${i}.file`) !== "" &&
              form.watch(`resource.${i}.name`) !== "" && (
                <button
                  type="button"
                  onClick={() => setIsEdit(!isEdit)}
                  className="rounded-full block p-1  bg-green-500 text-white hover:bg-green-600"
                >
                  <Pencil size={14} />
                </button>
              )}
            <button
              type="button"
              onClick={() => field.remove(i)}
              className="rounded-full block  p-1 bg-red-500 text-white hover:bg-red-600"
            >
              <X size={14} />
            </button>
          </div>

          {isEdit ? (
            <div className="">
              <FormField
                control={form.control}
                name={`resource.${i}.name`}
                render={({ field }) => (
                  <DataFormControl
                    field={field}
                    label="Resource name"
                    placeholder="e.g Textbook, Worksheet, etc"
                  />
                )}
              />
            </div>
          ) : (
            <p className="text-sm font-medium">
              {form.watch(`resource.${i}.name`)}
            </p>
          )}

          {isEdit ? (
            <div className="mt-4">
              <FormField
                control={form.control}
                name={`resource.${i}.file`}
                render={({ field }) => (
                  <FileFormControl
                    field={field}
                    type="file"
                    disable={
                      form.watch(`resource.${i}.name`) === "" ? true : false
                    }
                    label="Resource file"
                  />
                )}
              />
            </div>
          ) : (
            <Link
              href={form.watch(`resource.${i}.file`)}
              target="_blank"
              className="text-sm"
            >
              {form.watch(`resource.${i}.file`)}
            </Link>
          )}
        </div>
      ))}
      <Button
        type="button"
        className="mt-4 bg-blue-700 hover:bg-blue-600"
        onClick={() => field.append({ name: "", file: "" })}
      >
        <PlusCircle className="mr-2" /> Add resource
      </Button>
    </div>
  );
};

export default ResourceForm;

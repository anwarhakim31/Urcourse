import React, { InputHTMLAttributes } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

const AuthFormControl = ({
  field,
  label,
  placeholder,
  type = "text",
}: {
  field: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  placeholder?: string;
  type?: string;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <FormItem>
      <FormLabel className="font-medium text-xs">{label}</FormLabel>
      <div className="relative w-full">
        <FormControl>
          <Input
            {...field}
            autoComplete="off"
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            className={`${type === "password" ? "pr-8" : ""} text-sm`}
          />
        </FormControl>
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="toggle password visibility"
            className="absolute right-0 top-1/2 -translate-y-1/2 flex-center hover:cursor-pointer hover:bg-purple-100 transition-all duration-300 ease-in-out w-8 h-8 rounded-md"
          >
            {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
      </div>

      <FormMessage />
    </FormItem>
  );
};

export default AuthFormControl;

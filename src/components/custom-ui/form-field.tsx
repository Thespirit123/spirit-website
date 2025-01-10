import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as React from "react";

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  error?: string;
  className?: string;
  type?: "text" | "email" | "password" | "tel" | "number" | "select";
  options?: Option[];
  onValueChange?: (value: string) => void;
  required?: boolean;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  (
    { label, error, className, id, type = "text", options, required, ...props },
    ref
  ) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    const baseInputClasses = "h-12";

    const renderLabel = (
      <Label
        htmlFor={inputId}
        className="text-gray-700 flex items-center gap-0.5"
      >
        {label}
        {required && <span className="text-red-500 text-sm"> *</span>}
      </Label>
    );

    if (type === "select" && options) {
      return (
        <div className={cn("space-y-2", className)}>
          {renderLabel}
          <Select
            onValueChange={props.onValueChange}
            value={props.value?.toString()}
          >
            <SelectTrigger
              id={inputId}
              className={cn(
                baseInputClasses,
                error && "border-red-500 focus:ring-red-500"
              )}
            >
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error && (
            <p id={`${inputId}-error`} className="text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
      );
    }

    return (
      <div className={cn("space-y-2", className)}>
        {renderLabel}
        <Input
          id={inputId}
          ref={ref}
          type={type}
          required={required}
          {...props}
          className={cn(
            baseInputClasses,
            error && "border-red-500 focus:ring-red-500"
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

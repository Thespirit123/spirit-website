import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";

interface FormFieldProps extends Omit<InputProps, "id"> {
  label: string;
  id?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id: idProp, containerClassName, children, ...props }, ref) => {
    const generatedId = React.useId();
    const fieldId = idProp || generatedId;

    return (
      <div className={cn("grid w-full items-center gap-1.5", containerClassName)}>
        <Label htmlFor={fieldId}>{label}</Label>
        {children ? (
          children
        ) : (
          <Input ref={ref} id={fieldId} {...props} />
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };

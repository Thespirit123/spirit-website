import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea, TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import { StarRating } from "./star-rating";

type Option = { value: string; label: string };

type FormFieldProps = {
  label: string;
  id?: string;
  containerClassName?: string;
  error?: string;
  required?: boolean;
} & (
    | ({ type: "textarea" } & TextareaProps)
    | {
      type: "star-rating";
      value: string;
      onValueChange: (value: string) => void;
    }
    | {
      type: "select";
      value: string;
      onValueChange: (value: string) => void;
      options: Option[];
      placeholder?: string;
    }
    | {
      type: "radio";
      value: string;
      onValueChange: (value: string) => void;
      options: Option[];
    }
    | ({
      type?: "text" | "email" | "password" | "tel" | "date" | "number";
    } & InputProps)
  );

const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>((props, ref) => {
  const { label, id: idProp, containerClassName, error, required } = props;
  const generatedId = React.useId();
  const fieldId = idProp || generatedId;

  const renderField = () => {
    switch (props.type) {
      case "textarea": {
        const {
          label: _label,
          containerClassName: _containerClassName,
          error: _error,
          ...rest
        } = props;
        return (
          <Textarea
            id={fieldId}
            {...rest}
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          />
        );
      }
      case "star-rating":
        return (
          <StarRating
            id={fieldId}
            value={props.value}
            onValueChange={props.onValueChange}
          />
        );
      case "select":
        return (
          <Select
            onValueChange={props.onValueChange}
            value={props.value}
            required={required}
          >
            <SelectTrigger id={fieldId}>
              <SelectValue placeholder={props.placeholder || "Select an option"} />
            </SelectTrigger>
            <SelectContent>
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "radio":
        return (
          <RadioGroup
            id={fieldId}
            value={props.value}
            onValueChange={props.onValueChange}
            required={required}
            className="flex flex-col space-y-2 pt-2"
          >
            {props.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${fieldId}-${option.value}`}
                />
                <Label
                  htmlFor={`${fieldId}-${option.value}`}
                  className="font-normal"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      default: {
        const {
          label: _label,
          containerClassName: _containerClassName,
          error: _error,
          ...rest
        } = props;
        return (
          <Input
            id={fieldId}
            {...rest}
            ref={ref as React.ForwardedRef<HTMLInputElement>}
          />
        );
      }
    }
  };

  return (
    <div className={cn("grid w-full items-center gap-1.5", containerClassName)}>
      <Label htmlFor={fieldId}>{label}</Label>
      {renderField()}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
});

FormField.displayName = "FormField";

export { FormField };

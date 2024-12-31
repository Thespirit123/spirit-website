import { ButtonHTMLAttributes, forwardRef, memo } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      isLoading,
      variant = "primary",
      size = "md",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "rounded-[5px] font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const sizeStyles = {
      sm: "px-4 py-2",
      md: "px-6 py-3",
      lg: "px-8 py-4",
    };

    const variantStyles = {
      primary:
        "bg-[#008EA8] text-white hover:bg-[#007A91] focus:ring-[#008EA8]/50",
      secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200/50",
      outline:
        "border-2 border-[#008EA8] text-[#008EA8] hover:bg-[#008EA8] hover:text-white focus:ring-[#008EA8]/50",
    };

    const classes = twMerge(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      fullWidth ? "w-full" : "w-auto",
      disabled || isLoading
        ? "opacity-50 cursor-not-allowed"
        : "cursor-pointer",
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default memo(Button);

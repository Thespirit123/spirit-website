import Link from "next/link";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  memo,
} from "react";
import { twMerge } from "tailwind-merge";

// Keep only the types we need
interface BaseProps {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    isLink?: false;
  };

type ButtonAsLinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    isLink: true;
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const isLinkProps = (props: ButtonProps): props is ButtonAsLinkProps => {
  return "isLink" in props && props.isLink === true;
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      className,
      disabled = false,
      isLoading = false,
      variant = "primary",
      size = "md",
      fullWidth = false,
      ...rest
    } = props;

    const baseStyles =
      "rounded-[5px] font-medium text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center";
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
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "cursor-pointer",
      className
    );

    const content = isLoading ? (
      <div className="flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    ) : (
      children
    );

    if (isLinkProps(props)) {
      // Use OmitIsLink here
      const { href, ...linkRest } = props;
      const linkProps = Object.fromEntries(
        Object.entries(linkRest).filter(([key]) => key !== "isLink")
      );

      return (
        <Link
          href={href}
          className={classes}
          {...linkProps}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
        >
          {content}
        </Link>
      );
    }

    const buttonProps = Object.fromEntries(
      Object.entries(rest).filter(([key]) => key !== "isLink")
    );

    return (
      <button
        ref={ref as ForwardedRef<HTMLButtonElement>}
        className={classes}
        disabled={disabled || isLoading}
        {...buttonProps}
        aria-busy={isLoading}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default memo(Button);

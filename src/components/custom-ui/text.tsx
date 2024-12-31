type TextVariant = "h1" | "h2" | "h3" | "body";
type TextProps = {
  variant?: TextVariant;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
};

export function Text({
  variant = "body",
  className = "",
  children,
  as: Component,
}: TextProps) {
  const variants = {
    h1: "text-[40px] md:text-[42px] lg:text-[44px] font-medium leading-tight",
    h2: "text-[28px] md:text-[30px] lg:text-[32px] font-medium leading-snug",
    h3: "text-[20px] md:text-[22px] lg:text-[24px] font-medium leading-normal",
    body: "text-[16px] md:text-[18px] lg:text-[18px] font-normal leading-relaxed",
  };

  const ElementType = Component || (variant === "body" ? "p" : variant);

  return (
    <ElementType className={`${variants[variant]} ${className}`}>
      {children}
    </ElementType>
  );
}

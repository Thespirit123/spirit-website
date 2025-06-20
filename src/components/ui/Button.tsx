import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#008EA8] focus:ring-opacity-50';
  const variantClasses = {
    primary: 'bg-[#008EA8] hover:bg-[#006E85] text-white',
    secondary: 'bg-[#33A5BA] hover:bg-[#008EA8] text-white',
    accent: 'bg-[#00C2D1] hover:bg-[#008EA8] text-white',
    outline: 'bg-transparent border border-[#008EA8] text-[#008EA8] hover:bg-[#F5F7F9]'
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  return <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`} {...props}>
      {children}
    </button>;
};
export default Button;
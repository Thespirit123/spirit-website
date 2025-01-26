import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
};

export function generateReferralCode(userId: string): string {
  const userPrefix = userId.slice(0, 2).toUpperCase();
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);
  return `SPIRIT-${userPrefix}-${randomNumbers}`;
}

export function validateReferralCode(code: string): boolean {
  const pattern = /^SPIRIT-[A-Z0-9]{2}-\d{4}$/;
  return pattern.test(code);
}

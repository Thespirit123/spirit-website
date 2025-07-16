import { clsx, type ClassValue } from "clsx";
import { Timestamp } from "firebase/firestore";
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

export const formatDate = (timestamp: Timestamp) => {
  return new Date(timestamp.seconds * 1000).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const formatNigerianPhone = (phone: string): string | null => {
  if (!phone) return null;
  const match = phone.match(/^\+234(\d{10})$/);
  if (match) return `0${match[1]}`;
  if (/^0\d{10}$/.test(phone)) return phone;
  return null;
};
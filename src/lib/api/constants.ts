if (!process.env.NEXT_PUBLIC_API_BASE_URL)
  throw new Error("API_BASE_URL is required");
if (!process.env.NEXT_PUBLIC_API_VENDOR_ID)
  throw new Error("API_VENDOR_ID is required");
if (!process.env.NEXT_PUBLIC_API_TOKEN)
  throw new Error("API_TOKEN is required");

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  VENDOR_ID: Number(process.env.NEXT_PUBLIC_API_VENDOR_ID),
  TOKEN: process.env.NEXT_PUBLIC_API_TOKEN,
} as const;

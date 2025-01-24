import { AppDownloadConfig, DownloadAppType } from "@/types";

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

export const APP_DOWNLOADS: Record<DownloadAppType, AppDownloadConfig> = {
  "android-movies": {
    type: "android-movies",
    downloadUrl:
      "https://46gozvqrkdqidcjl.public.blob.vercel-storage.com/OnStream-Jx5Waqh40xPZ2HDOAQBPRkyymnAvTQ.apk",
  },
  "android-anime": {
    type: "android-anime",
    downloadUrl:
      "https://46gozvqrkdqidcjl.public.blob.vercel-storage.com/Anilab-3ZZPTTyPXFsrvw3YYsEqIk2nDbi5ur.apk",
  },
  "android-whatsapp": {
    type: "android-whatsapp",
    downloadUrl: "https://your-whatsapp-apk-link.com",
  },
  "ios-movies": {
    type: "ios-movies",
    instructions: [
      "1. Open TestFlight on your iOS device",
      "2. Click on the invitation link sent to your email",
      "3. Follow TestFlight installation instructions",
      "4. Launch the app and enjoy!",
    ],
  },
};

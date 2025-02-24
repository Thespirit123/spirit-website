import { AppDownloadConfig, CommissionRates, DownloadAppType } from "@/types";

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
    downloadUrl: "https://t.me/+ggMRgtP9Eek1ZmRk",
  },
  "ios-movies": {
    type: "ios-movies",
    downloadUrl: "https://netmirrorapp.com/#ios",
  },
  "bulk-message-pro": {
    type: "bulk-message-pro",
    downloadUrl:
      "https://46gozvqrkdqidcjl.public.blob.vercel-storage.com/BulkMessagePro-1.0.0.apk",
  },
  "auto-save-contact": {
    type: "auto-save-contact",
    downloadUrl:
      "https://46gozvqrkdqidcjl.public.blob.vercel-storage.com/AutoSave%20Contact-YBNZXTPj08FTeoa3rmdcoOtFd37CcI.apk",
  },
  "cap-cut-premium": {
    type: "cap-cut-premium",
    downloadUrl:
      "https://46gozvqrkdqidcjl.public.blob.vercel-storage.com/CapCutPremium-1.0.0.apk",
  },
  "spotify-premium": {
    type: "spotify-premium",
    downloadUrl:
      "https://46gozvqrkdqidcjl.public.blob.vercel-storage.com/Spotify-Premium-I2Yjx0dLIxwTFFUKoct3UZdeqd3kyP",
  },

};

export const COMMISSION_RATES: CommissionRates = {
  "android-movies": 0.1,
  "android-anime": 0.1,
  "android-whatsapp": 0.1,
  "ios-movies": 0.1,
};

export const ANDROID_DOWNLOAD_HELP = [
  "If you're having trouble downloading:",
  "1. Try clearing your browser cache",
  "2. Enable 'Install Unknown Apps' in Settings > Security",
  "3. Try sharing the link to WhatsApp/Telegram and downloading from there",
  "4. If using Chrome, check 'Downloads' permission is enabled",
  "5. Make sure you have enough storage space",
];

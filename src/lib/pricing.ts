import { PaymentPlan } from "@/types";

export const MOVIE_PORTAL_PLANS: PaymentPlan[] = [
  {
    id: "android-movies",
    name: "Android Movies App",
    price: 2500,
    originalPrice: 3000,
    duration: "Lifetime Access",
    platform: "android",
    features: [
      "Unlimited HD streaming",
      "Download for offline viewing",
      "Multiple device support",
      "Smart recommendations",
    ],
  },
  {
    id: "ios-movies",
    name: "iOS Movies App",
    price: 2500,
    originalPrice: 3500,
    duration: "Lifetime Access",
    platform: "ios",
    features: [
      "Stream unlimited movies",
      "Crystal clear 4K quality",
      "Smart recommendations",
      "Seamless iOS integration",
    ],
  },
  {
    id: "android-anime",
    name: "Anime Streaming App",
    price: 2000,
    originalPrice: 2500,
    duration: "Lifetime Access",
    platform: "android",
    features: [
      "Extensive anime library",
      "Download for offline viewing",
      "HD quality streaming",
      "Seasonal updates",
    ],
  },
];

export const WHATSAPP_TOOL_PLANS: PaymentPlan[] = [
  {
    id: "whatsapp-basic",
    name: "WhatsApp Monitoring Tool",
    price: 3000,
    originalPrice: 4000,
    duration: "Lifetime Access",
    platform: "android",
    features: [
      "Message Monitoring",
      "Basic Analytics",
      "Single Device Support",
      "24/7 Support",
      "Free Updates",
    ],
  },
];

"use client";
import { PaymentProvider } from "@/context/payment";
import { CRACKED_APPS_PLANS } from "@/lib/pricing";
import { motion } from "framer-motion";
import {
  Clock,
  LucideIcon,
  MessageCircle,
  Music,
  Shield,
  Star,
  Users,
  Video,
} from "lucide-react";
import { useMemo } from "react";
import { AppCard } from "./components/AppCard";

interface App {
  name: string;
  icon: LucideIcon;
  description: string;
  price: string;
  features: string[];
  primaryColor: string;
  secondaryColor: string;
  planId: string;
}

const apps: App[] = [
  {
    name: "Bulk Message Pro",
    icon: MessageCircle,
    description: "Send mass messages efficiently with advanced features",
    price: "₦4,000",
    features: [
      "Lifetime access",
      "Mass message broadcasting",
      "Message scheduling",
      "Template management",
    ],
    primaryColor: "#008EA8",
    secondaryColor: "#D5F9FF",
    planId: CRACKED_APPS_PLANS.find((plan) => plan.name === "Bulk Message Pro")?.id || "",
  },
  {
    name: "Auto Save Contact",
    icon: Users,
    description: "One-time purchase for permanent contact management solution",
    price: "₦2,000",
    features: [
      "Lifetime access",
      "Automatic contact saving",
      "Smart categorization",
      "Cloud backup & sync",
    ],
    primaryColor: "#008EA8",
    secondaryColor: "#D5F9FF",
    planId: CRACKED_APPS_PLANS.find((plan) => plan.name === "Auto Save Contact")?.id || "",
  },
  {
    name: "CapCut Premium",
    icon: Video,
    description: "Get permanent access to premium video editing features",
    price: "₦4,000",
    features: [
      "Lifetime access",
      "Premium effects & filters",
      "No watermark export",
      "4K resolution support",
    ],
    primaryColor: "#008EA8",
    secondaryColor: "#D5F9FF",
    planId: CRACKED_APPS_PLANS.find((plan) => plan.name === "CapCut Premium")?.id || "",
  },
  {
    name: "Spotify Premium",
    icon: Music,
    description: "Unlock premium music features with one-time payment",
    price: "₦3,000",
    features: [
      "Lifetime access",
      "Ad-free listening",
      "High quality audio",
      "Unlimited skips",
    ],
    primaryColor: "#008EA8",
    secondaryColor: "#D5F9FF",
    planId: CRACKED_APPS_PLANS.find((plan) => plan.name === "Spotify Premium")?.id || "",
  },
];

const AppLandingPage = () => {
  const stats = useMemo(
    () => [
      { icon: Shield, label: "Secure Payment", value: "256-bit SSL" },
      { icon: Star, label: "Customer Rating", value: "4.9/5" },
      { icon: MessageCircle, label: "Active Users", value: "10,000+" },
      { icon: Clock, label: "Support Response", value: "< 2 hrs" },
    ],
    []
  );

  return (
    <PaymentProvider productType="cracked-apps">
      <div className="min-h-screen relative bg-gradient-to-b from-white to-[#F8FDFE]" style={{paddingTop:"100px"}}>
        <div className="relative overflow-hidden -mt-[88px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D5F9FF]/30 to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-[#008EA8] rounded-full opacity-5 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-[#00B4D8] rounded-full opacity-5 blur-3xl animate-pulse delay-1000" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 pt-32 pb-24 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#061D23] to-[#008EA8] bg-clip-text text-transparent mb-6">
                Premium Apps for Modern Life
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-12">
                Discover our suite of professional applications designed to
                enhance your digital experience
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-500">
                {[
                  { icon: Shield, text: "Bank-grade security" },
                  { icon: Star, text: "4.9/5 average rating" },
                  { icon: Clock, text: "24/7 support" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-center gap-2 ${index === 2 ? 'col-span-2 sm:col-span-1 justify-center' : ''
                      }`}
                  >
                    <item.icon size={16} className="text-[#008EA8]" />
                    <span className="text-sm sm:text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 -mt-16 sm:-mt-16 md:-mt-16 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {apps.map((app, index) => (
              <AppCard key={app.name} app={app} index={index} />
            ))}
          </div>
        </div>

        <section className="w-full bg-gradient-to-b from-[#061D23] to-[#04171B] text-white py-12">
          <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center bg-white/5 rounded-2xl p-4 sm:p-6 backdrop-blur-sm"
              >
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#008EA8] mx-auto mb-2 sm:mb-4" />
                <p className="text-xl sm:text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
    </PaymentProvider>
  );
};

export default AppLandingPage;

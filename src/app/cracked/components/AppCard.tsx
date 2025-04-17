import { usePayment } from "@/context/payment";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon } from "lucide-react";
import { memo } from "react";

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

interface AppCardProps {
  app: App;
  index: number;
}

export const AppCard = memo(
  ({ app, index }: AppCardProps) => {
    const { handleOpenPayment } = usePayment();

    const handleBuyNowClick = () => {
      handleOpenPayment(app.planId);
    };

    return (
      <motion.div
        key={app.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#008EA8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
          <div className="p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#D5F9FF] to-white">
                  <app.icon size={24} className="text-[#008EA8]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#061D23]">
                    {app.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-500">
                      Premium Application
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008EA8]" />
                    <span className="text-sm font-medium text-[#008EA8]">
                      Lifetime Access
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FDFE] rounded-xl p-4 mb-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">One-time payment</p>
                  <p className="text-3xl font-bold text-[#008EA8]">
                    {app.price}
                  </p>
                </div>
                <div className="bg-white px-3 py-1 rounded-full border border-[#008EA8]/20">
                  <p className="text-sm font-medium text-[#008EA8]">Save 70%</p>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {app.description}
            </p>
            <div className="space-y-4 mb-8">
              {app.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-gray-700 group/feature"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#008EA8] group-hover/feature:scale-125 transition-transform" />
                  <span className="group-hover/feature:text-[#008EA8] transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#008EA8] to-[#00B4D8]
                      text-white font-semibold flex items-center justify-center gap-2
                      transition-all duration-200 hover:shadow-lg hover:shadow-[#008EA8]/20"
              onClick={handleBuyNowClick}
            >
              Buy Now
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.app.name === nextProps.app.name &&
      prevProps.index === nextProps.index
    );
  }
);

AppCard.displayName = "AppCard";

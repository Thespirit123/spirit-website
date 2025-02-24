import PromoDiscount from "@/assets/images/promo-discount.jpg";
import PromoNumbers from "@/assets/images/promo-numbers.jpeg";
import PromoRewards from "@/assets/images/promo-rewards.jpg";
import Button from "@/components/custom-ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Promotion {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  image: typeof PromoNumbers;
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: "Buy More, Save More!",
    subtitle: "Get FREE International Numbers: Buy 5 get 1 FREE • Buy 10 get 2 FREE • Buy 20 get 5 FREE. Limited time offer - Stock up now and maximize your savings!",
    cta: "View Bundles",
    image: PromoNumbers,
  },
  {
    id: 2,
    title: "Exclusive 20% OFF Everything",
    subtitle: "Special offer for Spirit Media users! Enjoy 20% off all products including Movies, WhatsApp Tools, and Premium Apps. Don't miss out on these amazing savings!",
    cta: "Shop Now",
    image: PromoDiscount,
  },
  {
    id: 3,
    title: "Earn 20% Lifetime Commission",
    subtitle: "Join our referral program and earn 20% commission on every purchase your referrals make - forever! Start building your passive income stream today.",
    cta: "Join Program",
    image: PromoRewards,
  },
];

export const HeroSection = ({ onExplore }: { onExplore: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const navigate = (direction: 'prev' | 'next') => {
    setCurrentSlide(prev => {
      if (direction === 'prev') {
        return prev === 0 ? promotions.length - 1 : prev - 1;
      }
      return (prev + 1) % promotions.length;
    });
  };

  return (
    <div
      className="relative min-h-[700px] lg:min-h-[800px] bg-gray-900 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={promotions[currentSlide].image}
            alt=""
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30" />

          <div className="absolute inset-0">
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
              <div className="h-full flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-xl backdrop-blur-md bg-black/20 p-6 sm:p-8 rounded-lg"
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                    {promotions[currentSlide].title}
                  </h2>
                  <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 leading-relaxed">
                    {promotions[currentSlide].subtitle}
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onExplore}
                    className="text-base px-6 py-3 backdrop-blur-none"
                  >
                    {promotions[currentSlide].cta}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-6 py-4">
        <button
          onClick={() => navigate('prev')}
          className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors backdrop-blur-md"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex gap-3">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => navigate('next')}
          className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors backdrop-blur-md"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};
import { Slide } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { VideoSlide } from "./videoSlide";

const slides: Slide[] = [
  {
    appType: {
      name: "Stream Movies on Android",
      platform: "android",
    },
    price: {
      original: "₦3,000",
      discounted: "₦2,500",
    },
    features: [
      "Unlimited HD streaming",
      "Download for offline viewing",
      "Multiple device support",
      "Smart recommendations",
    ],
    videoSrc: "1044997147",
  },
  {
    appType: {
      name: "Stream Movies on iOS",
      platform: "ios",
    },
    price: {
      original: "₦3,500",
      discounted: "₦2,500",
    },
    features: [
      "Stream unlimited movies",
      "Crystal clear 4K quality",
      "Smart recommendations",
      "Seamless iOS integration",
    ],
    videoSrc: "1045000318",
  },
  {
    appType: {
      name: "Anime Streaming for Android",
      platform: "android",
    },
    price: {
      original: "₦2,500",
      discounted: "₦2,000",
    },
    features: [
      "Extensive anime library",
      "Download for offline viewing",
      "HD quality streaming",
      "Seasonal updates",
    ],
    videoSrc: "1044999327",
  },
];

const CarouselSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasLoadedRef = useRef(false);

  const handleSlideChange = useCallback((newIndex: number) => {
    hasLoadedRef.current = false;
    setIsLoading(true);
    setActiveIndex(newIndex);
  }, []);

  const handleNext = useCallback(() => {
    handleSlideChange(activeIndex === slides.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex]);

  const handlePrev = useCallback(() => {
    handleSlideChange(activeIndex === 0 ? slides.length - 1 : activeIndex - 1);
  }, [activeIndex]);

  const handleVideoEnd = useCallback(() => {
    const nextIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    handleSlideChange(nextIndex);
  }, [activeIndex, handleSlideChange]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <section className="relative bg-brand-primary-dark-bg min-h-screen py-10 px-4 sm:px-6 lg:px-10">
      <AnimatePresence mode="wait">
        <motion.div key={activeIndex}>
          <VideoSlide
            {...slides[activeIndex]}
            isLoading={isLoading}
            onVideoEnd={handleVideoEnd}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-8">
        <button
          onClick={handlePrev}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSlideChange(idx)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                idx === activeIndex ? "bg-brand-primary" : "bg-white/30"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
        </button>
      </div>
    </section>
  );
};

export default CarouselSection;

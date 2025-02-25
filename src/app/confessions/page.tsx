"use client";
import ConfessionsBg from "@/assets/images/confessions-bg.png";
import MaskImg from "@/assets/images/mask.png";
import { Card } from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/utils";
import { submitConfession } from "@/services/confessions";
import { Lock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const glassEffect =
  "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl";

const containerWidths = {
  sm: "w-[95%]",
  md: "w-[85%]",
  lg: "w-[70%]",
  xl: "w-[60%]",
};

const ConfessionPage = () => {
  const [confession, setConfession] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confession.trim()) {
      toast.error("Please enter your confession");
      return;
    }

    try {
      setIsSubmitting(true);
      await submitConfession(confession);

      toast.success("Confession submitted successfully. Thank you!");
      setConfession("");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit confession"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-2 sm:px-4 py-8 sm:py-12 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <OptimizedImage
          src={ConfessionsBg}
          alt="Background"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        className={`relative z-10 ${containerWidths.sm} sm:${containerWidths.md} lg:${containerWidths.lg} xl:${containerWidths.xl} flex flex-col items-center`}
      >
        <div className="text-center mb-8 sm:mb-12 w-full">
          <div className="w-[180px] h-[150px] sm:w-[250px] sm:h-[200px] mx-auto">
            <OptimizedImage
              src={MaskImg}
              alt="Venetian Mask"
              width={250}
              height={200}
              className="w-full h-full object-contain"
              quality={90}
              sizes="(max-width: 640px) 180px, 250px"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Confession Night
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto px-4">
            Share your deepest secrets, untold stories, and hidden truths. Your
            confession remains completely anonymous.
          </p>
        </div>

        <Card
          className={`w-full ${glassEffect} p-4 sm:p-6 md:p-8 rounded-lg min-h-[60vh] sm:min-h-0`}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5 sm:space-y-6 h-full flex flex-col"
          >
            <div className="flex items-center text-gray-400 text-xs sm:text-sm">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              <span>100% Anonymous • No IP Tracking • No Data Storage</span>
            </div>

            <textarea
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
              placeholder="Type your confession here..."
              className="w-full flex-1 min-h-[37vh] sm:h-48 bg-gray-700 bg-opacity-50 rounded-lg p-3 sm:p-4
                text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none
                focus:ring-2 focus:ring-brand-primary resize-none"
              maxLength={500}
            />

            <div
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0
              text-xs sm:text-sm text-gray-400"
            >
              <span className="flex items-center">
                <span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-brand-primary animate-pulse mr-2"></span>
                Posted every Wednesday at 9 PM
              </span>
              <span>{confession.length}/500 characters</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !confession.trim()}
              className={cn(
                "w-full bg-brand-primary text-white py-3.5 sm:py-3 rounded-lg",
                "flex items-center justify-center space-x-2 transition-all",
                "text-base sm:text-base mt-auto",
                isSubmitting && "opacity-50 cursor-not-allowed",
                !confession.trim() && "opacity-50 cursor-not-allowed",
                !isSubmitting && confession.trim() && "hover:bg-brand-primary/90"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Share your Confession</span>
                </>
              )}
            </button>
          </form>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full mt-8 sm:mt-12">
          {[
            {
              title: "Complete Privacy",
              description:
                "Your identity remains 100% anonymous. No tracking, no traces.",
            },
            {
              title: "Weekly Features",
              description:
                "Selected confessions are shared every Wednesday at 9 PM.",
            },
            {
              title: "Safe Space",
              description:
                "A judgment-free zone for sharing your untold stories.",
            },
          ].map((card, index) => (
            <Card
              key={index}
              className={`${glassEffect} p-4 sm:p-6 rounded-lg hover:bg-white/15 transition-all duration-300`}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-2">
                {card.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-300">
                {card.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfessionPage;

"use client"

import Feature1 from "@/assets/icons/feature1.svg";
import Feature2 from "@/assets/icons/feature2.svg";
import Feature3 from "@/assets/icons/feature3.svg";
import Feature4 from "@/assets/icons/feature4.svg";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
import { usePayment } from "@/context/payment";
import { FeatureCard } from "./featureCard";

const features = [
  {
    image: Feature1,
    title: "Unlimited Movie Selection",
    subtitle:
      "Access a massive collection of 10,000+ movies spanning multiple genres, languages, and eras.",
  },
  {
    image: Feature2,
    title: "Crystal Clear Viewing",
    subtitle:
      "Experience cinema-quality streaming with our advanced technology that supports up to 4K resolution.",
  },
  {
    image: Feature3,
    title: "Watch Anywhere, Anytime",
    subtitle:
      "Download your favorite movies directly to your device and enjoy them without an internet connection.",
  },
  {
    image: Feature4,
    title: "Smart Content Suggestions",
    subtitle:
      "Our cutting-edge AI analyzes your viewing history and preferences to curate a personalized movie recommendation list.",
  },
];

const FeaturesSection = () => {
  const { handleOpenPayment } = usePayment();

  return (
    <section className="bg-[#ffffff] py-10 sm:py-16 lg:py-20">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div className="w-full lg:w-[45%] mb-10 lg:mb-0 lg:mt-20 text-center lg:text-left">
            <span className="text-brand-primary font-semibold text-sm sm:text-base">
              OUR FEATURES
            </span>
            <Text
              variant="h2"
              className="font-semibold text-2xl sm:text-3xl lg:text-4xl mt-4"
            >
              Elevate Your Viewing Experience with Next-Level Movie Streaming
              Features
            </Text>
            <p className="font-light mt-4 text-gray-600 text-sm sm:text-base">
              Discover a world of entertainment with our feature-rich streaming
              platform. From crystal-clear 4K viewing to smart recommendations,
              we&apos;ve crafted every detail to enhance your movie-watching
              journey.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Button
                variant="primary"
                className="mt-6 xl:mt-10 mx-auto xl:mx-0"
                onClick={() => handleOpenPayment("")}
              >
                Get Instant Access
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 w-full lg:w-[55%]">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                image={feature.image}
                title={feature.title}
                subtitle={feature.subtitle}
                loading={index > 1 ? "lazy" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

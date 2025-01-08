import Feature1 from "@/assets/icons/feature1.svg";
import Feature2 from "@/assets/icons/feature2.svg";
import Feature3 from "@/assets/icons/feature3.svg";
import Feature4 from "@/assets/icons/feature4.svg";
import Button from "@/components/custom-ui/button";
import { Text } from "@/components/custom-ui/text";
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
  return (
    <section className="bg-[#ffffff] py-20 w-11/12 max-w-7xl mx-auto">
      <div className="w-full max-w-7xl mx-auto flex gap-20">
        <div className="w-[45%] mt-20">
          <span className="text-brand-primary font-semibold">OUR FEATURES</span>
          <Text variant="h2" className="font-semibold">
            Elevate Your Viewing Experience with Next-Level Movie Streaming
            Features
          </Text>
          <p className="font-light mt-4">
            Elevate Your Viewing Experience with Next-Level Movie Streaming
            Features. Elevate Your Viewing Experience with Next-Level Movie
            Streaming Features
          </p>
          <Button
            variant="primary"
            className="mt-10 block"
            onClick={() => console.log("Clicked")}
          >
            Get Instant Access
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-8 w-[55%]">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              image={feature.image}
              title={feature.title}
              subtitle={feature.subtitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

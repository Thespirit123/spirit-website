import Feature1 from "@/assets/icons/wa-feature1.svg";
import Feature2 from "@/assets/icons/wa-feature2.svg";
import Feature3 from "@/assets/icons/wa-feature3.svg";
import Feature4 from "@/assets/icons/wa-feature4.svg";
import { FeatureCard } from "../../movie-portal/features/featureCard";

const features = [
  {
    image: Feature1,
    title: "Message Tracking",
    subtitle:
      "Capture and view all sent and received WhatsApp messages instantly.",
  },
  {
    image: Feature2,
    title: "Call Log Analysis",
    subtitle:
      "Monitor incoming and outgoing call logs, including duration, timestamps, and contact information.",
  },
  {
    image: Feature3,
    title: "Media Capture",
    subtitle:
      "Automatically capture and store all shared photos, videos, and audio files.",
  },
  {
    image: Feature4,
    title: "Location Tracking",
    subtitle:
      "Track device location with precise GPS coordinates. Monitor movement patterns and geographical interactions without detection.",
  },
];

const MainFeatures = () => {
  return (
    <section className="w-11/12 max-w-7xl mx-auto py-10 sm:py-16 lg:py-20">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-brand-primary font-semibold text-3xl">
          Our Main Features
        </h3>
        <p className="text-lg font-light">
          Comprehensive WhatsApp Monitoring with Undetectable Tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8">
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
    </section>
  );
};

export default MainFeatures;

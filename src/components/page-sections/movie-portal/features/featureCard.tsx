import Image, { StaticImageData } from "next/image";
import { FC, memo } from "react";

interface FeatureCardProps {
  image: StaticImageData;
  title: string;
  subtitle: string;
}

export const FeatureCard: FC<FeatureCardProps> = memo(
  ({ image, title, subtitle }) => (
    <div className="bg-[#FAFAFA] rounded-lg p-6 transition-all">
      <div className="w-10 h-10 mb-4 relative">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-brand-primary-dark">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{subtitle}</p>
    </div>
  )
);

FeatureCard.displayName = "FeatureCard";

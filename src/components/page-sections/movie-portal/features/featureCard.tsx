import Image from "next/image";
import { FC, memo } from "react";

interface FeatureCardProps {
  image: string;
  title: string;
  subtitle: string;
  loading?: "lazy" | "eager";
}

export const FeatureCard: FC<FeatureCardProps> = memo(
  ({ image, title, subtitle, loading }) => (
    <div className="bg-[#FAFAFA] rounded-lg p-4 sm:p-6 transition-all">
      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-4 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain"
          loading={loading}
        />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 text-brand-primary-dark">
        {title}
      </h3>
      <p className="text-gray-600 text-sm sm:text-base">{subtitle}</p>
    </div>
  )
);

FeatureCard.displayName = "FeatureCard";

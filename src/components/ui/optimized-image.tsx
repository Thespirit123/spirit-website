import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends ImageProps {
  lowQualityUrl?: string;
  fill?: boolean;
}

export const OptimizedImage = ({
  src,
  alt,
  lowQualityUrl,
  className,
  fill,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`${fill ? "relative w-full h-full" : ""} ${className}`}>
      <Image
        {...props}
        src={src}
        alt={alt}
        fill={fill}
        className={`
          duration-700 ease-in-out
          ${isLoading ? "scale-110 blur-lg" : "scale-100 blur-0"}
          ${fill ? "object-cover" : ""}
        `}
        onLoadingComplete={() => setIsLoading(false)}
        placeholder="blur"
        blurDataURL={lowQualityUrl || "data:image/jpeg;base64,..."}
      />
    </div>
  );
};

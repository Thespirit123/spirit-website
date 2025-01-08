"use client";

import { CldImage } from "next-cloudinary";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function CloudinaryImage({
  src,
  alt,
  width,
  height,
}: CloudinaryImageProps) {
  return (
    <CldImage
      width={width}
      height={height}
      src={src}
      sizes="100vw"
      alt={alt}
      loading="lazy"
    />
  );
}

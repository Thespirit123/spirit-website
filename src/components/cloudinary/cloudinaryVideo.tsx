"use client";

import { CldVideoPlayer } from "next-cloudinary";

interface CloudinaryVideoProps {
  src: string;
  width: number;
  height: number;
  autoPlay?: boolean;
}

export default function CloudinaryVideo({
  src,
  width,
  height,
  autoPlay,
}: CloudinaryVideoProps) {
  return (
    <CldVideoPlayer
      width={width}
      height={height}
      src={src}
      autoPlay={autoPlay}
      controls
      transformation={{
        quality: "auto",
        format: "auto",
        streaming: true,
      }}
    />
  );
}

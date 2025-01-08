import Arrow from "@/assets/icons/arrow";
import Download from "@/assets/icons/download";
import Stream from "@/assets/icons/stream";
import AndroidFrame from "@/assets/images/android-frame.png";
import iOSFrame from "@/assets/images/iphone-frame.png";
import Button from "@/components/custom-ui/button";
import { Platform } from "@/types";
import Image from "next/image";
import { memo } from "react";
import { FaAndroid, FaApple } from "react-icons/fa";

interface VideoSlideProps {
  appType: {
    name: string;
    platform: Platform;
  };
  price: string;
  features: string[];
  videoSrc: string;
}

const PlatformIcon = ({ platform }: { platform: "ios" | "android" }) =>
  platform === "ios" ? (
    <FaApple className="w-6 h-6 text-white" />
  ) : (
    <FaAndroid className="w-6 h-6 text-white" />
  );

export const VideoSlide = memo(
  ({ appType, price, features, videoSrc }: VideoSlideProps) => (
    <div className="w-full min-h-[800px] flex items-center justify-between px-40">
      <div className="w-1/2 pr-10 space-y-8">
        <h3 className="text-4xl font-semibold text-white">
          Choose Your Perfect Entertainment App
        </h3>

        <div className="flex items-center gap-3">
          <PlatformIcon platform={appType.platform} />
          <p className="text-2xl text-white">{appType.name}</p>
        </div>

        <p className="text-3xl font-semibold text-brand-primary">{price}</p>

        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-white font-light"
            >
              <Arrow />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <Stream className="text-brand-primary" />
            <span>Stream</span>
          </div>

          {appType.platform === "android" && (
            <div className="flex items-center gap-2 text-white">
              <Download className="text-brand-primary" />
              <span>Download</span>
            </div>
          )}
        </div>

        <Button variant="primary" className="!mt-8">
          Get Instant Access
        </Button>
      </div>

      <div className="w-1/2 flex justify-end">
        <div className="relative w-[320px] h-[650px]">
          <Image
            src={appType.platform === "android" ? AndroidFrame : iOSFrame}
            alt="Phone Frame"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
);

VideoSlide.displayName = "VideoSlide";

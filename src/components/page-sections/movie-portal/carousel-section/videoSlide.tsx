import Arrow from "@/assets/icons/arrow";
import Download from "@/assets/icons/download";
import Stream from "@/assets/icons/stream";
import AndroidFrame from "@/assets/images/android-frame.png";
import iOSFrame from "@/assets/images/iphone-frame.png";
import { VimeoPlayer } from "@/components/cloud-assets/VimeoPlayer";
import Button from "@/components/custom-ui/button";
import { Platform } from "@/types";
import Image from "next/image";
import { memo } from "react";
import { FaAndroid, FaApple } from "react-icons/fa";

interface Slide {
  appType: {
    name: string;
    platform: Platform;
  };
  price: {
    original: string;
    discounted: string;
  };
  features: string[];
  videoSrc: string;
  isLoading: boolean;
}

interface VideoSlideProps extends Slide {
  onVideoEnd?: () => void;
}

const PlatformIcon = ({ platform }: { platform: "ios" | "android" }) =>
  platform === "ios" ? (
    <FaApple className="w-6 h-6 text-white" />
  ) : (
    <FaAndroid className="w-6 h-6 text-white" />
  );

export const VideoSlide = memo(
  ({ appType, price, features, videoSrc, onVideoEnd }: VideoSlideProps) => (
    <div className="w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-40 py-8 lg:py-0 gap-8 lg:gap-0">
      <div className="w-full lg:w-1/2 lg:pr-10 space-y-6 lg:space-y-8">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white text-center lg:text-left">
          Choose Your Perfect Entertainment App
        </h3>

        <div className="flex items-center gap-3 justify-center lg:justify-start">
          <PlatformIcon platform={appType.platform} />
          <p className="text-xl sm:text-2xl text-white">{appType.name}</p>
        </div>

        <div className="relative pt-2">
          <div className="absolute -top-4 sm:-top-6 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0">
            <span className="inline-block bg-brand-primary px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-white rounded-full whitespace-nowrap">
              Limited Time Offer - 2 Weeks Only
            </span>
          </div>
          <p className="text-2xl sm:text-3xl font-semibold text-center lg:text-left">
            <span className="text-gray-400 line-through mr-3">
              {price.original}
            </span>
            <span className="text-brand-primary">{price.discounted}</span>
          </p>
        </div>

        <ul className="space-y-3 lg:space-y-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-white font-light justify-center lg:justify-start"
            >
              <Arrow />
              <span className="text-sm sm:text-base">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 justify-center lg:justify-start">
          <div className="flex items-center gap-2 text-white">
            <Stream className="text-brand-primary" />
            <span className="text-sm sm:text-base">Stream</span>
          </div>

          {appType.platform === "android" && (
            <div className="flex items-center gap-2 text-white">
              <Download className="text-brand-primary" />
              <span className="text-sm sm:text-base">Download</span>
            </div>
          )}
        </div>

        <div className="flex justify-center lg:justify-start w-full">
          <Button variant="primary">Get Instant Access</Button>
        </div>
      </div>

      <div className="w-full sm:w-2/3 lg:w-1/2 flex justify-center lg:justify-end">
        <div className="relative w-[280px] sm:w-[300px] lg:w-[320px] h-[570px] sm:h-[610px] lg:h-[650px]">
          <Image
            src={appType.platform === "android" ? AndroidFrame : iOSFrame}
            alt="Phone Frame"
            fill
            className="object-contain z-10"
            priority
          />

          <div
            className={`absolute z-0 ${
              appType.platform === "android"
                ? "top-[2%] left-[4%] right-[4%] bottom-[2%] rounded-[30px]"
                : "top-[4%] left-[5%] right-[5%] bottom-[4%] rounded-[40px]"
            } overflow-hidden`}
          >
            <VimeoPlayer videoId={videoSrc} onVideoEnd={onVideoEnd} />
          </div>
        </div>
      </div>
    </div>
  )
);

VideoSlide.displayName = "VideoSlide";

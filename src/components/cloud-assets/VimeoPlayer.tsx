import Vimeo from "@u-wave/react-vimeo";
import { memo } from "react";
import { ImSpinner8 } from "react-icons/im";

interface VimeoPlayerProps {
  videoId: string;
  className?: string;
}

export const VimeoPlayer = memo(
  ({ videoId, className = "" }: VimeoPlayerProps) => {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div className="absolute bg-black/90 flex items-center justify-center transition-opacity duration-300 inset-0">
          <ImSpinner8 className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin" />
        </div>

        {/* Video positioned above loader */}
        <div className="relative z-10">
          <Vimeo video={videoId} responsive autopause={false} background />
        </div>
      </div>
    );
  }
);

VimeoPlayer.displayName = "VimeoPlayer";

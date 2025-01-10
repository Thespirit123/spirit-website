import Vimeo from "@u-wave/react-vimeo";
import { memo } from "react";
import { ImSpinner8 } from "react-icons/im";

interface VimeoPlayerProps {
  videoId: string;
  className?: string;
  loop?: boolean;
  onVideoEnd?: () => void;
}

export const VimeoPlayer = memo(
  ({ videoId, className = "", loop = false, onVideoEnd }: VimeoPlayerProps) => {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <div className="absolute bg-black/90 flex items-center justify-center transition-opacity duration-300 inset-0">
          <ImSpinner8 className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-spin" />
        </div>

        <div className="relative z-10">
          <Vimeo
            video={videoId}
            responsive
            autopause={false}
            background
            loop={loop}
            onEnd={onVideoEnd}
          />
        </div>
      </div>
    );
  }
);

VimeoPlayer.displayName = "VimeoPlayer";

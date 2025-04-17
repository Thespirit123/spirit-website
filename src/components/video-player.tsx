import { memo, useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  onVideoEnd?: () => void;
}

export const VideoPlayer = memo(
  ({ videoUrl, onVideoEnd }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video || !onVideoEnd) return;

      const handleEnd = (event: Event) => {
        console.log("Video ended", event);
        onVideoEnd();
      };

      video.addEventListener("ended", handleEnd);
      return () => video.removeEventListener("ended", handleEnd);
    }, [onVideoEnd]);

    return (
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        loop
        autoPlay
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src={videoUrl} type="video/mp4" />
        <track kind="captions" />
      </video>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

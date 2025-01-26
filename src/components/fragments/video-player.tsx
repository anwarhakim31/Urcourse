import { cn } from "@/lib/utils";
import { Loader2, Maximize2, Pause, Play } from "lucide-react";

import React from "react";

const VideoPlayer = ({
  src,
  className,
  onEndded,
}: {
  src: string;
  className?: string;
  onEndded?: () => void;
}) => {
  const vidRef = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const handleClick = () => {
    if (playing) {
      vidRef.current?.pause();
      setPlaying(false);
    } else {
      vidRef.current?.play();
      setPlaying(true);
    }
  };

  const handleEnded = () => {
    if (onEndded) {
      onEndded();
      setPlaying(false);
    }
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!document.fullscreenElement) {
      if (vidRef.current?.requestFullscreen) {
        vidRef.current?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      className={cn(
        "aspect-video relative bg-[#212121] overflow-hidden",
        playing ? "rounded-none" : "rounded-md ",
        className
      )}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <video
        className="relative z-[1] w-full h-full"
        ref={vidRef}
        autoPlay={playing}
        onEnded={handleEnded}
        disablePictureInPicture
      >
        <source src={src} type="video/mp4" />
      </video>
      {hover && (
        <div className="absolute z-[2]  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#212121] w-12 h-12 rounded-full flex items-center justify-center">
          {playing ? <Pause fill="white" /> : <Play fill="white" />}
        </div>
      )}
      <div className="z-[0] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loader2 className="animate-spin w-8 h-8" color="white" />
      </div>
      <button
        onClick={toggleFullScreen}
        className="absolute bottom-4 z-10 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full"
      >
        <Maximize2 size={18} />
      </button>
    </div>
  );
};

export default VideoPlayer;

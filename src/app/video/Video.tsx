"use client";

import React, { useRef } from "react";

interface Props {
  width: string;
  height: string;
  poster: any;
}

const Video = ({ width, height, poster }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current as any;

      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.webkitRequestFullscreen) {
        // Safari
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        // IE11
        videoElement.msRequestFullscreen();
      }
      videoElement.play();
    }
  };

  return (
    <div
      className="bg-white p-1 rounded-xl"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <video
        ref={videoRef} // Attach the ref to the video element
        className="rounded-xl w-full h-full"
        controls
        preload="none"
        poster={poster}
        onClick={handleVideoClick}
      >
        <source src="www.youtube.com/watch?v=Bjm9XFf-7CI" type="video/mp4" />
        <track
          src="www.youtube.com/watch?v=Bjm9XFf-7CI"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import bg_image from "../assets/bg_img.png";
import shadow_img from "../assets/shadow.png";
import bg_shape from "../assets/bg_shape.png";
import logo_white from "../assets/logo_white.png";

const LandingPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(true);

  // Function to handle exiting fullscreen and showing the design
  const handleFullScreenChange = () => {
    if (!document.fullscreenElement) {
      setShowVideo(false); // Hide the video
    }
  };

  // Function to handle keydown events
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowVideo(false); // Hide the video when Escape is pressed
      if (videoRef.current) {
        videoRef.current.pause(); // Pause the video
      }
    }
  };

  // Function to check screen size and set initial video state
  const checkScreenSize = () => {
    if (window.innerWidth >= 1024) {
      // Adjust the width threshold as needed
      setShowVideo(true); // Show video on large devices
    } else {
      setShowVideo(false); // Hide video on tablets
    }
  };

  // Auto-play video without waiting for interaction
  useEffect(() => {
    checkScreenSize(); // Check screen size on initial render

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play(); // Auto-play video if shown
    }

    // Attach fullscreen change listener
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    // Attach keydown event listener
    window.addEventListener("keydown", handleKeyDown);
    // Attach resize event listener
    window.addEventListener("resize", checkScreenSize);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      window.removeEventListener("keydown", handleKeyDown); // Cleanup keydown event listener
      window.removeEventListener("resize", checkScreenSize); // Cleanup resize event listener
    };
  }, []);

  return (
    <div className="w-full h-full">
      {/* Fullscreen Video - Plays on page visit */}
      {showVideo && (
        <video
          ref={videoRef}
          src="https://saudi-ec.eu-central-1.linodeobjects.com/sec_8_eng.mp4"
          className="w-full h-full object-cover video"
          loop
          muted
          autoPlay
          playsInline
        />
      )}

      {/* Design that shows after exiting fullscreen */}
      {!showVideo && (
        <div>
          <Image
            className="absolute top-10 right-10 z-50 logo"
            src={logo_white}
            width={200}
            alt="Logo"
          />
          <Image
            src={bg_image}
            alt="Background"
            className="w-full h-full object-cover bg_image"
          />
          <Image
            src={shadow_img}
            alt="Shadow Overlay"
            className="w-full h-full object-cover opacity-60 absolute z-40 top-0 bg_shadow"
          />
          <div>
            <Image
              src={bg_shape}
              alt="Center Shape"
              className="absolute z-50 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg_shape"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

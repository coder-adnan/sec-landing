import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import bg_image from "../assets/bg_img.png";
import shadow_img from "../assets/shadow.png";
import bg_shape from "../assets/bg_shape.png";
import logo_white from "../assets/logo_white.png";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(true);

  const handleFullScreenChange = () => {
    if (!document.fullscreenElement) {
      setShowVideo(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowVideo(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  const checkScreenSize = () => {
    setShowVideo(window.innerWidth >= 1024);
  };

  useEffect(() => {
    checkScreenSize();

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play();
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", checkScreenSize);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Fullscreen Video - Plays on page visit */}
      {showVideo && (
        <video
          ref={videoRef}
          src="https://saudi-ec.eu-central-1.linodeobjects.com/sec_8_eng.mp4"
          className={styles.video}
          loop
          muted
          autoPlay
          playsInline
        />
      )}

      {/* Design that shows after exiting fullscreen */}
      {!showVideo && (
        <div className={styles.overlay}>
          <Image
            className={styles.logo}
            src={logo_white}
            width={200}
            alt="Logo"
          />
          <Image src={bg_image} alt="Background" className={styles.bgImage} />
          <Image
            src={shadow_img}
            alt="Shadow Overlay"
            className={styles.shadowImage}
          />
          <div className={styles.bgShapeWrapper}>
            <Image
              src={bg_shape}
              alt="Center Shape Fullscreen"
              className={styles.bgShape}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

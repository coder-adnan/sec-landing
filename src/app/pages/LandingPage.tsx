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
      videoRef.current?.pause();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    setShowVideo(true);

    if (videoElement) {
      videoElement.play().catch(() => {
        const playOnInteraction = () => {
          videoElement.play();
          document.removeEventListener("click", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
      });
    }

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    const bubblesContainer = document.getElementById("bubblesContainer");
    const bubble = document.createElement("div");
    bubble.className = styles.bubble;
    bubble.style.left = `${event.clientX - 7.5}px`;
    bubble.style.top = `${event.clientY - 7.5}px`;
    bubblesContainer?.appendChild(bubble);
    bubble.addEventListener("animationend", () => bubble.remove());
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <div id="bubblesContainer" className={styles.bubblesContainer}></div>

      {showVideo && (
        <video
          ref={videoRef}
          src="https://saudi-ec.eu-central-1.linodeobjects.com/sec_8_eng.mp4"
          className={styles.video}
          controls
          loop
          muted
          autoPlay
          playsInline
        />
      )}

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
          <div className="grid-container">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;

"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoShowcaseProps {
  isVisible: boolean;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays smoothly across all browsers
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled silently
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Video element with smooth CSS mask on the left edge */}
      <div
        className="w-full h-full relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 8%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.7) 32%, black 48%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 8%, rgba(0,0,0,0.3) 18%, rgba(0,0,0,0.7) 32%, black 48%)",
        }}
      >
        <video
          ref={videoRef}
          src="/videos/auth-showcase.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-[1.02]"
        />
      </div>

      {/* Primary horizontal gradient transition: Pure White -> Translucent White -> Transparent */}
      <div
        className="absolute inset-y-0 left-0 w-44 md:w-64 lg:w-96 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to right, #FFFFFF 0%, rgba(255, 255, 255, 0.96) 20%, rgba(255, 255, 255, 0.72) 45%, rgba(255, 255, 255, 0.25) 75%, transparent 100%)",
        }}
      />

      {/* Subtle blur transition band along the left border */}
      <div
        className="absolute inset-y-0 left-0 w-28 md:w-40 pointer-events-none z-10 backdrop-blur-[2px]"
        style={{
          WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
          maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
        }}
      />

      {/* Top soft vignette */}
      <div
        className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255, 255, 255, 0.4) 40%, transparent 100%)",
        }}
      />

      {/* Bottom soft vignette */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 40%, transparent 100%)",
        }}
      />
    </motion.div>
  );
};

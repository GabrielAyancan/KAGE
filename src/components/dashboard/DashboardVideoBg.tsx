"use client";

import React, { useRef, useEffect } from "react";

export function DashboardVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Garante que o vídeo toca uma única vez até o final e pausa no último frame
    video.play().catch(() => {});
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center"
      >
        <source src="/videos/dashboard-samurai.mp4" type="video/mp4" />
      </video>
      {/* Camada luminosa sutil para manter o texto com excelente contraste */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[0.5px]" />
    </div>
  );
}

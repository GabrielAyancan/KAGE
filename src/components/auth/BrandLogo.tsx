"use client";

import React from "react";

export const BrandLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-2xl sm:text-3xl font-bold tracking-[0.32em] text-neutral-950 uppercase select-none leading-none">
        KAGE
      </span>
    </div>
  );
};

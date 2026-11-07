"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = "",
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus:outline-none";

  const variants = {
    primary:
      "h-11 px-5 rounded-xl text-sm bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.985] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] border border-neutral-900",
    outline:
      "h-11 px-5 rounded-xl text-sm bg-white text-neutral-800 border border-neutral-200/90 hover:bg-neutral-50/80 hover:border-neutral-300 active:scale-[0.985] shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
    ghost:
      "h-10 px-3.5 rounded-lg text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70 active:scale-[0.985]",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Carregando...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2.5">
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      )}
    </button>
  );
};

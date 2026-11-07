"use client";

import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  isPassword?: boolean;
  helperText?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      leftIcon,
      isPassword = false,
      helperText,
      id,
      type = "text",
      className = "",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        <label
          htmlFor={inputId}
          className="text-xs font-medium tracking-wide text-neutral-700 select-none flex items-center justify-between"
        >
          <span>{label}</span>
          {helperText && (
            <span className="text-[11px] font-normal text-neutral-400">{helperText}</span>
          )}
        </label>

        <div className="relative group">
          {leftIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-800 transition-colors pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={inputType}
            className={`
              w-full h-11 bg-white text-neutral-900 text-sm rounded-xl
              border border-neutral-200/90
              ${leftIcon ? "pl-10" : "pl-3.5"}
              ${isPassword ? "pr-11" : "pr-3.5"}
              placeholder:text-neutral-400 placeholder:text-sm
              shadow-[0_1px_2px_rgba(0,0,0,0.02)]
              transition-all duration-200 ease-out
              hover:border-neutral-300
              focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/[0.04]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-red-500/80 focus:border-red-600 focus:ring-red-500/10" : ""}
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100/60 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-300"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs text-red-600 font-medium pl-1 animate-in fade-in slide-in-from-top-1 duration-150">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

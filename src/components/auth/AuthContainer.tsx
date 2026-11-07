"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntroOverlay } from "@/components/auth/IntroOverlay";
import { BrandLogo } from "@/components/auth/BrandLogo";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { LoginForm } from "@/components/auth/LoginForm";
import { VisualShowcase } from "@/components/auth/VisualShowcase";
import { AuthMode } from "@/types/auth";

export const AuthContainer: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("register");

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-white flex flex-col overflow-hidden">
      {/* 1. Fullscreen Cinematic Intro Animation ("ようこそ / Seja bem-vindo") */}
      {!introFinished && <IntroOverlay onComplete={handleIntroComplete} />}

      {/* Nome KAGE ampliado e centralizado no centro da página */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <BrandLogo />
      </motion.div>

      {/* 2. Main Page Layout (40% Arte Samurai à Esquerda | 60% Formulário à Direita) */}
      <div className="relative w-full min-h-screen flex flex-col lg:flex-row z-10 bg-white">
        {/* Left Side: Seamless Visual Showcase (40% da página) */}
        <div className="hidden lg:block lg:absolute lg:left-0 lg:top-0 lg:bottom-0 lg:w-[40%] xl:w-[40%] 2xl:w-[40%] h-full z-10 pointer-events-none bg-transparent overflow-visible">
          <VisualShowcase isVisible={introFinished} />
        </div>

        {/* Right Side: Form Section (60% da página) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={introFinished ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative w-full lg:w-[60%] xl:w-[60%] lg:ml-auto min-h-screen flex flex-col justify-between px-6 py-8 sm:px-12 sm:py-10 lg:px-16 xl:px-20 z-20 bg-transparent"
        >
          {/* Top Mode Switcher alinhado à direita */}
          <header className="flex items-center justify-end w-full max-w-[500px] mx-auto lg:max-w-none">
            {/* Quick Mode Switch Pills */}
            <div className="flex items-center bg-neutral-100/80 p-1 rounded-xl text-xs font-medium text-neutral-600">
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  authMode === "register"
                    ? "bg-white text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.06)] font-semibold"
                    : "hover:text-neutral-900"
                }`}
              >
                Cadastro
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  authMode === "login"
                    ? "bg-white text-neutral-900 shadow-[0_1px_3px_rgba(0,0,0,0.06)] font-semibold"
                    : "hover:text-neutral-900"
                }`}
              >
                Login
              </button>
            </div>
          </header>

          {/* Central Form Container - Centralizado com elegância na área de 70% */}
          <div className="my-auto py-8 lg:py-10 mx-auto w-full max-w-[440px]">
            <AnimatePresence mode="wait">
              {authMode === "register" ? (
                <motion.div
                  key="register-flow"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
                </motion.div>
              ) : (
                <motion.div
                  key="login-flow"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <LoginForm onSwitchToRegister={() => setAuthMode("register")} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Mobile / Tablet ambient view */}
        <div className="block lg:hidden absolute top-0 inset-x-0 h-72 overflow-hidden pointer-events-none z-0 opacity-20 flex items-start justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/samurai-final.jpg?v=5"
            alt="Arte Minimalista Samurai"
            className="w-auto h-full max-h-72 object-contain mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
        </div>
      </div>
    </main>
  );
};

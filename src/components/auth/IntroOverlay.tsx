"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroOverlayProps {
  onComplete: () => void;
}

const JAPANESE_CHARS = ["よ", "う", "こ", "そ"];
// Timings para cada caractere de 「ようこそ」 surgir progressivamente
const CHAR_TIMINGS = [400, 620, 840, 1060];

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const [revealedChars, setRevealedChars] = useState<number>(0);
  const [showSubtitle, setShowSubtitle] = useState<boolean>(false);
  const [phase, setPhase] = useState<"intro" | "parting" | "done">("intro");

  useEffect(() => {
    // ETAPA 1 (0.0s - 0.4s): Tela branca limpa e única

    // ETAPA 2 (0.4s - 1.1s): Revelação de 「ようこそ」
    const charTimers = CHAR_TIMINGS.map((delay, index) =>
      setTimeout(() => {
        setRevealedChars(index + 1);
      }, delay)
    );

    // ETAPA 3 (1.2s): Surgimento de "SEJA BEM-VINDO"
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1200);

    // ETAPA 4 (1.8s): Abertura limpa da tela sem linha cortante no centro
    const partTimer = setTimeout(() => {
      setPhase("parting");
      onComplete(); // Revela a página principal da KAGE
    }, 1800);

    // ETAPA 5 (2.4s): Conclusão total e desmonte
    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 2400);

    // Fallback de segurança (2.7s)
    const fallbackTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 2700);

    return () => {
      charTimers.forEach(clearTimeout);
      clearTimeout(subtitleTimer);
      clearTimeout(partTimer);
      clearTimeout(doneTimer);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  // Conteúdo visual centralizado (apenas 「ようこそ」 e "SEJA BEM-VINDO")
  const IntroContent = () => (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-center px-6">
      {/* 1. 「ようこそ」 */}
      <div className="flex items-center justify-center font-japanese-brush text-5xl md:text-7xl font-bold text-neutral-950 tracking-[0.24em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.03)] select-none">
        {JAPANESE_CHARS.map((char, index) => {
          const isShown = revealedChars > index;
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(8px)", y: -3 }}
              animate={
                isShown
                  ? { opacity: 1, filter: "blur(0px)", y: 0 }
                  : { opacity: 0, filter: "blur(8px)", y: -3 }
              }
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block will-change-transform"
            >
              {char}
            </motion.span>
          );
        })}
      </div>

      {/* 2. "SEJA BEM-VINDO" */}
      <motion.p
        initial={{ opacity: 0, filter: "blur(6px)", y: 6 }}
        animate={
          showSubtitle
            ? { opacity: 1, filter: "blur(0px)", y: 0 }
            : { opacity: 0, filter: "blur(6px)", y: 6 }
        }
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3.5 text-xs md:text-sm tracking-[0.38em] uppercase text-neutral-500 font-medium font-sans select-none"
      >
        Seja bem-vindo
      </motion.p>
    </div>
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden">
        {/* FASE 1: TELA ÚNICA CONTÍNUA (sem divisão, sem linhas) */}
        {phase === "intro" && (
          <div className="absolute inset-0 bg-white flex items-center justify-center z-30">
            <IntroContent />
          </div>
        )}

        {/* FASE 2: ABERTURA LIMPA EM DUAS METADES (sem feixe luminoso cortante) */}
        {phase === "parting" && (
          <>
            {/* Metade Esquerda abrindo para a esquerda */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 0.58,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-white z-20"
            >
              <div className="absolute inset-y-0 left-0 w-screen h-full pointer-events-none">
                <IntroContent />
              </div>
            </motion.div>

            {/* Metade Direita abrindo para a direita */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              transition={{
                duration: 0.58,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-white z-20"
            >
              <div className="absolute inset-y-0 right-0 w-screen h-full pointer-events-none">
                <IntroContent />
              </div>
            </motion.div>
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

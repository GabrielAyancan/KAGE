"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface JapaneseCalligraphyProps {
  isVisible: boolean;
}

const CHARACTERS = ["死", "に", "対", "す", "る", "勝", "利"];

// Timings naturais de pincelada
const STROKE_DELAYS = [0, 200, 420, 640, 880, 1120, 1380];

export const JapaneseCalligraphy: React.FC<JapaneseCalligraphyProps> = ({ isVisible }) => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [isCursorVisible, setIsCursorVisible] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isVisible) return;

    const startTimer = setTimeout(() => {
      setIsCursorVisible(true);

      STROKE_DELAYS.forEach((delay, index) => {
        setTimeout(() => {
          setRevealedCount(index + 1);

          if (index === CHARACTERS.length - 1) {
            setTimeout(() => {
              setIsCursorVisible(false);
              setIsCompleted(true);
            }, 1800);
          }
        }, delay);
      });
    }, 400);

    return () => clearTimeout(startTimer);
  }, [isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={
        isVisible
          ? {
              // Cor e presença com nitidez artística
              opacity: isCompleted ? 0.30 : 0.50,
            }
          : { opacity: 0 }
      }
      transition={{ duration: 1.2, ease: "easeInOut" }}
      // Deslocado mais para a direita para atravessar a cabeça e emergir com "勝利" do outro lado
      className="absolute top-[28%] lg:top-[30%] xl:top-[32%] left-10 sm:left-16 lg:left-24 xl:left-32 pointer-events-none select-none z-0 whitespace-nowrap"
    >
      {/* 
        Container com posição absoluta para o cursor: 
        impede qualquer deslocamento de pixel quando o cursor aparece ou desaparece 
      */}
      <div className="relative inline-flex items-center text-black font-japanese-brush text-3xl sm:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-[0.24em] lg:tracking-[0.28em]">
        {CHARACTERS.map((char, index) => {
          const isShown = revealedCount > index;
          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={
                isShown
                  ? { opacity: 1, filter: "blur(0px)" }
                  : { opacity: 0, filter: "blur(6px)" }
              }
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          );
        })}

        {/* Cursor discreto absoluto */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 pl-2 flex items-center pointer-events-none">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{
              opacity: isCursorVisible ? [0, 1, 0] : 0,
            }}
            transition={{
              duration: 0.75,
              repeat: isCursorVisible ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="inline-block w-[3px] h-[0.75em] bg-black rounded-full"
            aria-hidden="true"
          />
        </div>
      </div>
    </motion.div>
  );
};

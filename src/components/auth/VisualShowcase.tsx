"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { JapaneseCalligraphy } from "@/components/auth/JapaneseCalligraphy";

interface VisualShowcaseProps {
  isVisible: boolean;
}

// Configuração refinada de pétalas discretas de sakura
interface PetalConfig {
  id: number;
  startX: number;
  startY: number;
  scale: number;
  duration: number;
  delay: number;
  sway: number;
}

const SAKURA_PETALS: PetalConfig[] = [
  // Lote 1 - Próximas ao ombro e peito (onde estão as flores)
  { id: 1, startX: 52, startY: 26, scale: 0.95, duration: 8.5, delay: 0.2, sway: 28 },
  { id: 2, startX: 58, startY: 22, scale: 0.75, duration: 9.8, delay: 0.9, sway: -24 },
  { id: 3, startX: 47, startY: 30, scale: 1.1, duration: 8.0, delay: 1.6, sway: 34 },
  { id: 4, startX: 63, startY: 24, scale: 0.65, duration: 11.0, delay: 2.3, sway: -18 },

  // Lote 2 - Surgindo na altura do capacete e descendo
  { id: 5, startX: 68, startY: 16, scale: 0.85, duration: 10.2, delay: 3.0, sway: -30 },
  { id: 6, startX: 42, startY: 18, scale: 0.9, duration: 9.2, delay: 3.7, sway: 26 },
  { id: 7, startX: 54, startY: 14, scale: 0.6, duration: 11.5, delay: 4.4, sway: -22 },

  // Lote 3 - Atravessando suavemente em direção à região central
  { id: 8, startX: 38, startY: 28, scale: 0.8, duration: 10.0, delay: 5.1, sway: 44 },
  { id: 9, startX: 34, startY: 34, scale: 0.7, duration: 11.2, delay: 5.8, sway: 50 },
  { id: 10, startX: 46, startY: 36, scale: 1.0, duration: 8.8, delay: 6.4, sway: 36 },

  // Lote 4 - Zona média com profundidades variadas
  { id: 11, startX: 66, startY: 32, scale: 0.75, duration: 9.6, delay: 7.1, sway: 30 },
  { id: 12, startX: 74, startY: 28, scale: 0.55, duration: 12.0, delay: 7.7, sway: -20 },
  { id: 13, startX: 50, startY: 20, scale: 1.15, duration: 8.2, delay: 8.3, sway: 36 },

  // Lote 5 - Preenchimento contínuo para fluxo ininterrupto de pétalas
  { id: 14, startX: 60, startY: 35, scale: 0.7, duration: 10.4, delay: 9.0, sway: -26 },
  { id: 15, startX: 44, startY: 25, scale: 0.85, duration: 9.0, delay: 9.6, sway: 28 },
  { id: 16, startX: 56, startY: 18, scale: 0.6, duration: 11.8, delay: 10.3, sway: -16 },
  { id: 17, startX: 36, startY: 22, scale: 0.9, duration: 9.5, delay: 11.0, sway: 40 },
  { id: 18, startX: 70, startY: 36, scale: 0.8, duration: 10.8, delay: 11.7, sway: 22 },
];

export const VisualShowcase: React.FC<VisualShowcaseProps> = ({ isVisible }) => {
  // PARALLAX SUAVE COM O MOUSE
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { damping: 32, stiffness: 90, mass: 0.6 };

  const samuraiParallaxX = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  const samuraiParallaxY = useSpring(useTransform(rawMouseY, [-0.5, 0.5], [-4, 4]), springConfig);

  const calligraphyParallaxX = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [-3, 3]), springConfig);
  const calligraphyParallaxY = useSpring(useTransform(rawMouseY, [-0.5, 0.5], [-2.5, 2.5]), springConfig);

  const mistParallaxX = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  const petalsParallaxX = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      rawMouseX.set(nx);
      rawMouseY.set(ny);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [rawMouseX, rawMouseY]);

  return (
    <div
      className="relative w-full h-full overflow-y-hidden overflow-x-visible pointer-events-none select-none bg-transparent"
      aria-hidden="true"
    >
      {/* 
        Container mestre do Samurai posicionado no lado ESQUERDO:
        - Mantém a escala, altura e caligrafia com overflow visível
      */}
      <div className="relative w-full h-full flex justify-start pl-2 sm:pl-4 lg:pl-6 xl:pl-8 overflow-y-hidden overflow-x-visible">
        {/* 
          Samurai em grande escala no lado esquerdo com entrada cinematográfica
        */}
        <motion.div
          initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
          animate={
            isVisible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 22, filter: "blur(5px)" }
          }
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{ x: samuraiParallaxX, y: samuraiParallaxY }}
          className="relative w-auto h-[124vh] -mt-[14vh] flex items-start justify-start"
        >
          {/* Caligrafia Japonesa Tradicional de Background (死に対する勝利) */}
          <motion.div
            style={{ x: calligraphyParallaxX, y: calligraphyParallaxY }}
            className="absolute inset-0 pointer-events-none z-0 overflow-visible"
          >
            <JapaneseCalligraphy isVisible={isVisible} />
          </motion.div>

          {/* Imagem do Samurai */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/samurai-tall.jpg?v=12"
            alt="Arte Conceitual Samurai"
            className="relative z-10 w-auto h-full max-w-none object-contain mix-blend-multiply"
            loading="eager"
          />

          {/* Pétalas de Sakura */}
          <motion.div
            style={{ x: petalsParallaxX }}
            className="absolute inset-0 pointer-events-none overflow-hidden z-20"
          >
            {SAKURA_PETALS.map((petal) => (
              <motion.div
                key={petal.id}
                initial={{
                  top: `${petal.startY}%`,
                  left: `${petal.startX}%`,
                  opacity: 0,
                  rotate: 0,
                  rotateX: 0,
                }}
                animate={
                  isVisible
                    ? {
                        top: [`${petal.startY}%`, `${petal.startY + 48}%`],
                        x: [0, petal.sway, -petal.sway * 0.4, petal.sway * 0.8],
                        opacity: [0, 0.7, 0.7, 0],
                        rotate: [-15, 35, -20, 25],
                        rotateX: [0, 180, 360],
                      }
                    : { opacity: 0 }
                }
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-3 h-3 flex items-center justify-center will-change-transform"
                style={{ transform: `scale(${petal.scale})` }}
              >
                <svg viewBox="0 0 20 20" className="w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <path
                    d="M10 1 C6 5, 4 11, 10 18 C16 11, 14 5, 10 1 Z"
                    fill="rgba(253, 240, 244, 0.82)"
                    stroke="rgba(240, 220, 226, 0.4)"
                    strokeWidth="0.6"
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

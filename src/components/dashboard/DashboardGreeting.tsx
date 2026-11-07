"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface DashboardGreetingProps {
  initialName: string;
  initialEmail?: string | null;
  initialImage?: string | null;
}

export function DashboardGreeting({
  initialName,
  initialEmail,
  initialImage,
}: DashboardGreetingProps) {
  const [userName, setUserName] = useState(initialName);
  const [userEmail, setUserEmail] = useState(initialEmail);
  const [userImage, setUserImage] = useState(initialImage);

  useEffect(() => {
    async function loadSupabaseUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const meta = user.user_metadata;
          const firstName = meta?.first_name || meta?.name || "";
          const lastName = meta?.last_name || "";
          const fullName = `${firstName} ${lastName}`.trim();

          if (fullName) {
            setUserName(fullName);
          } else if (user.email) {
            setUserName(user.email.split("@")[0]);
          }

          if (user.email && !userEmail) {
            setUserEmail(user.email);
          }

          if (meta?.avatar_url && !userImage) {
            setUserImage(meta.avatar_url);
          }
        }
      } catch (err) {
        console.error("Erro ao verificar sessão Supabase:", err);
      }
    }

    loadSupabaseUser();
  }, [userEmail, userImage]);

  return (
    <>
      {/* User Avatar / Monogram */}
      <div className="mb-8 relative group">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center justify-center overflow-hidden">
          {userImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={userImage}
              alt={userName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-neutral-950 text-white flex items-center justify-center font-japanese-brush text-3xl font-bold">
              影
            </div>
          )}
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-neutral-900 text-[10px] uppercase tracking-widest text-neutral-200 font-medium whitespace-nowrap shadow-sm">
          Membro
        </div>
      </div>

      {/* Welcome Phrase */}
      <h1 className="text-2xl sm:text-4xl md:text-[2.6rem] font-semibold tracking-tight text-neutral-950 leading-[1.25]">
        Seja bem-vindo ao KAGE,{" "}
        <span className="font-bold underline decoration-neutral-300 decoration-1 underline-offset-4">
          {userName}
        </span>
        .
      </h1>

      <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light tracking-wide max-w-md">
        Sua jornada começa agora.
      </p>

      {userEmail && (
        <p className="mt-2 text-xs text-neutral-400 font-mono tracking-wider">
          {userEmail}
        </p>
      )}
    </>
  );
}

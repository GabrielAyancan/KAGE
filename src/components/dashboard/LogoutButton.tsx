"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { LogOut, Loader2 } from "lucide-react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore fallback
    }
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      aria-label="Sair da conta"
      className="
        group relative inline-flex items-center justify-center gap-2.5
        h-11 px-7 rounded-xl
        bg-neutral-950 text-white text-xs font-medium uppercase tracking-[0.24em]
        border border-neutral-900
        hover:bg-neutral-800 hover:border-neutral-800
        active:scale-[0.985] transition-all duration-200
        shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.14)]
        cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed
      "
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Saindo...</span>
        </>
      ) : (
        <>
          <LogOut className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span>Sair</span>
        </>
      )}
    </button>
  );
}

import { Suspense } from "react";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { DashboardGreeting } from "@/components/dashboard/DashboardGreeting";
import { DashboardVideoBg } from "@/components/dashboard/DashboardVideoBg";

export const metadata = {
  title: "KAGE 影 | Painel",
  description: "Área exclusiva KAGE de alta performance.",
};

async function DashboardUserSection() {
  const session = await auth();
  const userName = session?.user?.name?.trim() || "Guerreiro";
  const userEmail = session?.user?.email;
  const userImage = session?.user?.image;

  return (
    <DashboardGreeting
      initialName={userName}
      initialEmail={userEmail}
      initialImage={userImage}
    />
  );
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-100 mb-8" />
      <div className="h-9 w-64 bg-neutral-100 rounded-lg mb-4" />
      <div className="h-5 w-48 bg-neutral-100 rounded-md" />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen w-full bg-white text-neutral-900 flex flex-col justify-between items-center px-6 py-10 sm:py-14 overflow-hidden selection:bg-neutral-950 selection:text-white">
      {/* Background Samurai Animated Video (Single Play - No Loop) */}
      <DashboardVideoBg />

      {/* Top Header - Centered KAGE Logo */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-bold tracking-[0.32em] text-neutral-950 uppercase select-none leading-none">
            KAGE
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.22em] text-neutral-400 mt-1.5 uppercase select-none">
            影 • SILÊNCIO & FORÇA
          </span>
        </div>
      </header>

      {/* Central Content */}
      <section className="relative z-10 my-auto w-full max-w-xl mx-auto flex flex-col items-center text-center px-4 py-8">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardUserSection />
        </Suspense>

        {/* Japanese Brush Quote */}
        <div className="mt-8 flex items-center gap-3 text-neutral-400">
          <div className="h-[1px] w-8 bg-neutral-200" />
          <span className="font-japanese-brush text-sm tracking-widest text-neutral-400 select-none">
            死に対する勝利
          </span>
          <div className="h-[1px] w-8 bg-neutral-200" />
        </div>

        {/* Action Button: Minimalist Logout */}
        <div className="mt-10">
          <LogoutButton />
        </div>
      </section>

      {/* Footer Details */}
      <footer className="relative z-10 w-full max-w-5xl flex items-center justify-center text-[11px] text-neutral-400 tracking-[0.2em] uppercase select-none">
        <span>KAGE • Disciplina &bull; Precisão &bull; Domínio</span>
      </footer>
    </main>
  );
}

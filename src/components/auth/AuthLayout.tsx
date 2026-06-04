import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { type ReactNode } from "react";
import { AuthHero } from "./AuthHero";

const flow = ["Script", "Character", "Wardrobe", "Set", "Scene", "Video"];

export function AuthLayout({
  children,
  side = "right",
}: {
  children: ReactNode;
  side?: "right";
}) {
  void side;
  return (
    <main className="bg-background text-foreground relative min-h-dvh overflow-hidden">
      {/* Back to home (always reachable, never hidden) */}
      <Link
        to="/"
        className="glass text-muted-foreground hover:text-foreground absolute top-4 left-4 z-30 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back home
      </Link>

      <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[55fr_45fr]">
        {/* HERO SIDE */}
        <section
          aria-hidden={false}
          className="bg-hero text-primary-foreground relative isolate flex h-[30dvh] flex-col justify-end overflow-hidden p-6 sm:p-10 lg:h-auto lg:min-h-dvh lg:justify-between lg:p-14"
        >
          {/* 3D scene */}
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-95">
            <AuthHero />
          </div>
          <div className="bg-noise pointer-events-none absolute inset-0 -z-0 opacity-30" />
          <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />

          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 hidden items-center gap-2 lg:flex"
          >
            <span className="glass flex h-9 w-9 items-center justify-center rounded-full text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <div className="font-display text-sm font-semibold">AIS</div>
              <div className="text-[10px] tracking-widest text-white/70 uppercase">
                Creative Production OS
              </div>
            </div>
          </motion.div>

          {/* Headline overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-xl"
          >
            <h1 className="font-display text-2xl leading-[1.05] font-semibold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              Create production-ready content
              <span className="block text-gradient-light">from script to screen.</span>
            </h1>
            <p className="mt-3 hidden max-w-md text-sm text-white/75 sm:text-base lg:block">
              An AI-native creative production workspace for scene planning, asset
              generation, review workflows and editor handoff.
            </p>

            {/* Production flow chips */}
            <div className="mt-6 hidden flex-wrap items-center gap-1.5 lg:flex">
              {flow.map((step, i) => (
                <div key={step} className="flex items-center gap-1.5">
                  <span className="glass rounded-full px-2.5 py-1 text-[11px] text-white/90">
                    {step}
                  </span>
                  {i < flow.length - 1 && (
                    <span className="h-px w-3 bg-white/30" aria-hidden />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* AUTH SIDE */}
        <section className="relative flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="bg-aurora absolute inset-0 -z-10 opacity-30" />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong shadow-elegant w-full max-w-md rounded-[2rem] p-7 sm:p-9"
          >
            {children}
          </motion.div>
        </section>
      </div>
    </main>
  );
}

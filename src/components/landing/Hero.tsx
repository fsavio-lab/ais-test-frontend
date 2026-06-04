import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroScene } from "./HeroScene";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
      {/* Backdrop */}
      <div className="bg-aurora absolute inset-0 -z-10" aria-hidden />
      <div className="grid-lines absolute inset-0 -z-10 opacity-50" aria-hidden />
      <div className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.35]" aria-hidden />

      {/* 3D scene layer */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-90">
        <HeroScene />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6">
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={fade}
          className="glass mx-auto mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-medium tracking-wide uppercase text-muted-foreground">
            Now in private beta · v0.9
          </span>
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fade}
          className="font-display mx-auto max-w-4xl text-[2.5rem] leading-[1.05] font-semibold tracking-tight sm:text-6xl lg:text-7xl"
        >
          The operating system for{" "}
          <span className="text-gradient">AI-native</span> creative production.
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          From script to scene to screen — orchestrate characters, sets, props and shots
          with cinematic AI workflows your producers, designers and editors actually love.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button variant="hero" size="lg" className="group rounded-full">
            Request early access
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button variant="glass" size="lg" className="group rounded-full">
            <Play className="mr-1 h-4 w-4 fill-current" />
            Watch the film
          </Button>
        </motion.div>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fade}
          className="text-muted-foreground mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs tracking-widest uppercase"
        >
          <span>Built for studios</span>
          <span className="opacity-30">●</span>
          <span>Agency-grade governance</span>
          <span className="opacity-30">●</span>
          <span>Real-time collaboration</span>
          <span className="opacity-30">●</span>
          <span>SOC2 ready</span>
        </motion.div>
      </div>

      {/* Floating preview chip */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto mt-16 hidden max-w-5xl px-4 sm:mt-20 sm:px-6 md:block"
      >
        <div className="glass-strong shadow-elegant relative overflow-hidden rounded-3xl p-2">
          <div className="bg-hero relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_50%)]" />
            <div className="absolute inset-0 grid grid-cols-12 gap-3 p-6">
              <div className="glass col-span-3 rounded-xl p-3">
                <div className="text-[10px] tracking-widest text-white/60 uppercase">
                  Project
                </div>
                <div className="font-display mt-2 text-sm text-white">Nova Campaign</div>
                <div className="mt-3 space-y-2">
                  {["Bible", "Knowledge", "Script", "Scenes", "Design"].map((s) => (
                    <div
                      key={s}
                      className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5 text-[11px] text-white/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-6 grid grid-cols-2 grid-rows-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="glass relative overflow-hidden rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, rgba(0,100,102,${
                        0.25 + i * 0.08
                      }), rgba(77,25,77,${0.15 + i * 0.1}))`,
                    }}
                  >
                    <div className="absolute inset-x-2 bottom-2 flex items-center justify-between text-[10px] text-white/80">
                      <span>Scene {i.toString().padStart(2, "0")}</span>
                      <span className="rounded-full bg-white/10 px-1.5 py-0.5">Approved</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass col-span-3 rounded-xl p-3">
                <div className="text-[10px] tracking-widest text-white/60 uppercase">
                  AI Assistant
                </div>
                <div className="mt-3 space-y-2">
                  <div className="rounded-lg bg-white/10 p-2 text-[11px] text-white/90">
                    Generating wardrobe variants for Aria…
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="animate-shimmer h-full w-1/2 rounded-full" />
                  </div>
                  <div className="text-[10px] text-white/60">3 of 6 complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

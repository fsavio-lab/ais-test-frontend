import { motion } from "framer-motion";
import { Box, MousePointer2, Sparkles } from "lucide-react";

export function Studio() {
  return (
    <section id="studio" className="relative py-28 sm:py-36">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            Scene Builder
          </span>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            A canvas that thinks in <span className="text-gradient">shots</span>.
          </h2>
          <p className="text-muted-foreground mt-5 text-base leading-relaxed">
            Drag characters, props and sets onto a real-time interactive canvas.
            Compose framing, light and depth — then export storyboards, keyframes
            and ready-to-render video prompts in a single move.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              {
                icon: MousePointer2,
                t: "Live multiplayer",
                d: "Cursors, selections and comments — Figma-class presence.",
              },
              {
                icon: Box,
                t: "3D-ready architecture",
                d: "GLB, GLTF, USDZ. Future-proof for spatial workflows.",
              },
              {
                icon: Sparkles,
                t: "AI co-director",
                d: "Camera, lighting and composition suggestions in context.",
              },
            ].map((it) => (
              <li key={it.t} className="flex gap-4">
                <div className="bg-secondary text-secondary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <it.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-display text-sm font-semibold">{it.t}</div>
                  <p className="text-muted-foreground text-sm">{it.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="glass-strong shadow-elegant relative aspect-square overflow-hidden rounded-3xl p-3">
            <div
              className="relative h-full w-full overflow-hidden rounded-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, #006466 0%, #0b525b 35%, #272640 70%, #4d194d 100%)",
              }}
            >
              <div className="grid-lines absolute inset-0 opacity-30" />
              {/* Floating asset chips */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute top-10 left-8 w-44 rounded-xl p-3"
              >
                <div className="text-[10px] tracking-widest text-white/60 uppercase">
                  Character
                </div>
                <div className="font-display mt-1 text-sm text-white">Aria · v04</div>
                <div className="bg-hero mt-2 h-16 w-full rounded-md opacity-90" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute top-24 right-6 w-40 rounded-xl p-3"
              >
                <div className="text-[10px] tracking-widest text-white/60 uppercase">
                  Set
                </div>
                <div className="font-display mt-1 text-sm text-white">Rooftop · Dusk</div>
                <div className="mt-2 h-16 w-full rounded-md bg-gradient-to-br from-[#3e1f47] to-[#4d194d]" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute bottom-10 left-12 w-48 rounded-xl p-3"
              >
                <div className="text-[10px] tracking-widest text-white/60 uppercase">
                  Shot
                </div>
                <div className="font-display mt-1 text-sm text-white">Close-up · 35mm</div>
                <div className="mt-2 flex gap-1.5">
                  <div className="h-10 flex-1 rounded bg-white/10" />
                  <div className="h-10 flex-1 rounded bg-white/20" />
                  <div className="h-10 flex-1 rounded bg-white/10" />
                </div>
              </motion.div>

              {/* Cursor */}
              <motion.div
                animate={{ x: [40, 220, 120, 40], y: [60, 180, 280, 60] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute"
              >
                <MousePointer2 className="h-4 w-4 text-white" fill="white" />
                <span className="font-display ml-2 rounded-md bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
                  Maya
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

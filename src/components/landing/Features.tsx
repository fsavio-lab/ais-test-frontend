import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Clapperboard,
  Film,
  Layers,
  Palette,
  Sparkles,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Creative Bible",
    desc: "Visual DNA, art direction, characters and cinematic rules — the canon for every shot.",
  },
  {
    icon: Brain,
    title: "Knowledge Base",
    desc: "Semantic memory across PDFs, refs and video — every prompt grounded in your project.",
  },
  {
    icon: Sparkles,
    title: "Script Intelligence",
    desc: "Auto-extract scenes, characters, props and shot suggestions the moment a script lands.",
  },
  {
    icon: Layers,
    title: "Scene Studio",
    desc: "Break down dependencies, readiness and production plan with surgical clarity.",
  },
  {
    icon: Palette,
    title: "Design Studio",
    desc: "Generate characters, wardrobes, props and sets with workflow-based version history.",
  },
  {
    icon: Clapperboard,
    title: "Scene Builder",
    desc: "Drag, rotate, light and compose scenes on an interactive 3D-ready canvas.",
  },
  {
    icon: Film,
    title: "Video Studio",
    desc: "Storyboard-to-video with prompt refinement and side-by-side preview players.",
  },
  {
    icon: Workflow,
    title: "Review & Handoff",
    desc: "Approval queues, governance, editorial notes and a clean handoff to post.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            One platform · End-to-end
          </span>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything between the <span className="text-gradient">idea</span> and the
            <span className="text-gradient"> edit</span>.
          </h2>
          <p className="text-muted-foreground mt-4 text-base">
            Eight tightly-integrated surfaces, designed to replace a Frankenstein of
            tabs, plugins and ad-hoc prompts.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group glass relative overflow-hidden rounded-2xl p-6 transition-all hover:shadow-glow"
            >
              <div className="bg-hero absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />
              <div className="bg-secondary text-secondary-foreground relative mb-5 flex h-10 w-10 items-center justify-center rounded-xl">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

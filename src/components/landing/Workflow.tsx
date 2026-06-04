import { motion } from "framer-motion";

const stages = [
  { n: "01", t: "Brief", d: "Spin up a project with team, roles and creative bible." },
  { n: "02", t: "Script", d: "Drop a script — characters, scenes and props extracted." },
  { n: "03", t: "Design", d: "Generate characters, wardrobes, props and references." },
  { n: "04", t: "Scene", d: "Compose scenes on an interactive cinematic canvas." },
  { n: "05", t: "Video", d: "Storyboards and shots rendered into motion." },
  { n: "06", t: "Handoff", d: "Approve, version, deliver — straight to the editor." },
];

export function Workflow() {
  return (
    <section id="workflow" className="relative overflow-hidden py-28 sm:py-36">
      <div className="bg-aurora absolute inset-0 -z-10 opacity-40" aria-hidden />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            The Production Loop
          </span>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            A pipeline that <span className="text-gradient">moves like cinema</span>.
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="bg-border absolute top-10 right-6 left-6 hidden h-px md:block" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            {stages.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative"
              >
                <div className="bg-card border-border relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border shadow-elegant">
                  <span className="font-display text-sm font-semibold text-primary">
                    {s.n}
                  </span>
                </div>
                <div className="text-center">
                  <div className="font-display text-base font-semibold">{s.t}</div>
                  <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">
                    {s.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

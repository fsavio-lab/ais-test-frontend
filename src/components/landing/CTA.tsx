import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative px-6 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="bg-hero shadow-elegant relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-8 py-20 text-center sm:px-16 sm:py-28"
      >
        <div className="bg-noise absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="relative">
          <h2 className="font-display text-primary-foreground mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Make the next great thing — <span className="text-gradient-light">together</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            Join the studios pioneering AI-native production. Early access closes soon.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button variant="glass" size="lg" className="group rounded-full">
              Request early access
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full text-white hover:bg-white/10 hover:text-white"
            >
              Book a demo
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

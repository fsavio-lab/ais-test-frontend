import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Studio",
    price: "$49",
    cadence: "/seat / month",
    desc: "For small creative teams getting AI into the pipeline.",
    features: ["Up to 10 seats", "5 active projects", "Design + Scene Studio", "Community support"],
    cta: "Start trial",
    featured: false,
  },
  {
    name: "Production",
    price: "$129",
    cadence: "/seat / month",
    desc: "Cinematic-grade collaboration for serious production teams.",
    features: [
      "Unlimited projects",
      "Real-time multiplayer",
      "Video Studio + Review",
      "Roles & governance",
      "Priority support",
    ],
    cta: "Get Production",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "",
    desc: "Self-hosted, SSO, and bespoke integrations for studios at scale.",
    features: ["SSO / SCIM", "Custom AI models", "Dedicated CSM", "On-prem option"],
    cta: "Talk to sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-muted-foreground text-xs tracking-widest uppercase">
            Pricing
          </span>
          <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Built for the way <span className="text-gradient">studios scale</span>.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.featured
                  ? "bg-hero text-primary-foreground shadow-elegant"
                  : "glass"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold tracking-widest text-primary uppercase">
                  Most loved
                </div>
              )}
              <div className="font-display text-lg font-semibold">{t.name}</div>
              <p
                className={`mt-1.5 text-sm ${
                  t.featured ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                {t.desc}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-semibold tracking-tight">
                  {t.price}
                </span>
                <span className={t.featured ? "text-white/70" : "text-muted-foreground"}>
                  {t.cadence}
                </span>
              </div>
              <ul className="mt-7 flex-1 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        t.featured ? "text-white" : "text-primary"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={t.featured ? "glass" : "hero"}
                className="mt-8 w-full rounded-full"
              >
                {t.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

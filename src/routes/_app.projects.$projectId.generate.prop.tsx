import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Check,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { useState } from "react";
import { Topbar } from "@/components/app/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/projects/$projectId/generate/prop")({
  head: () => ({ meta: [{ title: "Generate Prop · AIS" }] }),
  component: GeneratePropPage,
});

const STEPS = [
  { key: "definition", label: "Definition", hint: "Name, category & environment" },
  { key: "visual", label: "Visual", hint: "Style, material, color, scale" },
  { key: "review", label: "Review & Generate", hint: "Preview & settings" },
  { key: "success", label: "Success", hint: "Use, regenerate or repeat" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const PALETTES = [
  { name: "Cyber Noir", colors: ["#0d0d0d", "#1a1a1a", "#c9a84c"] },
  { name: "Neo Tokyo", colors: ["#006466", "#3e1f47", "#4d194d"] },
  { name: "Brutalist", colors: ["#dce5d4", "#a8c0a0", "#2d2d2d"] },
  { name: "Velvet", colors: ["#0b525b", "#4d194d", "#e94560"] },
];

function GeneratePropPage() {
  const { projectId } = Route.useParams();
  const [step, setStep] = useState<StepKey>("definition");
  const idx = STEPS.findIndex((s) => s.key === step);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "Tech",
    environment: "Studio",
    style: "Cinematic",
    material: "Brushed metal",
    palette: PALETTES[0].name,
    scale: "Hero",
    quality: "High",
    seed: "auto",
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const next = () => setStep(STEPS[Math.min(idx + 1, STEPS.length - 1)].key);
  const prev = () => setStep(STEPS[Math.max(idx - 1, 0)].key);

  return (
    <>
      <Topbar
        breadcrumbs={
          <>
            <Link to="/projects/$projectId/design" params={{ projectId }} className="hover:text-foreground transition-colors">Design Studio</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Generate prop</span>
          </>
        }
        actions={
          <Button variant="ghost" size="sm" className="rounded-xl" asChild>
            <Link to="/projects/$projectId/design" params={{ projectId }}>
              <X className="h-4 w-4" /> Cancel
            </Link>
          </Button>
        }
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="text-muted-foreground mb-3 text-[10px] tracking-[0.18em] uppercase">Prop generation</div>
          <ol className="space-y-1">
            {STEPS.map((s, i) => {
              const done = i < idx;
              const active = i === idx;
              return (
                <li key={s.key}>
                  <button
                    onClick={() => i <= idx && setStep(s.key)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                      active && "bg-card border-border border shadow-sm",
                      !active && "hover:bg-accent/40",
                      i > idx && "cursor-not-allowed opacity-60",
                    )}
                  >
                    <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                      done && "bg-emerald-500/20 text-emerald-600",
                      active && "bg-hero text-primary-foreground",
                      !done && !active && "bg-muted text-muted-foreground")}>
                      {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{s.label}</div>
                      <div className="text-muted-foreground truncate text-[11px]">{s.hint}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        <section className="glass-strong shadow-elegant relative overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-40" />
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
              {step === "definition" && (
                <div className="space-y-5">
                  <Header eyebrow="Step 1 of 4" title="Prop definition" sub="What is it, where does it live in the world." />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" required>
                      <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Hover Bike" className="h-11 rounded-xl" />
                    </Field>
                    <Field label="Category">
                      <Select value={form.category} onValueChange={(v) => set("category", v)}>
                        <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Vehicle", "Tech", "Wardrobe", "Set", "Weapon", "Furniture"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Environment">
                      <Select value={form.environment} onValueChange={(v) => set("environment", v)}>
                        <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Studio", "Interior", "Exterior", "Underwater", "Space"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="A magnetic hover bike with anamorphic underglow and chrome detailing." className="rounded-xl" />
                  </Field>
                </div>
              )}

              {step === "visual" && (
                <div className="space-y-6">
                  <Header eyebrow="Step 2 of 4" title="Visual configuration" sub="Define the material language, palette and scale." />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Style"><Input value={form.style} onChange={(e) => set("style", e.target.value)} className="h-11 rounded-xl" /></Field>
                    <Field label="Material"><Input value={form.material} onChange={(e) => set("material", e.target.value)} className="h-11 rounded-xl" /></Field>
                    <Field label="Scale">
                      <Select value={form.scale} onValueChange={(v) => set("scale", v)}>
                        <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Hero", "Mid", "Background", "Detail"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label="Color palette">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {PALETTES.map((p) => {
                        const active = form.palette === p.name;
                        return (
                          <button key={p.name} onClick={() => set("palette", p.name)} className={cn("group border-border bg-card overflow-hidden rounded-2xl border text-left transition-all", active ? "ring-primary shadow-elegant ring-2" : "hover:border-primary/40")}>
                            <div className="flex h-14">
                              {p.colors.map((c) => <div key={c} className="flex-1" style={{ background: c }} />)}
                            </div>
                            <div className="p-2.5">
                              <div className="text-xs font-medium">{p.name}</div>
                              <div className="text-muted-foreground text-[10px]">{p.colors.length} tones</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                </div>
              )}

              {step === "review" && (
                <div className="space-y-6">
                  <Header eyebrow="Step 3 of 4" title="Review & generate" sub="Confirm and choose generation settings." />
                  <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                    <div className="bg-card border-border space-y-3 rounded-2xl border p-4">
                      {Object.entries({ Name: form.name || "—", Category: form.category, Environment: form.environment, Description: form.description || "—", Style: form.style, Material: form.material, Palette: form.palette, Scale: form.scale }).map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[120px_1fr] gap-3 text-xs">
                          <div className="text-muted-foreground">{k}</div>
                          <div>{v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <Field label="Quality">
                        <Select value={form.quality} onValueChange={(v) => set("quality", v)}>
                          <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {["Draft", "Standard", "High", "Ultra"].map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Seed">
                        <Input value={form.seed} onChange={(e) => set("seed", e.target.value)} className="h-11 rounded-xl" />
                      </Field>
                      <div className="text-muted-foreground flex items-center gap-2 text-[11px]">
                        <Sparkles className="h-3 w-3" /> Generates front, side and perspective variants.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="space-y-6 text-center">
                  <div className="bg-hero text-primary-foreground mx-auto flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Check className="h-7 w-7" />
                  </div>
                  <Header eyebrow="Success" title={`${form.name || "Prop"} is generating`} sub="Variants will appear in Design Studio shortly." />
                  <div className="mx-auto grid max-w-xl grid-cols-3 gap-2">
                    {["from-[#006466] to-[#272640]","from-[#1b3a4b] to-[#3e1f47]","from-[#4d194d] to-[#006466]"].map((g, i) => (
                      <div key={i} className={cn("aspect-square rounded-xl bg-gradient-to-br", g)}>
                        <div className="bg-noise h-full w-full rounded-xl opacity-30" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <Button variant="hero" className="rounded-xl" asChild>
                      <Link to="/projects/$projectId/props/$propId" params={{ projectId, propId: "pr1" }}>
                        <Box className="h-4 w-4" /> View prop
                      </Link>
                    </Button>
                    <Button variant="ghost" className="rounded-xl" onClick={() => { setStep("definition"); setForm((f) => ({ ...f, name: "" })); }}>
                      <RotateCcw className="h-4 w-4" /> Generate another
                    </Button>
                    <Button variant="ghost" className="rounded-xl" asChild>
                      <Link to="/projects/$projectId/design" params={{ projectId }}>Back to Design Studio</Link>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {step !== "success" && (
            <div className="border-border mt-8 flex items-center justify-between border-t pt-5">
              <Button variant="ghost" className="rounded-xl" onClick={prev} disabled={idx === 0}>
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>
              {step === "review" ? (
                <Button variant="hero" className="rounded-xl" onClick={() => setStep("success")}>
                  <Wand2 className="h-4 w-4" /> Generate prop
                </Button>
              ) : (
                <Button variant="hero" className="rounded-xl" onClick={next} disabled={step === "definition" && form.name.trim().length < 2}>
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function Header({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div>
      <div className="text-muted-foreground text-[10px] tracking-[0.18em] uppercase">{eyebrow}</div>
      <h1 className="font-display mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-1 text-sm">{sub}</p>
    </div>
  );
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">
        {label}{required && <span className="text-primary"> *</span>}
      </Label>
      {children}
      {hint && <p className="text-muted-foreground text-[11px]">{hint}</p>}
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  RotateCcw,
  Sparkles,
  Upload,
  Users,
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

export const Route = createFileRoute("/_app/projects/$projectId/generate/character")({
  head: () => ({ meta: [{ title: "Generate Character · AIS" }] }),
  component: GenerateCharacterPage,
});

const STEPS = [
  { key: "concept", label: "Concept", hint: "Name, type & references" },
  { key: "appearance", label: "Appearance", hint: "Face, hair, outfit, pose" },
  { key: "review", label: "Review & Generate", hint: "Preview & settings" },
  { key: "success", label: "Success", hint: "Use, regenerate or repeat" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

function GenerateCharacterPage() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<StepKey>("concept");
  const idx = STEPS.findIndex((s) => s.key === step);

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "Lead",
    refs: [] as string[],
    face: "Soft features",
    hair: "Short black",
    outfit: "Streetwear",
    accessories: "Glasses",
    pose: "Standing, hands in pockets",
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
            <Link to="/projects/$projectId/design" params={{ projectId }} className="hover:text-foreground transition-colors">
              Design Studio
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Generate character</span>
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
          <div className="text-muted-foreground mb-3 text-[10px] tracking-[0.18em] uppercase">
            Character generation
          </div>
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
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                        done && "bg-emerald-500/20 text-emerald-600",
                        active && "bg-hero text-primary-foreground",
                        !done && !active && "bg-muted text-muted-foreground",
                      )}
                    >
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
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === "concept" && (
                <div className="space-y-5">
                  <Header eyebrow="Step 1 of 4" title="Character concept" sub="The foundation. Name, type and reference inspiration." />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Character name" required>
                      <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Detective Arjun" className="h-11 rounded-xl" />
                    </Field>
                    <Field label="Character type">
                      <Select value={form.type} onValueChange={(v) => set("type", v)}>
                        <SelectTrigger className="h-11 rounded-xl"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {["Lead", "Supporting", "Background", "Antagonist", "Cameo"].map((o) => (
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} placeholder="Male detective, mid 30s, brooding, cyberpunk noir setting." className="rounded-xl" />
                  </Field>
                  <Field label="Reference images" hint="Drop moodboards, character sheets, photo refs">
                    <div className="border-border bg-card/50 hover:border-primary/40 group flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition-colors">
                      <Upload className="text-muted-foreground group-hover:text-primary h-5 w-5" />
                      <p className="mt-2 text-sm font-medium">Drop files or click to upload</p>
                      <p className="text-muted-foreground mt-0.5 text-xs">JPG, PNG, PDF · up to 100MB</p>
                      <Button variant="ghost" size="sm" className="mt-3 rounded-xl" onClick={() => set("refs", [...form.refs, `Reference ${form.refs.length + 1}`])}>
                        <Upload className="h-3.5 w-3.5" /> Add reference
                      </Button>
                    </div>
                    {form.refs.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {form.refs.map((r, i) => (
                          <span key={r + i} className="bg-muted inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
                            {r}
                            <button onClick={() => set("refs", form.refs.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-foreground">
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </Field>
                </div>
              )}

              {step === "appearance" && (
                <div className="space-y-5">
                  <Header eyebrow="Step 2 of 4" title="Appearance configuration" sub="Visual attributes that define the character." />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Face"><Input value={form.face} onChange={(e) => set("face", e.target.value)} className="h-11 rounded-xl" /></Field>
                    <Field label="Hair"><Input value={form.hair} onChange={(e) => set("hair", e.target.value)} className="h-11 rounded-xl" /></Field>
                    <Field label="Outfit"><Input value={form.outfit} onChange={(e) => set("outfit", e.target.value)} className="h-11 rounded-xl" /></Field>
                    <Field label="Accessories"><Input value={form.accessories} onChange={(e) => set("accessories", e.target.value)} className="h-11 rounded-xl" /></Field>
                  </div>
                  <Field label="Pose"><Input value={form.pose} onChange={(e) => set("pose", e.target.value)} className="h-11 rounded-xl" /></Field>
                </div>
              )}

              {step === "review" && (
                <div className="space-y-6">
                  <Header eyebrow="Step 3 of 4" title="Review & generate" sub="Confirm the prompt and choose generation settings." />
                  <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
                    <div className="bg-card border-border space-y-3 rounded-2xl border p-4">
                      <SummaryRow label="Name" value={form.name || "—"} />
                      <SummaryRow label="Type" value={form.type} />
                      <SummaryRow label="Description" value={form.description || "—"} />
                      <SummaryRow label="Face" value={form.face} />
                      <SummaryRow label="Hair" value={form.hair} />
                      <SummaryRow label="Outfit" value={form.outfit} />
                      <SummaryRow label="Accessories" value={form.accessories} />
                      <SummaryRow label="Pose" value={form.pose} />
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
                        <Sparkles className="h-3 w-3" /> AI will compose poses, expressions and wardrobes.
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
                  <Header eyebrow="Success" title={`${form.name || "Character"} is generating`} sub="Outputs will arrive in Design Studio in a few seconds." />
                  <div className="mx-auto grid max-w-xl grid-cols-4 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className={cn("aspect-square rounded-xl bg-gradient-to-br", ["from-[#006466] to-[#272640]","from-[#272640] to-[#4d194d]","from-[#1b3a4b] to-[#3e1f47]","from-[#4d194d] to-[#006466]"][i])}>
                        <div className="bg-noise h-full w-full rounded-xl opacity-30" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <Button variant="hero" className="rounded-xl" asChild>
                      <Link to="/projects/$projectId/characters/$characterId" params={{ projectId, characterId: "c1" }}>
                        <Users className="h-4 w-4" /> View character
                      </Link>
                    </Button>
                    <Button variant="ghost" className="rounded-xl" onClick={() => { setStep("concept"); setForm((f) => ({ ...f, name: "" })); }}>
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
                  <Wand2 className="h-4 w-4" /> Generate character
                </Button>
              ) : (
                <Button variant="hero" className="rounded-xl" onClick={next} disabled={step === "concept" && form.name.trim().length < 2}>
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

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 text-xs">
      <div className="text-muted-foreground">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}

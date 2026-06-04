import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Image as ImageIcon,
  Plus,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
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

export const Route = createFileRoute("/_app/projects/new")({
  head: () => ({
    meta: [{ title: "New project · AIS" }],
  }),
  component: NewProjectWizard,
});

const STEPS = [
  { key: "basics", label: "Basics", hint: "Name, client & category" },
  { key: "direction", label: "Creative direction", hint: "Visual style & references" },
  { key: "team", label: "Team", hint: "Producers, designers, editors" },
  { key: "initialize", label: "Initialize", hint: "Spin up the workspace" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const PALETTES = [
  { name: "Neon Dusk", colors: ["#006466", "#0b525b", "#3e1f47", "#4d194d"] },
  { name: "Brutalist Cream", colors: ["#f5f0e8", "#dce5d4", "#a8c0a0", "#2d2d2d"] },
  { name: "Cinematic Noir", colors: ["#0d0d0d", "#1a1a1a", "#c9a84c", "#f0d78c"] },
  { name: "Velvet Static", colors: ["#0b525b", "#4d194d", "#e94560", "#f9c74f"] },
];

const STYLES = [
  "Cinematic",
  "Anime",
  "Documentary",
  "Photorealistic",
  "Painterly",
  "Hand-drawn",
  "Surreal",
  "Editorial",
];

export default function NewProjectWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState<StepKey>("basics");
  const idx = STEPS.findIndex((s) => s.key === step);

  // form state
  const [form, setForm] = useState({
    name: "",
    description: "",
    client: "",
    category: "music",
    genre: "",
    audience: "",
    visualStyle: "Cinematic",
    mood: "",
    palette: PALETTES[0].name,
    cinematic: "Anamorphic 2.39:1",
    refs: [] as string[],
    team: [] as { email: string; role: string }[],
    pendingEmail: "",
    pendingRole: "designer",
  });

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const canNext = useMemo(() => {
    if (step === "basics") return form.name.trim().length > 1;
    return true;
  }, [step, form.name]);

  const next = () => {
    const n = STEPS[Math.min(idx + 1, STEPS.length - 1)];
    setStep(n.key);
  };
  const prev = () => {
    const p = STEPS[Math.max(idx - 1, 0)];
    setStep(p.key);
  };

  const finish = () => {
    // mock: navigate back to projects dashboard
    navigate({ to: "/projects" });
  };

  return (
    <>
      <Topbar
        breadcrumbs={
          <>
            <Link to="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">New project</span>
          </>
        }
        actions={
          <Button variant="ghost" size="sm" className="rounded-xl" asChild>
            <Link to="/projects">
              <X className="h-4 w-4" /> Cancel
            </Link>
          </Button>
        }
      />

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
        {/* Step rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="text-muted-foreground mb-3 text-[10px] tracking-[0.18em] uppercase">
            New project
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

        {/* Step body */}
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
              {step === "basics" && (
                <div className="space-y-5">
                  <Header
                    eyebrow="Step 1 of 4"
                    title="Tell us about the production"
                    sub="Just the essentials — you can refine everything later."
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Project name" required>
                      <Input
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="e.g. Cyberpunk Detective"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                    <Field label="Client / Brief">
                      <Input
                        value={form.client}
                        onChange={(e) => set("client", e.target.value)}
                        placeholder="Sony Music · Artist Visual"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                    <Field label="Category">
                      <Select value={form.category} onValueChange={(v) => set("category", v)}>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="music">Music video</SelectItem>
                          <SelectItem value="brand">Brand film</SelectItem>
                          <SelectItem value="game">Game cinematic</SelectItem>
                          <SelectItem value="ad">Advertisement</SelectItem>
                          <SelectItem value="short">Concept short</SelectItem>
                          <SelectItem value="series">Episodic / Series</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Genre">
                      <Input
                        value={form.genre}
                        onChange={(e) => set("genre", e.target.value)}
                        placeholder="Sci-Fi Thriller"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                    <Field label="Target audience">
                      <Input
                        value={form.audience}
                        onChange={(e) => set("audience", e.target.value)}
                        placeholder="18 – 35"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      rows={3}
                      placeholder="A grounded sci-fi noir set in a rain-soaked Neo-Mumbai."
                      className="rounded-xl"
                    />
                  </Field>
                </div>
              )}

              {step === "direction" && (
                <div className="space-y-6">
                  <Header
                    eyebrow="Step 2 of 4"
                    title="Define the creative direction"
                    sub="Style, mood and references seed every AI generation."
                  />

                  <Field label="Visual style">
                    <div className="flex flex-wrap gap-2">
                      {STYLES.map((s) => (
                        <button
                          key={s}
                          onClick={() => set("visualStyle", s)}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs transition-colors",
                            form.visualStyle === s
                              ? "bg-primary text-primary-foreground border-transparent"
                              : "border-border text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Mood">
                      <Input
                        value={form.mood}
                        onChange={(e) => set("mood", e.target.value)}
                        placeholder="Melancholy, electric, hopeful"
                        className="h-11 rounded-xl"
                      />
                    </Field>
                    <Field label="Cinematic style">
                      <Select value={form.cinematic} onValueChange={(v) => set("cinematic", v)}>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Anamorphic 2.39:1">Anamorphic 2.39:1</SelectItem>
                          <SelectItem value="Widescreen 16:9">Widescreen 16:9</SelectItem>
                          <SelectItem value="Academy 1.85:1">Academy 1.85:1</SelectItem>
                          <SelectItem value="Vertical 9:16">Vertical 9:16</SelectItem>
                          <SelectItem value="Square 1:1">Square 1:1</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <Field label="Color language">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {PALETTES.map((p) => {
                        const active = form.palette === p.name;
                        return (
                          <button
                            key={p.name}
                            onClick={() => set("palette", p.name)}
                            className={cn(
                              "group border-border bg-card overflow-hidden rounded-2xl border text-left transition-all",
                              active
                                ? "ring-primary shadow-elegant ring-2"
                                : "hover:border-primary/40",
                            )}
                          >
                            <div className="flex h-14">
                              {p.colors.map((c) => (
                                <div key={c} className="flex-1" style={{ background: c }} />
                              ))}
                            </div>
                            <div className="p-2.5">
                              <div className="text-xs font-medium">{p.name}</div>
                              <div className="text-muted-foreground text-[10px]">
                                {p.colors.length} tones
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="References" hint="Drop moodboards, frames or PDFs">
                    <div className="border-border bg-card/50 hover:border-primary/50 group flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition-colors">
                      <Upload className="text-muted-foreground group-hover:text-primary h-5 w-5" />
                      <p className="mt-2 text-sm font-medium">Drop files or click to upload</p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        Images, videos, PDFs · up to 100MB
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-3 rounded-xl"
                        onClick={() =>
                          set("refs", [...form.refs, `Moodboard ${form.refs.length + 1}`])
                        }
                      >
                        <ImageIcon className="h-3.5 w-3.5" /> Add reference
                      </Button>
                    </div>
                    {form.refs.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {form.refs.map((r, i) => (
                          <span
                            key={r + i}
                            className="bg-muted text-foreground inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"
                          >
                            {r}
                            <button
                              onClick={() =>
                                set(
                                  "refs",
                                  form.refs.filter((_, j) => j !== i),
                                )
                              }
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </Field>
                </div>
              )}

              {step === "team" && (
                <div className="space-y-6">
                  <Header
                    eyebrow="Step 3 of 4"
                    title="Assemble the team"
                    sub="Invite producers, designers, editors and reviewers."
                  />

                  <div className="bg-card border-border rounded-2xl border p-4">
                    <div className="grid gap-2 sm:grid-cols-[1fr_180px_auto]">
                      <Input
                        value={form.pendingEmail}
                        onChange={(e) => set("pendingEmail", e.target.value)}
                        placeholder="teammate@studio.com"
                        className="h-11 rounded-xl"
                      />
                      <Select
                        value={form.pendingRole}
                        onValueChange={(v) => set("pendingRole", v)}
                      >
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="producer">Producer</SelectItem>
                          <SelectItem value="designer">Creative designer</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="reviewer">Reviewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="hero"
                        className="h-11 rounded-xl"
                        onClick={() => {
                          if (!form.pendingEmail.includes("@")) return;
                          set("team", [
                            ...form.team,
                            { email: form.pendingEmail, role: form.pendingRole },
                          ]);
                          set("pendingEmail", "");
                        }}
                      >
                        <Plus className="h-4 w-4" /> Invite
                      </Button>
                    </div>

                    <div className="mt-4 space-y-2">
                      {form.team.length === 0 && (
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          <Users className="h-3.5 w-3.5" />
                          Just you for now — you can invite anytime.
                        </div>
                      )}
                      {form.team.map((m, i) => (
                        <div
                          key={m.email + i}
                          className="bg-background/60 flex items-center justify-between rounded-xl border px-3 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <span className="bg-hero text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold">
                              {m.email.slice(0, 2).toUpperCase()}
                            </span>
                            <div className="min-w-0">
                              <div className="truncate text-sm">{m.email}</div>
                              <div className="text-muted-foreground text-[11px] capitalize">
                                {m.role}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              set(
                                "team",
                                form.team.filter((_, j) => j !== i),
                              )
                            }
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === "initialize" && (
                <div className="space-y-6">
                  <Header
                    eyebrow="Step 4 of 4"
                    title="Initialize the workspace"
                    sub="AIS will provision your studios, library and review inbox."
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Summary label="Project" value={form.name || "Untitled"} />
                    <Summary label="Client" value={form.client || "—"} />
                    <Summary label="Category" value={form.category} />
                    <Summary label="Style" value={form.visualStyle} />
                    <Summary label="Cinematic" value={form.cinematic} />
                    <Summary label="Team" value={`${form.team.length + 1} member(s)`} />
                  </div>

                  <div className="bg-card border-border rounded-2xl border p-5">
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <Sparkles className="text-primary h-4 w-4" /> AIS will create
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {[
                        "Design Studio (characters, themes, props)",
                        "Video Studio (scenes, storyboards, render)",
                        "Asset Library (single source of truth)",
                        "Review Inbox (approvals & governance)",
                        "Knowledge Base (briefs & references)",
                        "Collaboration channel",
                      ].map((c) => (
                        <div key={c} className="flex items-center gap-2 text-xs">
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer nav */}
          <div className="border-border mt-8 flex items-center justify-between border-t pt-5">
            <Button
              variant="ghost"
              onClick={prev}
              disabled={idx === 0}
              className="rounded-xl"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div className="text-muted-foreground text-[11px]">
              {idx + 1} / {STEPS.length}
            </div>
            {step === "initialize" ? (
              <Button variant="hero" className="rounded-xl" onClick={finish}>
                <Sparkles className="h-4 w-4" /> Create project
              </Button>
            ) : (
              <Button
                variant="hero"
                className="rounded-xl"
                onClick={next}
                disabled={!canNext}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function Header({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-6">
      <div className="text-primary text-[10px] tracking-[0.22em] uppercase">{eyebrow}</div>
      <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="text-muted-foreground mt-1.5 text-sm">{sub}</p>
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
      <Label className="flex items-center gap-1 text-xs font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
        {hint && <span className="text-muted-foreground ml-2 font-normal">· {hint}</span>}
      </Label>
      {children}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card/70 border-border rounded-xl border p-3">
      <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
        {label}
      </div>
      <div className="mt-1 truncate text-sm font-medium capitalize">{value}</div>
    </div>
  );
}

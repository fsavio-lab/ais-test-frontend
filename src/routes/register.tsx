import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Plus, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthField, Divider, GoogleButton } from "@/components/auth/AuthField";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account · AIS Creative Production OS" },
      {
        name: "description",
        content:
          "Create your AIS workspace — an AI-native creative production OS for studios and teams.",
      },
    ],
  }),
  component: RegisterPage,
});

const step1Schema = z
  .object({
    firstName: z.string().trim().min(1, "Required").max(60),
    lastName: z.string().trim().min(1, "Required").max(60),
    email: z.string().trim().email("Enter a valid email").max(255),
    password: z.string().min(8, "At least 8 characters").max(128),
    confirm: z.string().min(1, "Required"),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const step2Schema = z.object({
  workspaceName: z.string().trim().min(2, "At least 2 characters").max(80),
  workspaceSlug: z
    .string()
    .trim()
    .min(2, "At least 2 characters")
    .max(40)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only"),
  industry: z.string().min(1, "Pick one"),
});

const STEPS = ["Account", "Workspace", "Invite team"] as const;

function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0..4
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [s1, setS1] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [s1Err, setS1Err] = useState<Partial<Record<keyof typeof s1, string>>>({});

  const [s2, setS2] = useState({ workspaceName: "", workspaceSlug: "", industry: "" });
  const [s2Err, setS2Err] = useState<Partial<Record<keyof typeof s2, string>>>({});
  const [slugTouched, setSlugTouched] = useState(false);

  const [invites, setInvites] = useState<string[]>([""]);

  const strength = useMemo(() => passwordStrength(s1.password), [s1.password]);

  const next = () => {
    if (step === 0) {
      const r = step1Schema.safeParse(s1);
      if (!r.success) {
        const next: typeof s1Err = {};
        for (const i of r.error.issues) {
          const k = i.path[0] as keyof typeof s1;
          if (!next[k]) next[k] = i.message;
        }
        setS1Err(next);
        return;
      }
      setS1Err({});
      setStep(1);
    } else if (step === 1) {
      const r = step2Schema.safeParse(s2);
      if (!r.success) {
        const next: typeof s2Err = {};
        for (const i of r.error.issues) {
          const k = i.path[0] as keyof typeof s2;
          if (!next[k]) next[k] = i.message;
        }
        setS2Err(next);
        return;
      }
      setS2Err({});
      setStep(2);
    } else {
      setDone(true);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <div className="bg-hero text-primary-foreground mx-auto flex h-14 w-14 items-center justify-center rounded-full shadow-glow">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="font-display mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
              Workspace created
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              <span className="text-foreground font-medium">{s2.workspaceName}</span> is
              ready. Time to make something great.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="mt-7 h-11 w-full rounded-xl"
              onClick={() => navigate({ to: "/projects" })}
            >
              Launch AIS
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header + stepper */}
            <header className="mb-6">
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {step === 0 && "Create your account"}
                {step === 1 && "Name your workspace"}
                {step === 2 && "Invite your team"}
              </h2>
              <p className="text-muted-foreground mt-1.5 text-sm">
                {step === 0 && "Start your AI-native production journey."}
                {step === 1 && "Workspaces hold your projects, assets and team."}
                {step === 2 && "Optional — you can always invite people later."}
              </p>
            </header>

            {/* Desktop stepper */}
            <div className="mb-6 hidden items-center gap-2 sm:flex">
              {STEPS.map((label, i) => {
                const active = i === step;
                const complete = i < step;
                return (
                  <div key={label} className="flex flex-1 items-center gap-2">
                    <div
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold transition-all",
                        complete && "bg-primary text-primary-foreground",
                        active && "ring-primary/30 bg-primary text-primary-foreground ring-4",
                        !active && !complete && "bg-muted text-muted-foreground",
                      )}
                    >
                      {complete ? <Check className="h-3 w-3" /> : i + 1}
                    </div>
                    <span
                      className={cn(
                        "text-xs whitespace-nowrap",
                        active ? "text-foreground font-medium" : "text-muted-foreground",
                      )}
                    >
                      {label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span
                        className={cn(
                          "ml-1 h-px flex-1 transition-colors",
                          i < step ? "bg-primary" : "bg-border",
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile stepper */}
            <div className="text-muted-foreground mb-5 text-xs sm:hidden">
              Step {step + 1} of {STEPS.length} ·{" "}
              <span className="text-foreground font-medium">{STEPS[step]}</span>
            </div>

            {step === 0 && (
              <>
                <GoogleButton>Sign up with Google</GoogleButton>
                <Divider />
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    next();
                  }}
                  noValidate
                >
                  <div className="grid grid-cols-2 gap-3">
                    <AuthField
                      label="First name"
                      variant="email"
                      placeholder="Ada"
                      autoComplete="given-name"
                      value={s1.firstName}
                      onChange={(e) =>
                        setS1((v) => ({ ...v, firstName: e.target.value }))
                      }
                      error={s1Err.firstName}
                      type="text"
                    />
                    <AuthField
                      label="Last name"
                      variant="email"
                      placeholder="Lovelace"
                      autoComplete="family-name"
                      value={s1.lastName}
                      onChange={(e) =>
                        setS1((v) => ({ ...v, lastName: e.target.value }))
                      }
                      error={s1Err.lastName}
                      type="text"
                    />
                  </div>
                  <AuthField
                    label="Email"
                    placeholder="you@studio.com"
                    autoComplete="email"
                    value={s1.email}
                    onChange={(e) => setS1((v) => ({ ...v, email: e.target.value }))}
                    error={s1Err.email}
                  />
                  <div>
                    <AuthField
                      label="Password"
                      variant="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      value={s1.password}
                      onChange={(e) =>
                        setS1((v) => ({ ...v, password: e.target.value }))
                      }
                      error={s1Err.password}
                    />
                    {/* Strength meter */}
                    <div className="mt-2 flex items-center gap-1.5">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1 flex-1 rounded-full transition-colors",
                            i < strength
                              ? strength <= 1
                                ? "bg-destructive"
                                : strength === 2
                                  ? "bg-amber-500"
                                  : strength === 3
                                    ? "bg-primary"
                                    : "bg-emerald-500"
                              : "bg-border",
                          )}
                        />
                      ))}
                      <span className="text-muted-foreground ml-2 w-14 text-right text-[10px]">
                        {["", "Weak", "Fair", "Good", "Strong"][strength]}
                      </span>
                    </div>
                  </div>
                  <AuthField
                    label="Confirm password"
                    variant="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={s1.confirm}
                    onChange={(e) => setS1((v) => ({ ...v, confirm: e.target.value }))}
                    error={s1Err.confirm}
                  />

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="h-11 w-full rounded-xl"
                  >
                    Continue
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </form>
              </>
            )}

            {step === 1 && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
                noValidate
              >
                <div className="space-y-1.5">
                  <Label htmlFor="ws-name" className="text-xs font-medium">
                    Workspace name
                  </Label>
                  <Input
                    id="ws-name"
                    className="bg-card/60 h-11 rounded-xl"
                    placeholder="Acme Studios"
                    value={s2.workspaceName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setS2((s) => ({
                        ...s,
                        workspaceName: v,
                        workspaceSlug: slugTouched ? s.workspaceSlug : slugify(v),
                      }));
                    }}
                    aria-invalid={!!s2Err.workspaceName}
                  />
                  {s2Err.workspaceName && (
                    <p className="text-destructive text-[11px]">{s2Err.workspaceName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="ws-slug" className="text-xs font-medium">
                    Workspace URL
                  </Label>
                  <div className="bg-card/60 border-input focus-within:ring-primary/40 flex h-11 items-center rounded-xl border pr-3 pl-3 focus-within:ring-2">
                    <span className="text-muted-foreground text-xs">ais.app/</span>
                    <input
                      id="ws-slug"
                      className="text-foreground placeholder:text-muted-foreground h-full flex-1 bg-transparent text-sm outline-none"
                      placeholder="acme-studios"
                      value={s2.workspaceSlug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setS2((s) => ({ ...s, workspaceSlug: slugify(e.target.value) }));
                      }}
                      aria-invalid={!!s2Err.workspaceSlug}
                    />
                  </div>
                  {s2Err.workspaceSlug && (
                    <p className="text-destructive text-[11px]">{s2Err.workspaceSlug}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Industry</Label>
                  <Select
                    value={s2.industry}
                    onValueChange={(v) => setS2((s) => ({ ...s, industry: v }))}
                  >
                    <SelectTrigger className="bg-card/60 h-11 rounded-xl">
                      <SelectValue placeholder="Choose your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="film">Film & TV</SelectItem>
                      <SelectItem value="advertising">Advertising</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="agency">Creative Agency</SelectItem>
                      <SelectItem value="brand">Brand / In-house</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {s2Err.industry && (
                    <p className="text-destructive text-[11px]">{s2Err.industry}</p>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 rounded-xl"
                    onClick={back}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="h-11 flex-1 rounded-xl"
                  >
                    Continue
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  next();
                }}
                noValidate
              >
                <div className="space-y-2">
                  {invites.map((email, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        type="email"
                        className="bg-card/60 h-11 rounded-xl"
                        placeholder="teammate@studio.com"
                        value={email}
                        onChange={(e) =>
                          setInvites((arr) =>
                            arr.map((v, idx) => (idx === i ? e.target.value : v)),
                          )
                        }
                      />
                      {invites.length > 1 && (
                        <button
                          type="button"
                          aria-label="Remove invite"
                          onClick={() =>
                            setInvites((arr) => arr.filter((_, idx) => idx !== i))
                          }
                          className="text-muted-foreground hover:text-foreground hover:bg-accent flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setInvites((arr) => [...arr, ""])}
                    className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1.5 text-xs transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add another
                  </button>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 rounded-xl"
                    onClick={back}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="h-11 flex-1 rounded-xl"
                  >
                    Create workspace
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-center text-[11px]">
                  You can skip this and invite members later.
                </p>
              </form>
            )}

            <p className="text-muted-foreground mt-6 text-center text-xs">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-foreground hover:text-primary font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}

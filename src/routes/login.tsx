import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthField, Divider, GoogleButton } from "@/components/auth/AuthField";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "At least 8 characters").max(128),
});

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · AIS Creative Production OS" },
      {
        name: "description",
        content: "Sign in to AIS — the AI-native creative production operating system.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof errors;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    // Wire up to auth backend later
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/projects" });
    }, 600);
  };

  return (
    <AuthLayout>
      <header className="mb-7">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Welcome back
        </h2>
        <p className="text-muted-foreground mt-1.5 text-sm">
          Continue building production-ready creative workflows.
        </p>
      </header>

      <GoogleButton />
      <Divider />

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <AuthField
          label="Email"
          variant="email"
          placeholder="you@studio.com"
          autoComplete="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          error={errors.email}
          required
        />
        <AuthField
          label="Password"
          variant="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          error={errors.password}
          hint={
            <Link
              to="/login"
              className="hover:text-foreground text-muted-foreground text-[11px]"
            >
              Forgot password?
            </Link>
          }
          required
        />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-muted-foreground text-xs">
              Remember me
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="mt-2 h-11 w-full rounded-xl"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-xs">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-foreground hover:text-primary font-medium transition-colors"
        >
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}

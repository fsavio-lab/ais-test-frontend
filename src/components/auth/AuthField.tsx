import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Variant = "email" | "password";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: Variant;
  error?: string;
  hint?: React.ReactNode;
}

export function AuthField({
  label,
  variant = "email",
  error,
  hint,
  className,
  id,
  ...rest
}: Props) {
  const [show, setShow] = useState(false);
  const inputId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const Icon = variant === "password" ? Lock : Mail;
  const type = variant === "password" ? (show ? "text" : "password") : rest.type ?? "email";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={inputId} className="text-xs font-medium">
          {label}
        </Label>
        {hint && <span className="text-muted-foreground text-[11px]">{hint}</span>}
      </div>
      <div className="group relative">
        <Icon
          className={cn(
            "text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transition-colors",
            "group-focus-within:text-primary",
          )}
        />
        <Input
          id={inputId}
          type={type}
          className={cn(
            "bg-card/60 h-11 rounded-xl pl-10 transition-all",
            variant === "password" && "pr-10",
            "focus-visible:ring-primary/40 focus-visible:ring-2",
            error && "border-destructive/60 focus-visible:ring-destructive/30",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...rest}
        />
        {variant === "password" && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-destructive text-[11px]">
          {error}
        </p>
      )}
    </div>
  );
}

export function GoogleButton({
  children = "Continue with Google",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="bg-card hover:bg-accent border-border flex h-11 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border text-sm font-medium transition-colors active:scale-[0.99]"
      {...rest}
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1 0-3.4 2.7-6.1 6-6.1 1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z"
        />
        <path
          fill="#4285F4"
          d="M21.8 12.3c0-.6-.1-1.1-.2-1.6H12v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1v.1c3 0 5.6-1 7.4-2.7 1.6-1.5 2.4-3.6 2.4-3.8z"
        />
        <path
          fill="#FBBC05"
          d="M5.5 14.3c-.2-.6-.4-1.3-.4-2 0-.7.1-1.4.4-2L2.9 7.9C2.1 9.2 1.6 10.6 1.6 12s.5 2.8 1.3 4.1l2.6-1.8z"
        />
        <path
          fill="#34A853"
          d="M12 21.5c2.6 0 4.8-.9 6.4-2.4l-2.6-2.1c-.7.5-1.7 1-3.8 1-3 0-5.5-2-6.4-4.7L2.9 16C4.6 19.3 8 21.5 12 21.5z"
        />
      </svg>
      {children}
    </button>
  );
}

export function Divider({ children = "OR" }: { children?: string }) {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="bg-border h-px flex-1" />
      <span className="text-muted-foreground text-[10px] font-medium tracking-[0.2em]">
        {children}
      </span>
      <span className="bg-border h-px flex-1" />
    </div>
  );
}

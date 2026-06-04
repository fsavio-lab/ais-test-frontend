import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="bg-hero flex h-7 w-7 items-center justify-center rounded-full text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="font-display text-sm font-semibold">AIS Creative OS</span>
        </div>
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} AIS Studios. Built for the next era of production.
        </p>
      </div>
    </footer>
  );
}

import { Bell, Command, Plus, Search, Sparkles } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { MobileNavTrigger } from "@/components/app/Sidebar";
import { ThemeToggle } from "@/components/theme/ThemeProvider";

export function Topbar({
  title,
  subtitle,
  actions,
  breadcrumbs,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}) {
  return (
    <header className="bg-background/70 border-border sticky top-0 z-10 flex h-14 items-center gap-2 border-b px-3 backdrop-blur-xl sm:gap-3 sm:px-6">
      <MobileNavTrigger />

      <div className="min-w-0 flex-1">
        {breadcrumbs ? (
          <div className="text-muted-foreground flex items-center gap-1 truncate text-xs">
            {breadcrumbs}
          </div>
        ) : (
          <>
            {title && (
              <h1 className="font-display truncate text-base font-semibold tracking-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-muted-foreground truncate text-xs">{subtitle}</p>
            )}
          </>
        )}
      </div>

      {/* Search — desktop only */}
      <button className="bg-card border-border hover:border-primary/40 hidden h-9 min-w-[240px] items-center gap-2 rounded-xl border px-3 text-left text-xs transition-colors xl:flex">
        <Search className="text-muted-foreground h-3.5 w-3.5" />
        <span className="text-muted-foreground flex-1">Search projects, assets…</span>
        <span className="text-muted-foreground flex items-center gap-0.5 text-[10px]">
          <Command className="h-3 w-3" />K
        </span>
      </button>

      <Button variant="ghost" size="icon" className="hidden rounded-xl sm:inline-flex" aria-label="Search">
        <Search className="h-4 w-4 xl:hidden" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-xl" aria-label="AI Assistant">
        <Sparkles className="h-4 w-4" />
      </Button>
      <ThemeToggle />
      <Button variant="ghost" size="icon" className="relative rounded-xl" aria-label="Notifications">
        <Bell className="h-4 w-4" />
        <span className="bg-primary absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full" />
      </Button>

      {actions ?? (
        <Button variant="hero" size="sm" className="rounded-xl">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New project</span>
        </Button>
      )}
    </header>
  );
}

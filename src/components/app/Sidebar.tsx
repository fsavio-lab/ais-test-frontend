import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  FolderKanban,
  HelpCircle,
  Inbox,
  LayoutGrid,
  Library,
  Menu,
  Settings,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { workspaces } from "@/lib/workspace-data";

const primary = [
  { to: "/projects" as const, label: "Projects", icon: FolderKanban },
  { to: "/projects" as const, label: "Inbox", icon: Inbox, badge: 4, disabled: true },
  { to: "/projects" as const, label: "Library", icon: Library, disabled: true },
  { to: "/projects" as const, label: "Activity", icon: LayoutGrid, disabled: true },
];

const secondary = [
  { label: "Notifications", icon: Bell },
  { label: "Settings", icon: Settings },
  { label: "Help", icon: HelpCircle },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const [ws, setWs] = useState(workspaces[0]);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 pt-4 pb-3">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-2">
          <span className="bg-hero text-primary-foreground flex h-8 w-8 items-center justify-center rounded-xl">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold tracking-tight">AIS</div>
            <div className="text-muted-foreground text-[9px] tracking-widest uppercase">
              Creative OS
            </div>
          </div>
        </Link>
      </div>

      <div className="px-3 pb-3">
        <WorkspaceSwitcher current={ws} onChange={setWs} />
      </div>

      <div className="bg-sidebar-border/60 mx-3 mb-3 h-px" />

      <nav className="flex-1 overflow-y-auto px-3">
        <div className="text-muted-foreground px-2 pt-1 pb-2 text-[10px] font-medium tracking-[0.18em] uppercase">
          Workspace
        </div>
        <ul className="space-y-0.5">
          {primary.map((item, i) => {
            const active = !item.disabled && path.startsWith(item.to) && i === 0;
            return (
              <li key={item.label}>
                {item.disabled ? (
                  <div className="text-muted-foreground/60 flex cursor-not-allowed items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm">
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge != null && (
                      <span className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-[10px] font-medium">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-[9px] tracking-widest uppercase opacity-70">Soon</span>
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge != null && (
                      <span className="bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="text-muted-foreground px-2 pt-6 pb-2 text-[10px] font-medium tracking-[0.18em] uppercase">
          Pinned
        </div>
        <ul className="space-y-0.5">
          {["Neon Bloom", "Atlas Reborn", "Lunar Drift"].map((name) => (
            <li key={name}>
              <Link
                to="/projects/$projectId"
                params={{
                  projectId:
                    name === "Neon Bloom" ? "p_neon" : name === "Atlas Reborn" ? "p_atlas" : "p_lunar",
                }}
                onClick={onNavigate}
                className="hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-accent-foreground flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors"
              >
                <span className="bg-hero h-1.5 w-1.5 shrink-0 rounded-full" />
                <span className="truncate">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-sidebar-border border-t p-3">
        <ul className="space-y-0.5">
          {secondary.map((item) => (
            <li key={item.label}>
              <button className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors">
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="bg-accent/50 mt-3 flex items-center gap-2 rounded-xl px-2.5 py-2">
          <span className="bg-hero text-primary-foreground flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold">
            AL
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium">Ada Lovelace</div>
            <div className="text-muted-foreground truncate text-[10px]">ada@studio.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="bg-sidebar/80 border-sidebar-border relative z-20 hidden h-dvh w-[260px] shrink-0 border-r backdrop-blur-xl lg:flex">
      <SidebarContent />
    </aside>
  );
}

export function MobileNavTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-sidebar w-[280px] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <SidebarContent onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

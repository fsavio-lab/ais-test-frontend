import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { workspaces, type Workspace } from "@/lib/workspace-data";

export function WorkspaceSwitcher({
  current,
  onChange,
}: {
  current: Workspace;
  onChange: (ws: Workspace) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-accent/60 h-11 w-full justify-between rounded-xl px-2"
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="bg-hero text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold">
              {current.initials}
            </span>
            <div className="min-w-0 text-left">
              <div className="truncate text-sm font-medium">{current.name}</div>
              <div className="text-muted-foreground truncate text-[10px] capitalize">
                {current.role} · {current.members} members
              </div>
            </div>
          </div>
          <ChevronsUpDown className="text-muted-foreground h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[260px] p-1.5">
        <div className="text-muted-foreground px-2 py-1.5 text-[10px] font-medium tracking-[0.18em] uppercase">
          Workspaces
        </div>
        {workspaces.map((ws) => {
          const active = ws.id === current.id;
          return (
            <button
              key={ws.id}
              onClick={() => {
                onChange(ws);
                setOpen(false);
              }}
              className={cn(
                "hover:bg-accent flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors",
                active && "bg-accent/70",
              )}
            >
              <span className="bg-hero text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-semibold">
                {ws.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm">{ws.name}</div>
                <div className="text-muted-foreground truncate text-[10px] capitalize">
                  {ws.role}
                </div>
              </div>
              {active && <Check className="text-primary h-4 w-4" />}
            </button>
          );
        })}
        <div className="bg-border my-1.5 h-px" />
        <button className="hover:bg-accent text-muted-foreground hover:text-foreground flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors">
          <Plus className="h-4 w-4" />
          New workspace
        </button>
      </PopoverContent>
    </Popover>
  );
}

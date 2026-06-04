import { createFileRoute } from "@tanstack/react-router";
import { Check, MessageSquare, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { reviewsByProject } from "@/lib/workspace-data";

export const Route = createFileRoute("/_app/projects/$projectId/reviews")({
  component: ReviewInbox,
});

const FILTERS = ["All", "Scenes", "Characters", "Storyboards", "Videos", "Backgrounds"] as const;

function ReviewInbox() {
  const { projectId } = Route.useParams();
  const list = reviewsByProject[projectId] ?? reviewsByProject.p_neon;
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [selected, setSelected] = useState(list[0]?.id);

  const filtered = list.filter((r) =>
    filter === "All" ? true : r.type === filter.replace(/s$/, ""),
  );
  const active = filtered.find((r) => r.id === selected) ?? filtered[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Review Inbox</h2>
        <p className="text-muted-foreground text-sm">
          Approve, reject or request changes across every asset type.
        </p>
      </div>

      {/* Filter chips */}
      <div className="bg-card/60 mb-5 inline-flex items-center gap-0.5 rounded-2xl border p-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs transition-colors",
              filter === f
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-card border-border grid min-h-[520px] grid-cols-1 overflow-hidden rounded-3xl border lg:grid-cols-[360px_1fr]">
        {/* List */}
        <div className="border-border max-h-[520px] overflow-y-auto border-r">
          {filtered.length === 0 && (
            <div className="text-muted-foreground p-10 text-center text-sm">Inbox zero.</div>
          )}
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={cn(
                "hover:bg-accent/40 flex w-full items-start gap-3 border-b p-4 text-left transition-colors",
                selected === r.id && "bg-accent/60",
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold text-white",
                  r.color,
                )}
              >
                {r.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{r.title}</div>
                <div className="text-muted-foreground mt-0.5 truncate text-[11px]">
                  {r.type} · {r.submittedBy} · {r.at}
                </div>
              </div>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9px] font-medium",
                  r.priority === "high" && "bg-destructive/15 text-destructive",
                  r.priority === "med" && "bg-amber-500/15 text-amber-600",
                  r.priority === "low" && "bg-muted text-muted-foreground",
                )}
              >
                {r.priority}
              </span>
            </button>
          ))}
        </div>

        {/* Detail */}
        {active && (
          <div className="flex flex-col">
            <div className="border-border flex items-center justify-between border-b p-4">
              <div className="min-w-0">
                <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
                  {active.type}
                </div>
                <div className="font-display truncate text-lg font-semibold">{active.title}</div>
                <div className="text-muted-foreground text-xs">
                  Submitted by {active.submittedBy} · {active.at}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-xl">
                  <MessageSquare className="h-4 w-4" />
                  Request changes
                </Button>
                <Button variant="ghost" size="sm" className="rounded-xl text-destructive hover:text-destructive">
                  <X className="h-4 w-4" />
                  Reject
                </Button>
                <Button variant="hero" size="sm" className="rounded-xl">
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>

            <div className="bg-aurora relative flex flex-1 items-center justify-center p-8">
              <div className="bg-hero glass-strong shadow-elegant aspect-video w-full max-w-2xl overflow-hidden rounded-2xl">
                <div className="bg-noise h-full w-full opacity-30" />
              </div>
            </div>

            <div className="border-border border-t p-4">
              <div className="bg-card/60 rounded-xl border p-3">
                <div className="text-muted-foreground mb-2 text-[10px] tracking-widest uppercase">
                  Comments
                </div>
                <textarea
                  className="bg-background w-full resize-none rounded-lg border p-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  rows={2}
                  placeholder="Leave feedback or @mention a teammate…"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { Topbar } from "@/components/app/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  projects as initialProjects,
  statusMeta,
  type Project,
  type ProjectStatus,
} from "@/lib/workspace-data";


export const Route = createFileRoute("/_app/projects/")({
  head: () => ({
    meta: [
      { title: "Projects · AIS Creative Production OS" },
      { name: "description", content: "All your creative production projects." },
    ],
  }),
  component: ProjectsPage,
});

const FILTERS: { key: "all" | ProjectStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in_production", label: "In production" },
  { key: "in_review", label: "In review" },
  { key: "draft", label: "Drafts" },
  { key: "delivered", label: "Delivered" },
];

function ProjectsPage() {
  const [projects] = useState<Project[]>(initialProjects);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filter !== "all" && p.status !== filter) return false;
      if (query && !`${p.name} ${p.client}`.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [projects, filter, query]);

  return (
    <>
      <Topbar
        title="Projects"
        subtitle="All productions across your workspace"
        actions={
          <Button variant="hero" size="sm" className="rounded-xl" asChild>
            <Link to="/projects/new">
              <Plus className="h-4 w-4" />
              New project
            </Link>
          </Button>
        }
      />


      <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        {/* Hero strip */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong shadow-elegant relative mb-8 overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-50" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-muted-foreground text-[11px] tracking-widest uppercase">
                Active
              </div>
              <div className="font-display mt-1 text-3xl font-semibold">
                {projects.filter((p) => p.status === "in_production").length}
              </div>
              <div className="text-muted-foreground text-xs">Currently in production</div>
            </div>
            <div>
              <div className="text-muted-foreground text-[11px] tracking-widest uppercase">
                In review
              </div>
              <div className="font-display mt-1 text-3xl font-semibold">
                {projects.filter((p) => p.status === "in_review").length}
              </div>
              <div className="text-muted-foreground text-xs">Awaiting approval</div>
            </div>
            <div>
              <div className="text-muted-foreground text-[11px] tracking-widest uppercase">
                Delivered
              </div>
              <div className="font-display mt-1 text-3xl font-semibold">
                {projects.filter((p) => p.status === "delivered").length}
              </div>
              <div className="text-muted-foreground text-xs">This quarter</div>
            </div>
            <div>
              <div className="text-muted-foreground text-[11px] tracking-widest uppercase">
                Scenes rendered
              </div>
              <div className="font-display mt-1 text-3xl font-semibold">
                {projects.reduce((n, p) => n + p.stats.videos, 0)}
              </div>
              <div className="text-muted-foreground text-xs">Across the workspace</div>
            </div>
          </div>
        </motion.section>

        {/* Toolbar */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="bg-card/60 h-10 rounded-xl pl-9"
            />
          </div>

          <div className="bg-card/60 flex items-center gap-0.5 overflow-x-auto rounded-xl border p-1">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                  filter === f.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <Button variant="ghost" size="sm" className="rounded-xl">
            <SlidersHorizontal className="h-4 w-4" />
            Sort
          </Button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-muted-foreground glass-strong flex flex-col items-center justify-center rounded-3xl p-16 text-center">
            <Filter className="mb-3 h-6 w-6" />
            <p className="text-sm">No projects match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const meta = statusMeta[p.status];
  return (
    <Link
      to="/projects/$projectId"
      params={{ projectId: p.id }}
      className="group bg-card border-border hover:border-primary/40 hover:shadow-elegant relative block overflow-hidden rounded-2xl border transition-all"
    >
      <div className={cn("h-32 w-full bg-gradient-to-br", p.cover)}>
        <div className="bg-noise h-full w-full opacity-30" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display truncate text-base font-semibold tracking-tight">
              {p.name}
            </h3>
            <p className="text-muted-foreground mt-0.5 truncate text-xs">{p.client}</p>
          </div>
          <ArrowUpRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", meta.tone)}>
            {meta.label}
          </span>
          <span className="text-muted-foreground text-[10px]">
            Due {p.dueAt} · Updated {p.updatedAt}
          </span>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="bg-muted relative h-1 overflow-hidden rounded-full">
            <div
              className="bg-hero absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${p.progress}%` }}
            />
          </div>
          <div className="text-muted-foreground mt-1.5 flex items-center justify-between text-[10px]">
            <span>{p.progress}% complete</span>
            <span>{p.stats.scenes} scenes · {p.stats.videos} videos</span>
          </div>
        </div>

        {/* Team */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-2">
            {p.team.slice(0, 4).map((t) => (
              <span
                key={t.name}
                className={cn(
                  "border-card flex h-6 w-6 items-center justify-center rounded-full border-2 text-[9px] font-semibold text-white",
                  t.color,
                )}
                title={t.name}
              >
                {t.initials}
              </span>
            ))}
            {p.team.length > 4 && (
              <span className="border-card bg-muted text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full border-2 text-[9px] font-semibold">
                +{p.team.length - 4}
              </span>
            )}
          </div>
          <div className="text-muted-foreground text-[10px]">
            {p.stats.characters} characters · {p.stats.themes} themes
          </div>
        </div>
      </div>
    </Link>
  );
}


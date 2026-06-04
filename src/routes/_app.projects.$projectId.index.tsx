import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clapperboard,
  Clock,
  Film,
  Layers,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import {
  activityByProject,
  reviewsByProject,
  scenesByProject,
} from "@/lib/workspace-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/projects/$projectId/")({
  component: OverviewPage,
});

const PIPELINE = [
  { label: "Assets", icon: Layers, count: 42, tone: "from-[#006466] to-[#0b525b]" },
  { label: "Scenes", icon: Film, count: 14, tone: "from-[#0b525b] to-[#272640]" },
  { label: "Storyboards", icon: Clapperboard, count: 9, tone: "from-[#272640] to-[#3e1f47]" },
  { label: "Videos", icon: Sparkles, count: 4, tone: "from-[#3e1f47] to-[#4d194d]" },
  { label: "Delivery", icon: CheckCircle2, count: 0, tone: "from-[#4d194d] to-[#272640]" },
];

function OverviewPage() {
  const { projectId } = Route.useParams();
  const reviews = reviewsByProject[projectId] ?? reviewsByProject.p_neon;
  const activity = activityByProject[projectId] ?? activityByProject.p_neon;
  const scenes = scenesByProject[projectId] ?? scenesByProject.p_neon;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Pipeline */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-card border-border rounded-2xl border p-5"
          >
            <SectionHead title="Production pipeline" hint="Assets → Delivery" />
            <div className="mt-4 grid grid-cols-5 gap-3">
              {PIPELINE.map((p, i) => (
                <div key={p.label} className="relative">
                  <div
                    className={cn(
                      "bg-gradient-to-br text-white shadow-sm rounded-2xl p-3 transition-transform hover:-translate-y-0.5",
                      p.tone,
                    )}
                  >
                    <p.icon className="h-4 w-4 opacity-80" />
                    <div className="font-display mt-3 text-2xl font-semibold">{p.count}</div>
                    <div className="text-[10px] text-white/80">{p.label}</div>
                  </div>
                  {i < PIPELINE.length - 1 && (
                    <div className="bg-border absolute top-1/2 -right-2 h-px w-2.5 -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Scenes preview */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-card border-border rounded-2xl border p-5"
          >
            <div className="flex items-center justify-between">
              <SectionHead title="Scenes in motion" hint={`${scenes.length} active`} />
              <Link
                to="/projects/$projectId/video"
                params={{ projectId }}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-[11px] transition-colors"
              >
                Open Video Studio
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="mt-3 divide-y">
              {scenes.slice(0, 5).map((s) => (
                <li key={s.id} className="flex items-center gap-3 py-3">
                  <div className="bg-hero text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                    <Film className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{s.name}</div>
                    <div className="text-muted-foreground truncate text-xs">
                      {s.background} · {s.characters.join(", ")}
                    </div>
                  </div>
                  <div className="text-muted-foreground text-xs">{s.duration}</div>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                      s.status === "rendered" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                      s.status === "ready" && "bg-[#006466]/12 text-[#006466]",
                      s.status === "draft" && "bg-muted text-muted-foreground",
                    )}
                  >
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* AI insights */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-strong shadow-elegant relative overflow-hidden rounded-2xl p-5"
          >
            <div className="bg-aurora pointer-events-none absolute inset-0 -z-10 opacity-40" />
            <SectionHead title="AI insights" hint="Updated 12m ago" />
            <ul className="mt-3 space-y-2">
              {[
                { tone: "warn", text: "Scene 4 (\u201CChase, Underpass\u201D) is missing a fog background variant." },
                { tone: "ok", text: "Nova\u2019s wardrobe set is consistent across 7 of 7 referenced scenes." },
                { tone: "info", text: "Consider generating storyboards for 3 ready scenes to unblock review." },
              ].map((i, idx) => (
                <li
                  key={idx}
                  className="bg-card/70 flex items-start gap-3 rounded-xl border p-3"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
                      i.tone === "warn" && "bg-amber-500/15 text-amber-600",
                      i.tone === "ok" && "bg-emerald-500/15 text-emerald-600",
                      i.tone === "info" && "bg-primary/15 text-primary",
                    )}
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-sm leading-relaxed">{i.text}</p>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        <div className="space-y-6">
          {/* Reviews */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="bg-card border-border rounded-2xl border p-5"
          >
            <div className="flex items-center justify-between">
              <SectionHead title="Awaiting your review" hint={`${reviews.length}`} />
              <Link
                to="/projects/$projectId/reviews"
                params={{ projectId }}
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-[11px] transition-colors"
              >
                Inbox
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="mt-3 space-y-2">
              {reviews.slice(0, 4).map((r) => (
                <li
                  key={r.id}
                  className="hover:bg-accent/50 flex items-center gap-3 rounded-xl p-2 transition-colors"
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
                    <div className="truncate text-xs font-medium">{r.title}</div>
                    <div className="text-muted-foreground truncate text-[10px]">
                      {r.type} · {r.at}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Activity */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-card border-border rounded-2xl border p-5"
          >
            <SectionHead title="Team activity" hint="last 24h" />
            <ul className="mt-3 space-y-3">
              {activity.slice(0, 5).map((a) => (
                <li key={a.id} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white",
                      a.color,
                    )}
                  >
                    {a.initials}
                  </span>
                  <div className="text-xs leading-relaxed">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                    <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[10px]">
                      <Clock className="h-3 w-3" />
                      {a.at}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Team */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="bg-card border-border rounded-2xl border p-5"
          >
            <SectionHead title="Team" hint="3 online" />
            <div className="mt-3 flex flex-wrap gap-2">
              {["AL", "KN", "MS", "TR", "IW"].map((i) => (
                <span
                  key={i}
                  className="bg-hero text-primary-foreground flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-semibold"
                >
                  {i}
                </span>
              ))}
              <button className="border-border text-muted-foreground hover:border-primary/40 hover:text-foreground flex h-9 w-9 items-center justify-center rounded-full border border-dashed text-sm transition-colors">
                +
              </button>
            </div>
            <div className="text-muted-foreground mt-3 flex items-center gap-1 text-[10px]">
              <Users className="h-3 w-3" />
              Producer · 2 designers · editor · reviewer
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex items-center gap-2">
      <Activity className="text-muted-foreground h-3.5 w-3.5" />
      <h3 className="text-sm font-semibold">{title}</h3>
      {hint && <span className="text-muted-foreground text-[10px]">· {hint}</span>}
    </div>
  );
}

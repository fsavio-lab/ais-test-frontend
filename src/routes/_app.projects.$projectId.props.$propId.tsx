import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Box,
  ChevronRight,
  Copy,
  RotateCcw,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import { Topbar } from "@/components/app/Topbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getProp, type Prop } from "@/lib/workspace-data";

export const Route = createFileRoute("/_app/projects/$projectId/props/$propId")({
  loader: ({ params }) => {
    const prop = getProp(params.projectId, params.propId);
    if (!prop) throw notFound();
    return { prop };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${(loaderData as { prop?: Prop } | undefined)?.prop?.name ?? "Prop"} · AIS` }],
  }),
  notFoundComponent: () => <div className="p-10 text-sm text-muted-foreground">Prop not found.</div>,
  errorComponent: () => <div className="p-10 text-sm text-destructive">Failed to load prop.</div>,
  component: PropDetail,
});

function PropDetail() {
  const { projectId } = Route.useParams();
  const { prop } = Route.useLoaderData() as { prop: Prop };
  const cover = prop.cover ?? "from-[#006466] to-[#4d194d]";

  return (
    <>
      <Topbar
        breadcrumbs={
          <>
            <Link to="/projects/$projectId/design" params={{ projectId }} className="hover:text-foreground transition-colors">Design Studio</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{prop.name}</span>
          </>
        }
        actions={
          <div className="flex items-center gap-1">
            <Button variant="hero" size="sm" className="rounded-xl">
              <Sparkles className="h-4 w-4" /> Use in project
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl">
              <Copy className="h-4 w-4" /> Duplicate
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl">
              <RotateCcw className="h-4 w-4" /> Regenerate
            </Button>
            <Button variant="ghost" size="icon" className="text-destructive rounded-xl">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="glass-strong shadow-elegant relative mb-6 overflow-hidden rounded-3xl">
          <div className="grid gap-0 md:grid-cols-[480px_1fr]">
            <div className={cn("aspect-video w-full bg-gradient-to-br md:aspect-auto md:min-h-[360px]", cover)}>
              <div className="bg-noise h-full w-full opacity-30" />
            </div>
            <div className="bg-aurora relative p-6 sm:p-8">
              <div className="bg-noise pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative">
                <div className="text-muted-foreground text-[10px] tracking-[0.18em] uppercase">Prop</div>
                <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">{prop.name}</h1>
                <p className="text-muted-foreground mt-1 text-sm capitalize">{prop.category}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-emerald-500/20 text-emerald-700 rounded-full px-2 py-0.5 text-[11px] font-medium">Approved</span>
                  <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px]">Generated 2 days ago</span>
                </div>
                <p className="text-muted-foreground mt-5 max-w-prose text-sm leading-relaxed">
                  {prop.description ?? "Reusable prop ready to drop into any scene with consistent lighting and angle."}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <Card title="Metadata">
              <Row label="Description" value={prop.description ?? "—"} />
              <Row label="Material" value="Brushed metal · matte chrome accents" />
              <Row label="Style" value="Cinematic, photorealistic" />
              <Row label="Tags" value={<div className="flex flex-wrap gap-1.5">{["hero","reusable","studio","approved"].map((t) => (
                <span key={t} className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px]">{t}</span>
              ))}</div>} />
            </Card>

            <Card title="Generation details">
              <Row label="Prompt" value={`Hero ${prop.category} prop, ${prop.name.toLowerCase()}, cinematic lighting, studio backdrop, ultra detail.`} />
              <Row label="Model" value="AIS Studio · v2.4 (HD)" />
              <Row label="Seed" value="930_410_221" />
              <Row label="Generated" value="2 days ago" />
            </Card>

            <Card title="Variants">
              <div className="grid grid-cols-3 gap-3">
                {["Front view", "Side view", "Perspective"].map((label, i) => (
                  <div key={label} className="space-y-2">
                    <div className={cn("aspect-video overflow-hidden rounded-xl bg-gradient-to-br",
                      ["from-[#006466] to-[#272640]","from-[#3e1f47] to-[#4d194d]","from-[#0b525b] to-[#1b3a4b]"][i])}>
                      <div className="bg-noise h-full w-full opacity-30" />
                    </div>
                    <div className="text-center text-[11px] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card title="Quick actions">
              <div className="flex flex-col gap-2">
                <Button variant="hero" className="rounded-xl justify-start"><Sparkles className="h-4 w-4" /> Use in scene</Button>
                <Button variant="ghost" className="rounded-xl justify-start"><Wand2 className="h-4 w-4" /> Generate variant</Button>
                <Button variant="ghost" className="rounded-xl justify-start"><Box className="h-4 w-4" /> Export 3D</Button>
              </div>
            </Card>
            <Card title="Usage">
              <div className="space-y-3">
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-widest uppercase">Projects</div>
                  <ul className="space-y-1.5 text-xs">
                    {["Neon Bloom", "Atlas Reborn"].map((s) => (
                      <li key={s} className="bg-muted/40 flex items-center justify-between rounded-lg px-3 py-2">
                        <span>{s}</span>
                        <ChevronRight className="text-muted-foreground h-3 w-3" />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] tracking-widest uppercase">Scenes</div>
                  <ul className="space-y-1.5 text-xs">
                    {["Opening — Rooftop", "First Verse", "Neon Walk"].map((s) => (
                      <li key={s} className="bg-muted/40 flex items-center justify-between rounded-lg px-3 py-2">
                        <span>{s}</span>
                        <ChevronRight className="text-muted-foreground h-3 w-3" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-card border-border rounded-2xl border p-5">
      <h2 className="font-display mb-4 text-sm font-semibold tracking-wide uppercase text-muted-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 text-sm">
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="text-foreground text-xs">{value}</div>
    </div>
  );
}

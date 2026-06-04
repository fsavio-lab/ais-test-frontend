import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ChevronRight,
  Copy,
  RotateCcw,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import { Topbar } from "@/components/app/Topbar";
import { Button } from "@/components/ui/button";
import { AssetThumb } from "@/components/studio/AssetThumb";
import { cn } from "@/lib/utils";
import { getCharacter, type Character } from "@/lib/workspace-data";

export const Route = createFileRoute("/_app/projects/$projectId/characters/$characterId")({
  loader: ({ params }) => {
    const character = getCharacter(params.projectId, params.characterId);
    if (!character) throw notFound();
    return { character };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${(loaderData as { character?: Character } | undefined)?.character?.name ?? "Character"} · AIS` }],
  }),
  notFoundComponent: () => <div className="p-10 text-sm text-muted-foreground">Character not found.</div>,
  errorComponent: () => <div className="p-10 text-sm text-destructive">Failed to load character.</div>,
  component: CharacterDetail,
});

function CharacterDetail() {
  const { projectId } = Route.useParams();
  const { character } = Route.useLoaderData() as { character: Character };

  return (
    <>
      <Topbar
        breadcrumbs={
          <>
            <Link to="/projects/$projectId/design" params={{ projectId }} className="hover:text-foreground transition-colors">Design Studio</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{character.name}</span>
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
          <div className="grid gap-0 md:grid-cols-[420px_1fr]">
            <div className="relative aspect-[3/4] w-full overflow-hidden md:aspect-auto md:min-h-[420px]">
              <AssetThumb kind="character" id={character.id} name={character.name} gradient={character.cover} aspect="absolute inset-0" eager />
            </div>
            <div className="bg-aurora relative p-6 sm:p-8">
              <div className="bg-noise pointer-events-none absolute inset-0 opacity-20" />
              <div className="relative">
                <div className="text-muted-foreground text-[10px] tracking-[0.18em] uppercase">Character</div>
                <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">{character.name}</h1>
                <p className="text-muted-foreground mt-1 text-sm">{character.role}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium capitalize",
                    character.status === "approved" && "bg-emerald-500/20 text-emerald-600",
                    character.status === "review" && "bg-amber-500/20 text-amber-700",
                    character.status === "draft" && "bg-muted text-muted-foreground")}>
                    {character.status}
                  </span>
                  <span className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[11px]">Created 3 days ago</span>
                </div>
                <p className="text-muted-foreground mt-5 max-w-prose text-sm leading-relaxed">
                  A leading character in the production, fully generated with consistent wardrobe sets and pose variations ready for scene composition.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {/* Metadata */}
            <Card title="Metadata">
              <Row label="Description" value="Reusable character with multiple wardrobes and poses for scene composition." />
              <Row label="Style" value="Cinematic noir, photorealistic" />
              <Row label="Tags" value={<div className="flex flex-wrap gap-1.5">{["lead","cyberpunk","brooding","studio"].map((t) => (
                <span key={t} className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-[10px]">{t}</span>
              ))}</div>} />
              <Row label="Wardrobes" value={<div className="flex flex-wrap gap-1.5">{character.wardrobes.map((w) => (
                <span key={w} className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px]">{w}</span>
              ))}</div>} />
            </Card>

            {/* Generation details */}
            <Card title="Generation details">
              <Row label="Prompt" value="A leading character, mid 30s, brooding, neo-noir cyberpunk, anamorphic, soft rim light." />
              <Row label="Negative prompt" value="blurry, low-detail, distorted face, extra limbs" />
              <Row label="Model" value="AIS Studio · v2.4 (HD)" />
              <Row label="Seed" value="184_233_902" />
              <Row label="Version" value="v3" />
            </Card>

            {/* Gallery */}
            <Card title="Gallery">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className={cn("aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br",
                    ["from-[#006466] to-[#272640]","from-[#272640] to-[#4d194d]","from-[#1b3a4b] to-[#3e1f47]","from-[#4d194d] to-[#006466]","from-[#0b525b] to-[#1b3a4b]","from-[#3e1f47] to-[#272640]","from-[#212f45] to-[#3e1f47]","from-[#4d194d] to-[#0b525b]"][i])}>
                    <div className="bg-noise h-full w-full opacity-30" />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Side rail */}
          <aside className="space-y-4">
            <Card title="Quick actions">
              <div className="flex flex-col gap-2">
                <Button variant="hero" className="rounded-xl justify-start"><Sparkles className="h-4 w-4" /> Use in scene</Button>
                <Button variant="ghost" className="rounded-xl justify-start"><Wand2 className="h-4 w-4" /> Generate variation</Button>
                <Button variant="ghost" className="rounded-xl justify-start"><Copy className="h-4 w-4" /> Duplicate</Button>
              </div>
            </Card>
            <Card title="Used in">
              <ul className="space-y-2 text-xs">
                {["Opening — Rooftop", "Backstage Tension", "First Verse"].map((s) => (
                  <li key={s} className="bg-muted/40 flex items-center justify-between rounded-lg px-3 py-2">
                    <span>{s}</span>
                    <ChevronRight className="text-muted-foreground h-3 w-3" />
                  </li>
                ))}
              </ul>
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

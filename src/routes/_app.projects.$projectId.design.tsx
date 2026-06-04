import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Box,
  BookOpen,
  ImageIcon,
  Library,
  Palette,
  Plus,
  Search,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CreateAssetSheet, type AssetKind } from "@/components/studio/CreateAssetSheet";
import { AssetThumb } from "@/components/studio/AssetThumb";
import { assetImage } from "@/lib/asset-images";
import {
  backgroundsByProject,
  charactersByProject,
  propsByProject,
  themesByProject,
} from "@/lib/workspace-data";


export const Route = createFileRoute("/_app/projects/$projectId/design")({
  component: DesignStudio,
});

const TABS = [
  { key: "all", label: "All assets", icon: Library },
  { key: "characters", label: "Characters", icon: Users },
  { key: "props", label: "Props", icon: Box },
  { key: "themes", label: "Themes", icon: Palette },
  { key: "backgrounds", label: "Backgrounds", icon: ImageIcon },
  { key: "references", label: "References", icon: Library },
  { key: "knowledge", label: "Knowledge Base", icon: BookOpen },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function DesignStudio() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("all");
  const [query, setQuery] = useState("");
  const [createKind, setCreateKind] = useState<AssetKind | null>(null);

  const goCharacter = () =>
    navigate({ to: "/projects/$projectId/generate/character", params: { projectId } });
  const goProp = () =>
    navigate({ to: "/projects/$projectId/generate/prop", params: { projectId } });

  const characters = charactersByProject[projectId] ?? charactersByProject.p_neon;
  const props = propsByProject[projectId] ?? propsByProject.p_neon;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Design Studio</h2>
          <p className="text-muted-foreground text-sm">
            Build the world. Reusable assets that power every scene.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-xl">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="glass" size="sm" className="rounded-xl" onClick={goProp}>
            <Plus className="h-4 w-4" />
            Generate Prop
          </Button>
          <Button variant="hero" size="sm" className="rounded-xl" onClick={goCharacter}>
            <Sparkles className="h-4 w-4" />
            Generate Character
          </Button>
        </div>
      </div>

      {/* Quick actions strip */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction
          icon={Users}
          title="Generate Character"
          hint="Lead, supporting, background — reusable across scenes"
          onClick={goCharacter}
          accent
        />
        <QuickAction
          icon={Box}
          title="Generate Prop"
          hint="Hero props, wardrobe, tech, set dressing"
          onClick={goProp}
        />
        <QuickAction
          icon={Palette}
          title="New Theme"
          hint="Era, mood, palette and atmosphere"
          onClick={() => setCreateKind("theme")}
        />
        <QuickAction
          icon={ImageIcon}
          title="New Background"
          hint="Environments with day, night & weather variants"
          onClick={() => setCreateKind("background")}
        />
      </div>

      {/* Tabs */}
      <div className="bg-card/60 mb-5 flex items-center gap-0.5 overflow-x-auto rounded-2xl border p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-xs whitespace-nowrap transition-colors",
              tab === t.key
                ? "bg-background text-foreground shadow-sm font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="h-3.5 w-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${tab === "all" ? "assets" : tab}…`}
          className="bg-card/60 h-10 rounded-xl pl-9"
        />
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {tab === "all" && (
          <div className="space-y-8">
            <SectionHeader title="Characters" count={characters.length} onCreate={goCharacter} createLabel="Generate character" />
            <CharactersGrid projectId={projectId} query={query} onCreate={goCharacter} />
            <SectionHeader title="Props" count={props.length} onCreate={goProp} createLabel="Generate prop" />
            <PropsGrid projectId={projectId} query={query} onCreate={goProp} />
          </div>
        )}
        {tab === "characters" && <CharactersGrid projectId={projectId} query={query} onCreate={goCharacter} />}
        {tab === "props" && <PropsGrid projectId={projectId} query={query} onCreate={goProp} />}
        {tab === "themes" && (
          <ThemesGrid
            projectId={projectId}
            query={query}
            onCreate={() => setCreateKind("theme")}
          />
        )}
        {tab === "backgrounds" && (
          <BackgroundsGrid
            projectId={projectId}
            query={query}
            onCreate={() => setCreateKind("background")}
          />
        )}
        {tab === "references" && <PlaceholderEmpty title="References" />}
        {tab === "knowledge" && <PlaceholderEmpty title="Knowledge Base" />}
      </motion.div>

      {createKind && (
        <CreateAssetSheet
          kind={createKind}
          open={!!createKind}
          onOpenChange={(o) => !o && setCreateKind(null)}
        />
      )}
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  hint,
  onClick,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  hint: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group bg-card border-border hover:border-primary/40 hover:shadow-elegant flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
        accent && "bg-aurora relative overflow-hidden",
      )}
    >
      {accent && <div className="bg-noise pointer-events-none absolute inset-0 opacity-20" />}
      <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", accent ? "bg-hero text-primary-foreground" : "bg-primary/10 text-primary")}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="relative min-w-0">
        <div className="text-sm font-medium">{title}</div>
        <div className="text-muted-foreground mt-0.5 truncate text-[11px]">{hint}</div>
      </div>
    </button>
  );
}

function SectionHeader({ title, count, onCreate, createLabel }: { title: string; count: number; onCreate: () => void; createLabel: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-xs">{count} generated</p>
      </div>
      <Button variant="ghost" size="sm" className="rounded-xl" onClick={onCreate}>
        <Plus className="h-4 w-4" /> {createLabel}
      </Button>
    </div>
  );
}

function NewTile({ label, hint, onClick }: { label: string; hint: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="border-border hover:border-primary/40 bg-card/40 text-muted-foreground hover:text-foreground group flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed p-6 transition-colors"
    >
      <div className="bg-hero text-primary-foreground flex h-10 w-10 items-center justify-center rounded-2xl">
        <Plus className="h-5 w-5" />
      </div>
      <div className="text-xs font-medium">{label}</div>
      <div className="text-[10px]">{hint}</div>
    </button>
  );
}


function CharactersGrid({
  projectId,
  query,
  onCreate,
}: {
  projectId: string;
  query: string;
  onCreate: () => void;
}) {
  const list = (charactersByProject[projectId] ?? charactersByProject.p_neon).filter((c) =>
    `${c.name} ${c.role}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <button
        onClick={onCreate}
        className="border-border hover:border-primary/40 group bg-card/40 flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="bg-hero text-primary-foreground flex h-10 w-10 items-center justify-center rounded-2xl">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="text-xs font-medium">Generate character</div>
        <div className="text-[10px]">Dedicated workflow</div>
      </button>

      {list.map((c) => (
        <Link
          key={c.id}
          to="/projects/$projectId/characters/$characterId"
          params={{ projectId, characterId: c.id }}
          className="group bg-card border-border hover:shadow-elegant hover:border-primary/40 relative overflow-hidden rounded-2xl border transition-all"
        >
          <AssetThumb kind="character" id={c.id} name={c.name} gradient={c.cover} aspect="aspect-[3/4]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="font-display truncate text-sm font-semibold">{c.name}</div>
                <div className="truncate text-[10px] text-white/70">{c.role}</div>
              </div>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9px] font-medium capitalize",
                  c.status === "approved" && "bg-emerald-500/30 text-emerald-100",
                  c.status === "review" && "bg-amber-500/30 text-amber-100",
                  c.status === "draft" && "bg-white/15 text-white/80",
                )}
              >
                {c.status}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {c.wardrobes.map((w) => (
                <span
                  key={w}
                  className="bg-white/15 text-white/90 rounded-full px-1.5 py-0.5 text-[9px]"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ThemesGrid({
  projectId,
  query,
  onCreate,
}: {
  projectId: string;
  query: string;
  onCreate: () => void;
}) {
  const list = (themesByProject[projectId] ?? themesByProject.p_neon).filter((t) =>
    `${t.name} ${t.era} ${t.mood}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <NewTile label="New theme" hint="Era · Mood · Palette" onClick={onCreate} />

      {list.map((t) => (
        <div
          key={t.id}
          className="bg-card border-border hover:shadow-elegant overflow-hidden rounded-2xl border transition-all"
        >
          {assetImage("theme", t.id) ? (
            <div className="relative h-32 w-full overflow-hidden">
              <img src={assetImage("theme", t.id)!} alt={t.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex h-6">
                {t.palette.map((c) => <div key={c} className="flex-1" style={{ background: c }} />)}
              </div>
            </div>
          ) : (
            <div className="flex h-24">
              {t.palette.map((c) => (
                <div key={c} className="flex-1" style={{ background: c }} />
              ))}
            </div>
          )}
          <div className="p-4">
            <div className="font-display text-base font-semibold">{t.name}</div>
            <div className="text-muted-foreground mt-1 text-xs">{t.era} · {t.mood}</div>
            <div className="mt-3 flex flex-wrap gap-1">
              {t.palette.map((c) => (
                <span
                  key={c}
                  className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 font-mono text-[10px]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BackgroundsGrid({
  projectId,
  query,
  onCreate,
}: {
  projectId: string;
  query: string;
  onCreate: () => void;
}) {
  const list = (backgroundsByProject[projectId] ?? backgroundsByProject.p_neon).filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <button
        onClick={onCreate}
        className="border-border hover:border-primary/40 bg-card/40 text-muted-foreground hover:text-foreground flex aspect-video flex-col items-center justify-center gap-1 rounded-2xl border border-dashed transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span className="text-xs font-medium">New background</span>
      </button>

      {list.map((b) => (
        <div
          key={b.id}
          className="group bg-card border-border hover:shadow-elegant relative overflow-hidden rounded-2xl border transition-all"
        >
          <AssetThumb kind="background" id={b.id} name={b.name} gradient={b.cover} aspect="aspect-video" />
          <div className="p-3">
            <div className="truncate text-sm font-medium">{b.name}</div>
            <div className="mt-1 flex flex-wrap gap-1">
              {b.variants.map((v) => (
                <span
                  key={v}
                  className="bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 text-[9px]"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PropsGrid({
  projectId,
  query,
  onCreate,
}: {
  projectId: string;
  query: string;
  onCreate: () => void;
}) {
  const list = (propsByProject[projectId] ?? propsByProject.p_neon).filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <button
        onClick={onCreate}
        className="border-border hover:border-primary/40 bg-card/40 text-muted-foreground hover:text-foreground flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed transition-colors"
      >
        <div className="bg-hero text-primary-foreground flex h-10 w-10 items-center justify-center rounded-2xl">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="text-xs font-medium">Generate prop</span>
        <span className="text-[10px]">Dedicated workflow</span>
      </button>

      {list.map((p) => (
        <Link
          key={p.id}
          to="/projects/$projectId/props/$propId"
          params={{ projectId, propId: p.id }}
          className="group bg-card border-border hover:border-primary/40 hover:shadow-elegant relative overflow-hidden rounded-2xl border transition-all"
        >
          {assetImage("prop", p.id) ? (
            <AssetThumb kind="prop" id={p.id} name={p.name} gradient={p.cover} aspect="aspect-square" />
          ) : (
            <div className={cn("aspect-square w-full bg-gradient-to-br", p.cover ?? "from-[#006466] to-[#272640]")}>
              <div className="bg-noise h-full w-full opacity-25" />
              <div className="flex h-full items-center justify-center">
                <Box className="h-8 w-8 text-white/40 transition-transform group-hover:scale-110" />
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-white">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-[10px] capitalize text-white/70">{p.category}</div>
              </div>
              <span className="bg-emerald-500/30 text-emerald-100 rounded-full px-1.5 py-0.5 text-[9px] font-medium">
                approved
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function PlaceholderEmpty({ title }: { title: string }) {
  return (
    <div className="glass-strong text-muted-foreground flex flex-col items-center justify-center rounded-3xl p-16 text-center">
      <Library className="mb-3 h-6 w-6" />
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-xs">
        Upload images, PDFs, moodboards or notes to power AI workflows.
      </p>
      <Button variant="hero" size="sm" className="mt-4 rounded-xl">
        <Upload className="h-4 w-4" />
        Upload assets
      </Button>
    </div>
  );
}

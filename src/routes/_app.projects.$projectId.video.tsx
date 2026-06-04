import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Aperture,
  Camera,
  Check,
  Film,
  Image as ImageIcon,
  LayoutGrid,
  Lightbulb,
  Link2,
  MessageSquare,
  Palette,
  Play,
  Plus,
  Sparkles,
  Users,
  Wand2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  backgroundsByProject,
  charactersByProject,
  propsByProject,
  scenesByProject,
  themesByProject,
} from "@/lib/workspace-data";

export const Route = createFileRoute("/_app/projects/$projectId/video")({
  component: VideoStudio,
});

const MODES = [
  { key: "scene", label: "Scene builder", icon: LayoutGrid },
  { key: "storyboard", label: "Storyboard", icon: Film },
  { key: "render", label: "Render", icon: Sparkles },
] as const;
type Mode = (typeof MODES)[number]["key"];

function VideoStudio() {
  const { projectId } = Route.useParams();
  const scenes = scenesByProject[projectId] ?? scenesByProject.p_neon;
  const characters = charactersByProject[projectId] ?? charactersByProject.p_neon;
  const backgrounds = backgroundsByProject[projectId] ?? backgroundsByProject.p_neon;
  const props = propsByProject[projectId] ?? propsByProject.p_neon;
  const themes = themesByProject[projectId] ?? themesByProject.p_neon;

  const [mode, setMode] = useState<Mode>("scene");
  const [selected, setSelected] = useState(scenes[0]?.id ?? "");
  const active = scenes.find((s) => s.id === selected) ?? scenes[0];

  // Per-scene asset references (mock)
  const [refs, setRefs] = useState({
    theme: themes[0]?.id ?? "",
    background: backgrounds[0]?.id ?? "",
    characters: [characters[0]?.id].filter(Boolean) as string[],
    props: [] as string[],
  });

  const toggle = (key: "characters" | "props", id: string) =>
    setRefs((r) => ({
      ...r,
      [key]: r[key].includes(id) ? r[key].filter((x) => x !== id) : [...r[key], id],
    }));

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Video Studio</h2>
          <p className="text-muted-foreground text-sm">
            Compose scenes. Generate storyboards. Render video.
          </p>
        </div>
        <div className="bg-card/60 inline-flex items-center gap-0.5 rounded-xl border p-1">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors",
                mode === m.key
                  ? "bg-background text-foreground shadow-sm font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <m.icon className="h-3.5 w-3.5" /> {m.label}
            </button>
          ))}
        </div>
      </div>

      {mode === "scene" && (
        <SceneBuilder
          scenes={scenes}
          active={active}
          selected={selected}
          setSelected={setSelected}
          characters={characters}
          backgrounds={backgrounds}
          props={props}
          themes={themes}
          refs={refs}
          setRefs={setRefs}
          toggle={toggle}
        />
      )}

      {mode === "storyboard" && <StoryboardView active={active} />}

      {mode === "render" && <RenderView active={active} />}
    </div>
  );
}

/* ---------------- Scene Builder ---------------- */

function SceneBuilder({
  scenes,
  active,
  selected,
  setSelected,
  characters,
  backgrounds,
  props,
  themes,
  refs,
  setRefs,
  toggle,
}: any) {
  const selectedTheme = themes.find((t: any) => t.id === refs.theme);
  const selectedBg = backgrounds.find((b: any) => b.id === refs.background);
  const refCharacters = characters.filter((c: any) => refs.characters.includes(c.id));
  const refProps = props.filter((p: any) => refs.props.includes(p.id));

  return (
    <div className="bg-card border-border grid h-[680px] grid-cols-[300px_1fr_320px] overflow-hidden rounded-3xl border">
      {/* LEFT: references picker */}
      <div className="border-border flex flex-col overflow-y-auto border-r">
        <div className="border-border border-b p-3">
          <div className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
            Scenes
          </div>
        </div>
        <div className="max-h-44 overflow-y-auto p-2">
          {scenes.map((s: any) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={cn(
                "hover:bg-accent w-full rounded-xl p-2 text-left transition-colors",
                selected === s.id && "bg-accent",
              )}
            >
              <div className="flex items-center gap-2">
                <div className="bg-hero text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-lg">
                  <Film className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium">{s.name}</div>
                  <div className="text-muted-foreground truncate text-[10px]">
                    {s.duration} · {s.background}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="border-border space-y-4 border-t p-3">
          <RefSection icon={Palette} title="Theme">
            <select
              value={refs.theme}
              onChange={(e) => setRefs({ ...refs, theme: e.target.value })}
              className="bg-background w-full rounded-lg border p-2 text-xs"
            >
              {themes.map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.name} · {t.era}
                </option>
              ))}
            </select>
          </RefSection>

          <RefSection icon={ImageIcon} title="Background">
            <select
              value={refs.background}
              onChange={(e) => setRefs({ ...refs, background: e.target.value })}
              className="bg-background w-full rounded-lg border p-2 text-xs"
            >
              {backgrounds.map((b: any) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </RefSection>

          <RefSection icon={Users} title="Characters">
            <div className="grid grid-cols-3 gap-1.5">
              {characters.map((c: any) => {
                const on = refs.characters.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle("characters", c.id)}
                    className={cn(
                      "group relative overflow-hidden rounded-lg border transition-all",
                      on ? "ring-primary ring-2 border-transparent" : "border-border",
                    )}
                    title={c.name}
                  >
                    <div className={cn("aspect-square bg-gradient-to-br", c.cover)}>
                      <div className="bg-noise h-full w-full opacity-30" />
                    </div>
                    {on && (
                      <span className="bg-primary text-primary-foreground absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full">
                        <Check className="h-2.5 w-2.5" />
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 truncate bg-black/60 px-1 py-0.5 text-[8px] text-white">
                      {c.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </RefSection>

          <RefSection icon={Link2} title="Props">
            <div className="flex flex-wrap gap-1">
              {props.map((p: any) => {
                const on = refs.props.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggle("props", p.id)}
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] transition-colors",
                      on
                        ? "bg-primary text-primary-foreground border-transparent"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {p.name}
                  </button>
                );
              })}
            </div>
          </RefSection>
        </div>
      </div>

      {/* CENTER: canvas */}
      <div className="bg-aurora relative flex flex-col">
        <div className="border-border bg-card/60 flex items-center gap-2 border-b px-4 py-2">
          <span className="text-xs font-medium">{active?.name}</span>
          <span className="text-muted-foreground text-[10px]">· {active?.duration}</span>
          {selectedTheme && (
            <span className="bg-primary/10 text-primary ml-2 rounded-full px-2 py-0.5 text-[10px]">
              Theme · {selectedTheme.name}
            </span>
          )}
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-lg h-7 w-7">
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button variant="hero" size="sm" className="rounded-lg h-7">
              <Play className="h-3 w-3" /> Preview
            </Button>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="grid-lines absolute inset-0 opacity-50" />
          <div className="absolute top-1/2 left-1/2 aspect-video w-[82%] -translate-x-1/2 -translate-y-1/2">
            <div className="bg-card glass-strong shadow-elegant relative h-full w-full overflow-hidden rounded-2xl">
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-90",
                  selectedBg?.cover ?? "from-[#006466] to-[#4d194d]",
                )}
              />
              <div className="bg-noise absolute inset-0 opacity-30" />
              <div className="absolute inset-0 flex items-end justify-between p-5">
                <div className="text-white">
                  <div className="text-[10px] tracking-widest uppercase opacity-80">
                    Scene preview
                  </div>
                  <div className="font-display mt-1 text-2xl font-semibold">{active?.name}</div>
                  <div className="text-xs opacity-80">
                    {refCharacters.map((c: any) => c.name).join(" · ") || "No characters"} —{" "}
                    {selectedBg?.name}
                  </div>
                </div>
                <div className="glass text-white rounded-xl px-3 py-2 text-xs">
                  f/1.8 · 35mm · Dolly-in
                </div>
              </div>
              {refCharacters.map((_c: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="glass absolute h-24 w-16 rounded-xl border border-white/40"
                  style={{ left: `${22 + i * 18}%`, top: `${28 + (i % 2) * 14}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Referenced assets strip */}
        <div className="border-border bg-card/70 border-t px-4 py-3">
          <div className="text-muted-foreground mb-2 flex items-center justify-between text-[10px]">
            <span className="flex items-center gap-1.5">
              <Link2 className="h-3 w-3" /> Referenced assets · reused from library
            </span>
            <span>
              {refCharacters.length} chars · {refProps.length} props
            </span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto">
            {refCharacters.map((c: any) => (
              <Chip key={c.id} label={c.name} hint="Character" />
            ))}
            {refProps.map((p: any) => (
              <Chip key={p.id} label={p.name} hint="Prop" />
            ))}
            {selectedBg && <Chip label={selectedBg.name} hint="Background" />}
            {selectedTheme && <Chip label={selectedTheme.name} hint="Theme" />}
          </div>
        </div>
      </div>

      {/* RIGHT: properties */}
      <div className="border-border flex flex-col overflow-y-auto border-l">
        <div className="border-border border-b p-3">
          <div className="text-muted-foreground text-[10px] font-medium tracking-[0.18em] uppercase">
            Properties
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <PropertyGroup icon={Camera} title="Camera">
            <PropertyRow label="Lens" value="35mm" />
            <PropertyRow label="Aperture" value="f/1.8" />
            <PropertyRow label="Distance" value="2.4m" />
            <SliderRow label="Depth of field" />
          </PropertyGroup>
          <PropertyGroup icon={Lightbulb} title="Lighting">
            <PropertyRow label="Key" value="Warm 3200K" />
            <PropertyRow label="Fill" value="Cool 5600K" />
            <PropertyRow label="Back" value="Magenta" />
            <SliderRow label="Mood intensity" />
          </PropertyGroup>
          <PropertyGroup icon={Aperture} title="Motion">
            <PropertyRow label="Camera move" value="Dolly-in" />
            <PropertyRow label="Speed" value="0.6×" />
          </PropertyGroup>
          <PropertyGroup icon={Sparkles} title="AI Assistant">
            <div className="bg-aurora text-foreground rounded-xl p-3 text-[11px]">
              The selected theme suggests a magenta rim and rain on glass. Apply for stronger
              continuity with Scene 02.
            </div>
            <Button variant="glass" size="sm" className="mt-2 w-full rounded-xl">
              <Wand2 className="h-3.5 w-3.5" /> Apply suggestion
            </Button>
          </PropertyGroup>
          <PropertyGroup icon={MessageSquare} title="Comments">
            <div className="text-muted-foreground text-[11px]">No comments yet.</div>
          </PropertyGroup>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Storyboard ---------------- */

function StoryboardView({ active }: any) {
  const frames = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        cover: [
          "from-[#006466] to-[#272640]",
          "from-[#272640] to-[#4d194d]",
          "from-[#1b3a4b] to-[#3e1f47]",
          "from-[#0b525b] to-[#1b3a4b]",
          "from-[#3e1f47] to-[#006466]",
          "from-[#4d194d] to-[#0b525b]",
          "from-[#212f45] to-[#272640]",
          "from-[#006466] to-[#3e1f47]",
        ][i % 8],
        shot: ["Wide", "Medium", "Close", "Over-shoulder", "Drone", "Tracking", "Pan", "Macro"][i],
        dur: ["0:02", "0:03", "0:04", "0:02", "0:05", "0:03", "0:02", "0:04"][i],
      })),
    [],
  );

  return (
    <div className="bg-card border-border rounded-3xl border p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
            Storyboard
          </div>
          <div className="font-display text-xl font-semibold">{active?.name}</div>
          <div className="text-muted-foreground text-xs">
            {frames.length} frames · generated from referenced assets
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-xl">
            <Plus className="h-4 w-4" /> Add frame
          </Button>
          <Button variant="hero" size="sm" className="rounded-xl">
            <Wand2 className="h-4 w-4" /> Regenerate storyboard
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {frames.map((f) => (
          <div
            key={f.id}
            className="group border-border bg-background hover:shadow-elegant overflow-hidden rounded-2xl border transition-all"
          >
            <div className={cn("relative aspect-video bg-gradient-to-br", f.cover)}>
              <div className="bg-noise absolute inset-0 opacity-30" />
              <span className="bg-background/80 text-foreground absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-medium">
                Frame {f.id}
              </span>
              <span className="absolute top-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white">
                {f.dur}
              </span>
            </div>
            <div className="p-3">
              <div className="text-xs font-medium">{f.shot} shot</div>
              <div className="text-muted-foreground mt-0.5 line-clamp-2 text-[11px]">
                {active?.characters?.join(" & ") ?? "Character"} mid-frame, rim-lit by magenta
                neon, rain on glass.
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-foreground text-[10px]">35mm · f/1.8</span>
                <Button variant="ghost" size="sm" className="h-7 rounded-lg text-[10px]">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Render ---------------- */

function RenderView({ active }: any) {
  const [prompt, setPrompt] = useState(
    "Cinematic dolly-in on Detective Arjun under rain-soaked neon, magenta rim, 35mm, anamorphic flare.",
  );
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
      <div className="bg-card border-border rounded-3xl border p-5">
        <div className="mb-4">
          <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
            Render preview
          </div>
          <div className="font-display text-xl font-semibold">{active?.name}</div>
        </div>
        <div className="from-[#006466] to-[#4d194d] relative aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br">
          <div className="bg-noise absolute inset-0 opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button variant="glass" size="lg" className="rounded-2xl">
              <Play className="h-4 w-4" /> Play preview
            </Button>
          </div>
          <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-[10px] text-white/90">
            <span>00:00 / 00:24</span>
            <span>1080p · 24fps · v3</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <Stat label="Renders" value="4" />
          <Stat label="Approved" value="2" />
          <Stat label="Avg time" value="38s" />
        </div>
      </div>

      <div className="bg-card border-border space-y-4 rounded-3xl border p-5">
        <div>
          <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
            Prompt builder
          </div>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="mt-2 rounded-xl"
          />
          <div className="text-muted-foreground mt-2 flex items-center gap-1.5 text-[10px]">
            <Sparkles className="h-3 w-3" /> AI enhancement adds scene refs, camera & lighting.
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-muted-foreground text-[10px] tracking-widest uppercase">
            Source
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Scene", "Storyboard", "Prompt"].map((s, i) => (
              <button
                key={s}
                className={cn(
                  "rounded-xl border px-3 py-2 text-xs transition-colors",
                  i === 0
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <Button variant="hero" className="w-full rounded-xl">
          <Sparkles className="h-4 w-4" /> Generate video
        </Button>
        <Button variant="ghost" className="w-full rounded-xl">
          Send to Review Inbox
        </Button>
      </div>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function Chip({ label, hint }: { label: string; hint: string }) {
  return (
    <span className="bg-background border-border inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px]">
      <span className="text-muted-foreground">{hint}</span>
      <span className="font-medium">{label}</span>
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background/60 border-border rounded-xl border p-3">
      <div className="font-display text-xl font-semibold">{value}</div>
      <div className="text-muted-foreground text-[10px]">{label}</div>
    </div>
  );
}

function RefSection({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-muted-foreground mb-1.5 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.18em] uppercase">
        <Icon className="h-3 w-3" /> {title}
      </div>
      {children}
    </div>
  );
}

function PropertyGroup({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="text-foreground mb-2 flex items-center gap-2 text-[11px] font-semibold">
        <Icon className="h-3.5 w-3.5" /> {title}
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function SliderRow({ label }: { label: string }) {
  return (
    <div className="pt-1">
      <div className="text-muted-foreground mb-1.5 text-[11px]">{label}</div>
      <Slider defaultValue={[55]} max={100} step={1} />
    </div>
  );
}

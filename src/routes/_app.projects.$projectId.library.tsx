import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter, Library, Search, Star } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AssetThumb } from "@/components/studio/AssetThumb";
import type { AssetKindKey } from "@/lib/asset-images";
import {
  backgroundsByProject,
  charactersByProject,
  propsByProject,
  scenesByProject,
  themesByProject,
} from "@/lib/workspace-data";

export const Route = createFileRoute("/_app/projects/$projectId/library")({
  component: AssetLibrary,
});

const CATEGORIES = [
  "All",
  "Characters",
  "Themes",
  "Backgrounds",
  "Props",
  "Scenes",
  "Storyboards",
  "Videos",
] as const;

function AssetLibrary() {
  const { projectId } = Route.useParams();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");

  const all: { id: string; name: string; kind: string; assetKind?: AssetKindKey; cover: string }[] = [
    ...(charactersByProject[projectId] ?? charactersByProject.p_neon).map((c) => ({
      id: c.id,
      name: c.name,
      kind: "Characters",
      assetKind: "character" as AssetKindKey | undefined,
      cover: c.cover,
    })),
    ...(themesByProject[projectId] ?? themesByProject.p_neon).map((t) => ({
      id: t.id,
      name: t.name,
      kind: "Themes",
      assetKind: "theme" as AssetKindKey | undefined,
      cover: "from-[#272640] to-[#4d194d]",
    })),
    ...(backgroundsByProject[projectId] ?? backgroundsByProject.p_neon).map((b) => ({
      id: b.id,
      name: b.name,
      kind: "Backgrounds",
      assetKind: "background" as AssetKindKey | undefined,
      cover: b.cover,
    })),
    ...(propsByProject[projectId] ?? propsByProject.p_neon).map((p) => ({
      id: p.id,
      name: p.name,
      kind: "Props",
      assetKind: "prop" as AssetKindKey | undefined,
      cover: "from-[#006466] to-[#272640]",
    })),
    ...(scenesByProject[projectId] ?? scenesByProject.p_neon).map((s) => ({
      id: s.id,
      name: s.name,
      kind: "Scenes",
      assetKind: undefined as AssetKindKey | undefined,
      cover: "from-[#1b3a4b] to-[#3e1f47]",
    })),
  ];

  const filtered = all.filter((a) => {
    if (cat !== "All" && a.kind !== cat) return false;
    if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Asset Library</h2>
          <p className="text-muted-foreground text-sm">
            Single source of truth across the workspace.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="rounded-xl">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="ghost" size="sm" className="rounded-xl">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the library…"
            className="bg-card/60 h-10 rounded-xl pl-9"
          />
        </div>
        <div className="bg-card/60 flex items-center gap-0.5 overflow-x-auto rounded-xl border p-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                cat === c
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-muted-foreground glass-strong flex flex-col items-center justify-center rounded-3xl p-16 text-center">
          <Library className="mb-3 h-6 w-6" />
          <p className="text-sm">Nothing matches your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((a) => (
            <div
              key={a.kind + a.id}
              className="group bg-card border-border hover:shadow-elegant relative overflow-hidden rounded-2xl border transition-all"
            >
              {a.assetKind ? (
                <AssetThumb
                  kind={a.assetKind}
                  id={a.id}
                  name={a.name}
                  gradient={a.cover}
                  aspect="aspect-square"
                />
              ) : (
                <div className={cn("aspect-square w-full bg-gradient-to-br", a.cover)}>
                  <div className="bg-noise h-full w-full opacity-25" />
                </div>
              )}
              <div className="p-2.5">
                <div className="truncate text-xs font-medium">{a.name}</div>
                <div className="text-muted-foreground mt-0.5 flex items-center justify-between text-[10px]">
                  <span>{a.kind}</span>
                  <Star className="hover:text-foreground h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

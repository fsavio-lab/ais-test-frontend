import {
  Box,
  Image as ImageIcon,
  Palette,
  Plus,
  Sparkles,
  Upload,
  Users,
  Wand2,
  X,
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type AssetKind = "character" | "theme" | "background" | "prop";

const KIND_META: Record<
  AssetKind,
  { title: string; sub: string; icon: ComponentType<{ className?: string }> }
> = {
  character: {
    title: "Create character",
    sub: "Reusable across every scene with wardrobes, poses and props.",
    icon: Users,
  },
  theme: {
    title: "Create theme",
    sub: "Defines world era, mood and atmosphere for the production.",
    icon: Palette,
  },
  background: {
    title: "Create background",
    sub: "Reusable environment with day, night, rain and fog variants.",
    icon: ImageIcon,
  },
  prop: {
    title: "Create prop",
    sub: "Vehicles, tech, wardrobe — referenced anywhere in the universe.",
    icon: Box,
  },
};

const CHIPS: Record<AssetKind, string[]> = {
  character: ["Portrait", "Expressions", "Poses", "Wardrobes", "Props", "Versions"],
  theme: ["Era", "Architecture", "Weather", "Lighting", "Color"],
  background: ["Day", "Night", "Fog", "Rain", "Wide", "Medium", "Close"],
  prop: ["Hero", "Variants", "Materials", "Wear & tear"],
};

export function CreateAssetSheet({
  kind,
  open,
  onOpenChange,
}: {
  kind: AssetKind;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const meta = KIND_META[kind];
  const Icon = meta.icon;
  const [prompt, setPrompt] = useState("");
  const [name, setName] = useState("");
  const [outputs, setOutputs] = useState<string[]>(CHIPS[kind].slice(0, 4));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="bg-background/95 w-full overflow-y-auto p-0 backdrop-blur-xl sm:max-w-[560px]"
      >
        {/* Hero */}
        <div className="bg-aurora relative overflow-hidden border-b p-6">
          <div className="bg-noise pointer-events-none absolute inset-0 opacity-30" />
          <SheetHeader className="relative">
            <div className="bg-hero text-primary-foreground mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl">
              <Icon className="h-5 w-5" />
            </div>
            <SheetTitle className="font-display text-2xl">{meta.title}</SheetTitle>
            <SheetDescription className="text-sm">{meta.sub}</SheetDescription>
          </SheetHeader>
        </div>

        <div className="space-y-5 p-6">
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                kind === "character"
                  ? "e.g. Detective Arjun"
                  : kind === "theme"
                    ? "e.g. Neo Mumbai 2095"
                    : kind === "background"
                      ? "e.g. Rainy Neon Street"
                      : "e.g. Hover Bike"
              }
              className="h-11 rounded-xl"
            />
          </div>

          {/* Kind-specific fast fields */}
          {kind === "character" && (
            <div className="grid grid-cols-2 gap-3">
              <FieldSelect label="Age" value="35" options={["18", "25", "35", "45", "60+"]} />
              <FieldSelect
                label="Personality"
                value="Serious"
                options={["Serious", "Playful", "Stoic", "Charismatic", "Mysterious"]}
              />
              <FieldSelect
                label="Ethnicity"
                value="Asian"
                options={["Asian", "Black", "Latine", "White", "Mixed", "Other"]}
              />
              <FieldSelect
                label="Setting"
                value="Cyberpunk"
                options={["Cyberpunk", "Noir", "Fantasy", "Modern", "Historic"]}
              />
            </div>
          )}
          {kind === "theme" && (
            <div className="grid grid-cols-2 gap-3">
              <FieldSelect label="Era" value="2099" options={["1920s", "Now", "Near-future", "2099", "Far-future"]} />
              <FieldSelect label="Mood" value="Electric" options={["Calm", "Electric", "Brooding", "Hopeful", "Tense"]} />
              <FieldSelect label="Weather" value="Rain" options={["Clear", "Rain", "Fog", "Snow", "Storm"]} />
              <FieldSelect
                label="Architecture"
                value="Brutalist Neo-Tokyo"
                options={["Brutalist Neo-Tokyo", "Classical", "Cyber-baroque", "Minimal", "Industrial"]}
              />
            </div>
          )}
          {kind === "background" && (
            <div className="grid grid-cols-2 gap-3">
              <FieldSelect label="Time" value="Night" options={["Dawn", "Day", "Dusk", "Night"]} />
              <FieldSelect label="Lens" value="35mm" options={["24mm", "35mm", "50mm", "85mm"]} />
            </div>
          )}
          {kind === "prop" && (
            <div className="grid grid-cols-2 gap-3">
              <FieldSelect
                label="Category"
                value="Vehicle"
                options={["Vehicle", "Tech", "Wardrobe", "Set dressing"]}
              />
              <FieldSelect label="Scale" value="Hero" options={["Hero", "Background", "Detail"]} />
            </div>
          )}

          {/* Prompt */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Prompt</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder={
                kind === "character"
                  ? "Male detective, age 35, cyberpunk setting, Asian ethnicity, serious personality"
                  : "Describe the world, lighting, atmosphere, references…"
              }
              className="rounded-xl"
            />
            <div className="text-muted-foreground flex items-center gap-2 text-[10px]">
              <Sparkles className="h-3 w-3" /> AI will enhance, build relationships and version
              outputs.
            </div>
          </div>

          {/* Sources */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Reference sources</Label>
            <div className="border-border bg-card/50 hover:border-primary/40 flex flex-col items-center justify-center rounded-2xl border border-dashed p-6 text-center transition-colors">
              <Upload className="text-muted-foreground h-5 w-5" />
              <p className="mt-2 text-sm font-medium">Drop images, sheets, PDFs, moodboards</p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">Up to 100MB · synced to Knowledge Base</p>
            </div>
          </div>

          {/* Output composition */}
          <div className="space-y-2">
            <Label className="text-xs font-medium">Generate outputs</Label>
            <div className="flex flex-wrap gap-2">
              {CHIPS[kind].map((c) => {
                const on = outputs.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() =>
                      setOutputs((o) => (on ? o.filter((x) => x !== c) : [...o, c]))
                    }
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[11px] transition-colors",
                      on
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {on ? <span className="mr-1">✓</span> : <Plus className="mr-1 inline h-3 w-3" />}
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual preview placeholder */}
          <div className="bg-card border-border rounded-2xl border p-3">
            <div className="text-muted-foreground mb-2 text-[10px] tracking-widest uppercase">
              Preview
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "aspect-square rounded-xl bg-gradient-to-br",
                    [
                      "from-[#006466] to-[#272640]",
                      "from-[#272640] to-[#4d194d]",
                      "from-[#1b3a4b] to-[#3e1f47]",
                      "from-[#4d194d] to-[#006466]",
                    ][i],
                  )}
                >
                  <div className="bg-noise h-full w-full rounded-xl opacity-30" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-background/90 border-border sticky bottom-0 flex items-center justify-between gap-2 border-t p-4 backdrop-blur-xl">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl">
            <X className="h-4 w-4" /> Cancel
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="rounded-xl">
              Save draft
            </Button>
            <Button
              variant="hero"
              className="rounded-xl"
              onClick={() => onOpenChange(false)}
            >
              <Wand2 className="h-4 w-4" /> Generate
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function FieldSelect({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: string[];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium">{label}</Label>
      <Select defaultValue={value}>
        <SelectTrigger className="h-10 rounded-xl">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

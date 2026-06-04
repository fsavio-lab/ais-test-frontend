import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_app/projects/$projectId/settings")({
  component: ProjectSettings,
});

function ProjectSettings() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
      <h2 className="font-display text-2xl font-semibold tracking-tight">Settings</h2>
      <p className="text-muted-foreground text-sm">Project configuration & governance.</p>

      <section className="bg-card border-border mt-6 rounded-2xl border p-5">
        <h3 className="text-sm font-semibold">General</h3>
        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Project name</Label>
            <Input defaultValue="Neon Bloom" className="h-10 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Brief</Label>
            <Textarea
              rows={3}
              defaultValue="An AI-native music film blending neo-Tokyo with intimate studio moments."
              className="rounded-xl"
            />
          </div>
        </div>
      </section>

      <section className="bg-card border-border mt-6 rounded-2xl border p-5">
        <h3 className="text-sm font-semibold">Permissions</h3>
        <div className="mt-4 space-y-3">
          {[
            { label: "Allow team to invite collaborators", on: true },
            { label: "Require approval before video render", on: true },
            { label: "Auto-watermark in-progress videos", on: false },
            { label: "Lock approved assets from edits", on: true },
          ].map((p) => (
            <div key={p.label} className="flex items-center justify-between">
              <span className="text-sm">{p.label}</span>
              <Switch defaultChecked={p.on} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-destructive/30 bg-destructive/5 mt-6 rounded-2xl border p-5">
        <h3 className="text-destructive text-sm font-semibold">Danger zone</h3>
        <p className="text-muted-foreground mt-1 text-xs">
          Archiving locks all assets and pauses workflows. Deletion is permanent.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="rounded-xl">
            Archive project
          </Button>
          <Button variant="destructive" className="rounded-xl">
            <Trash2 className="h-4 w-4" />
            Delete project
          </Button>
        </div>
      </section>
    </div>
  );
}

import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { ChevronRight, MoreHorizontal, Share2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Topbar } from "@/components/app/Topbar";
import { cn } from "@/lib/utils";
import { getProject, statusMeta, type Project } from "@/lib/workspace-data";

export const Route = createFileRoute("/_app/projects/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${(loaderData as { project?: { name: string } } | undefined)?.project?.name ?? "Project"} · AIS` },
      { name: "description", content: (loaderData as { project?: { client: string } } | undefined)?.project?.client ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="p-10 text-sm text-muted-foreground">Project not found.</div>
  ),
  errorComponent: () => (
    <div className="p-10 text-sm text-destructive">Something went wrong loading this project.</div>
  ),
  component: ProjectLayout,
});

const TABS = [
  { to: "/projects/$projectId" as const, label: "Overview", exact: true },
  { to: "/projects/$projectId/design" as const, label: "Design Studio" },
  { to: "/projects/$projectId/video" as const, label: "Video Studio" },
  { to: "/projects/$projectId/reviews" as const, label: "Review Inbox", badge: 5 },
  { to: "/projects/$projectId/library" as const, label: "Asset Library" },
  { to: "/projects/$projectId/settings" as const, label: "Settings" },
];

function ProjectLayout() {
  const { project } = Route.useLoaderData() as { project: Project };
  const path = useRouterState({ select: (s) => s.location.pathname });
  const base = `/projects/${project.id}`;
  const meta = statusMeta[project.status];

  return (
    <>
      <Topbar
        breadcrumbs={
          <>
            <Link to="/projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{project.name}</span>
            <span className={cn("ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium", meta.tone)}>
              {meta.label}
            </span>
          </>
        }
        actions={
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-xl" aria-label="Star">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl" aria-label="More">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      {/* Sub-nav */}
      <div className="bg-background/70 border-border sticky top-14 z-[5] border-b backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-0.5 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {TABS.map((t) => {
            const fullPath = t.exact ? base : `${base}/${t.to.split("/").pop()}`;
            const active = t.exact ? path === base : path.startsWith(fullPath);
            return (
              <Link
                key={t.label}
                to={t.to}
                params={{ projectId: project.id }}
                className={cn(
                  "relative flex items-center gap-2 px-3 py-3 text-xs whitespace-nowrap transition-colors",
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
                {t.badge != null && (
                  <span className="bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium">
                    {t.badge}
                  </span>
                )}
                {active && (
                  <span className="bg-hero absolute inset-x-2 bottom-0 h-[2px] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <Outlet />
    </>
  );
}

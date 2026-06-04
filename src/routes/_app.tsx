import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "@/components/app/Sidebar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="bg-background text-foreground relative flex min-h-dvh">
      <div className="bg-aurora pointer-events-none fixed inset-0 -z-10 opacity-30" />
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

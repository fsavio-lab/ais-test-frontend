import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Workflow } from "@/components/landing/Workflow";
import { Studio } from "@/components/landing/Studio";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AIS — AI-native Creative Production OS" },
      {
        name: "description",
        content:
          "The operating system for AI-native creative production. From script to scene to screen — orchestrate characters, sets and shots with cinematic workflows.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground relative min-h-dvh overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Studio />
      <CTA />
      <Footer />
    </main>
  );
}

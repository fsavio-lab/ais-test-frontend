import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { label: "Product", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "Studio", href: "#studio" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <nav className="glass-strong shadow-elegant flex w-full max-w-6xl items-center justify-between rounded-full px-2 py-2 pl-4 sm:px-3 sm:pl-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-hero text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">AIS</span>
          <span className="text-muted-foreground hidden text-xs sm:inline">· Creative OS</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-muted-foreground hover:bg-accent hover:text-foreground rounded-full px-3 py-1.5 text-sm transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle className="hidden rounded-full sm:inline-flex" />
          <Button variant="ghost" size="sm" className="hidden rounded-full sm:inline-flex" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button size="sm" variant="hero" className="rounded-full" asChild>
            <Link to="/register">Get access</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="font-display">Menu</SheetTitle>
              </SheetHeader>
              <ul className="mt-6 space-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="hover:bg-accent block rounded-xl px-3 py-2.5 text-sm font-medium"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="hover:bg-accent block rounded-xl px-3 py-2.5 text-sm font-medium"
                  >
                    Sign in
                  </Link>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}

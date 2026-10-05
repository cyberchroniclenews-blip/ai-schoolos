"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { logout } from "@/app/login/actions";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

const navigation: NavigationItem[] = [
  {
    label: "Overview",
    href: "/",
    description: "Your workspace at a glance",
  },
  {
    label: "Students",
    href: "/students",
    description: "Manage student records",
  },
  {
    label: "Teachers",
    href: "/teachers",
    description: "Manage teachers and staff",
  },
  {
    label: "Attendance",
    href: "/attendance",
    description: "Track daily attendance",
  },
  {
    label: "Exams",
    href: "/exams",
    description: "Manage exams and results",
  },
  {
    label: "Fees",
    href: "/fees",
    description: "Track school fees",
  },
  {
    label: "Reports",
    href: "/reports",
    description: "View school analytics",
  },
  {
    label: "AI Copilot",
    href: "/ai-copilot",
    description: "AI-powered school assistant",
  },
  {
    label: "School settings",
    href: "/settings",
    description: "Organization preferences",
  },
];

function getNavigationIcon(href: string) {
  switch (href) {
    case "/":
      return "▦";
    case "/students":
      return "♙";
    case "/teachers":
      return "♙";
    case "/attendance":
      return "✓";
    case "/exams":
      return "✎";
    case "/fees":
      return "₹";
    case "/reports":
      return "◫";
    case "/ai-copilot":
      return "✦";
    case "/settings":
      return "⚙";
    default:
      return "•";
  }
}

function Brand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 font-semibold text-ink"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-lg text-white shadow-sm">
        A
      </span>
      <span>
        AI School<span className="text-brand-600">OS</span>
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="space-y-1">
      {navigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-brand-50 text-brand-700"
              : "text-slate-600 hover:bg-slate-100 hover:text-ink"
          )}
        >
          <span
            aria-hidden="true"
            className="grid h-5 w-5 place-items-center text-sm"
          >
            {getNavigationIcon(item.href)}
          </span>

          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  if (pathname === "/login" || pathname === "/unauthorized") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white p-5 lg:flex lg:flex-col">
        <Brand />

        <div className="mt-10">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[.14em] text-slate-400">
            Workspace
          </p>

          <NavLinks />
        </div>

        <div className="mt-auto rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold text-slate-500">AI SCHOOL OS</p>

          <p className="mt-1 text-sm font-medium text-ink">
            Your school command center
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Manage students, teachers, attendance, exams, fees and analytics
            from one workspace.
          </p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 shadow-xl transition-transform lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between">
          <Brand />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            ×
          </Button>
        </div>

        <div className="mt-10">
          <NavLinks onNavigate={() => setOpen(false)} />
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            ☰
          </Button>

          <div className="hidden lg:block">
            <p className="text-sm font-medium text-ink">Good morning</p>
            <p className="text-xs text-slate-500">
              Here&apos;s your school workspace.
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span
              aria-label="Notifications"
              className="grid h-9 w-9 place-items-center rounded-lg text-slate-400"
            >
              ♧
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  aria-label="Open account summary"
                  className="flex items-center gap-2 rounded-lg p-1.5 text-left hover:bg-slate-100"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                    AS
                  </span>

                  <span className="hidden max-w-40 truncate text-sm font-medium text-ink sm:block">
                    {user?.email ?? "Account"}
                  </span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <form action={logout}>
                  <button
                    className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                    type="submit"
                  >
                    Sign out
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
} 
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/navigation";

const navigation: NavigationItem[] = [
  { label: "Overview", href: "/", description: "Your workspace at a glance" },
  { label: "School settings", href: "/settings", description: "Organization preferences" },
];

function Brand() { return <Link href="/" className="flex items-center gap-3 font-semibold text-ink"><span className="grid h-9 w-9 place-items-center rounded-xl bg-navy text-lg text-white shadow-sm">A</span><span>AI School<span className="text-brand-600">OS</span></span></Link>; }
function NavLinks({ onNavigate }: { onNavigate?: () => void }) { const pathname = usePathname(); return <nav aria-label="Main navigation" className="space-y-1">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={onNavigate} className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors", pathname === item.href ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-ink")}><span aria-hidden="true">{item.href === "/" ? "▦" : "⚙"}</span>{item.label}</Link>)}</nav>; }
export function AppShell({ children }: { children: ReactNode }) { const [open, setOpen] = useState(false); return <div className="min-h-screen bg-canvas"><aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white p-5 lg:flex lg:flex-col"><Brand /><div className="mt-10"><p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[.14em] text-slate-400">Workspace</p><NavLinks /></div><div className="mt-auto rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">FOUNDATION</p><p className="mt-1 text-sm font-medium text-ink">Built to grow with you</p><p className="mt-1 text-xs leading-5 text-slate-500">Core modules will appear here as they’re ready.</p></div></aside>
  {open && <div className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />}
  <aside className={cn("fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 shadow-xl transition-transform lg:hidden", open ? "translate-x-0" : "-translate-x-full")} aria-label="Mobile navigation"><div className="flex items-center justify-between"><Brand /><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close navigation">×</Button></div><div className="mt-10"><NavLinks onNavigate={() => setOpen(false)} /></div></aside>
  <div className="lg:pl-64"><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur sm:px-6"><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open navigation">☰</Button><div className="hidden lg:block"><p className="text-sm font-medium text-ink">Good morning</p><p className="text-xs text-slate-500">Here’s your school workspace.</p></div><div className="ml-auto flex items-center gap-2"><span aria-label="Notifications will be available in a future module" className="grid h-9 w-9 place-items-center rounded-lg text-slate-400">♧</span><DropdownMenu><DropdownMenuTrigger asChild><button aria-label="Open account summary" className="flex items-center gap-2 rounded-lg p-1.5 text-left hover:bg-slate-100"><span className="grid h-7 w-7 place-items-center rounded-full bg-navy text-xs font-bold text-white">AS</span><span className="hidden text-sm font-medium text-ink sm:block">Admin</span></button></DropdownMenuTrigger><DropdownMenuContent align="end"><p className="px-3 py-2 text-xs text-slate-500">Account controls coming soon</p></DropdownMenuContent></DropdownMenu></div></header><main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">{children}</main></div></div>; }

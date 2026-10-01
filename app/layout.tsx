import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { ToastProvider } from "@/components/states/toast";

export const metadata: Metadata = { title: "AI SchoolOS", description: "The operating system for modern schools." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><ToastProvider><AppShell>{children}</AppShell></ToastProvider></body></html>; }

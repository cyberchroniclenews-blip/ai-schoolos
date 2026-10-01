import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
const styles = { info: "border-brand-100 bg-brand-50 text-brand-800", success: "border-emerald-100 bg-emerald-50 text-emerald-800", error: "border-rose-100 bg-rose-50 text-rose-800" };
export function Alert({ className, variant = "info", ...props }: HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof styles }) { return <div role="alert" className={cn("rounded-lg border px-4 py-3 text-sm", styles[variant], className)} {...props} />; }

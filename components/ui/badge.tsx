import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
const styles = { default: "bg-brand-50 text-brand-700", success: "bg-emerald-50 text-emerald-700", warning: "bg-amber-50 text-amber-700", neutral: "bg-slate-100 text-slate-600" };
export function Badge({ className, variant = "default", ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof styles }) { return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", styles[variant], className)} {...props} />; }

import type { HTMLAttributes, TableHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) { return <div className="w-full overflow-x-auto"><table className={cn("w-full text-left text-sm", className)} {...props} /></div>; }
export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) { return <th className={cn("border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500", className)} {...props} />; }
export function TableCell({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) { return <td className={cn("border-b border-slate-100 px-4 py-3 text-slate-600", className)} {...props} />; }

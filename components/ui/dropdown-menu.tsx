"use client";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export function DropdownMenuContent({ className, sideOffset = 8, ...props }: DropdownMenuPrimitive.DropdownMenuContentProps) { return <DropdownMenuPrimitive.Portal><DropdownMenuPrimitive.Content sideOffset={sideOffset} className={cn("z-50 min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg", className)} {...props} /></DropdownMenuPrimitive.Portal>; }
export function DropdownMenuItem({ className, ...props }: DropdownMenuPrimitive.DropdownMenuItemProps) { return <DropdownMenuPrimitive.Item className={cn("cursor-pointer rounded-md px-3 py-2 text-sm text-slate-700 outline-none hover:bg-slate-50 focus:bg-slate-50", className)} {...props} />; }

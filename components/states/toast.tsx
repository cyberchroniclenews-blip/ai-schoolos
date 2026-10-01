"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
type Toast = { id: number; message: string };
const ToastContext = createContext<(message: string) => void>(() => undefined);
export function ToastProvider({ children }: { children: ReactNode }) { const [toasts, setToasts] = useState<Toast[]>([]); const toast = useCallback((message: string) => { const id = Date.now(); setToasts((current) => [...current, { id, message }]); window.setTimeout(() => setToasts((current) => current.filter((item) => item.id !== id)), 3500); }, []); return <ToastContext.Provider value={toast}>{children}<div className="fixed bottom-5 right-5 z-[60] space-y-2" aria-live="polite">{toasts.map((item) => <div key={item.id} className="rounded-lg bg-ink px-4 py-3 text-sm font-medium text-white shadow-lg">✓ {item.message}</div>)}</div></ToastContext.Provider>; }
export const useToast = () => ({ success: useContext(ToastContext) });

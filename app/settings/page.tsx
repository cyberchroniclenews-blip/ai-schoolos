import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isSupabaseConfigured } from "@/lib/env";

export default function SettingsPage() { return <div className="space-y-7"><section><p className="text-sm font-medium text-brand-600">WORKSPACE</p><h1 className="mt-2 text-3xl font-bold text-ink">School settings</h1><p className="mt-2 text-slate-600">Integration and workspace configuration will be added here as each capability is enabled.</p></section><Card><CardHeader><div><CardTitle>Data connection</CardTitle><p className="mt-1 text-sm text-slate-500">Supabase is configured through secure environment variables.</p></div><Badge variant={isSupabaseConfigured ? "success" : "neutral"}>{isSupabaseConfigured ? "CONFIGURED" : "NOT CONNECTED"}</Badge></CardHeader><CardContent><Alert variant="info">No database actions are available in this foundation phase. Configure browser-safe values locally in <code className="font-semibold">.env.local</code>; keep service credentials server-only.</Alert></CardContent></Card></div>; }

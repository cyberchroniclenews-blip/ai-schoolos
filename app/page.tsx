import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/states/empty-state";

const principles = [
  ["A calm command center", "A deliberately focused workspace with room for the modules your school needs."],
  ["Tenant-aware by design", "Every future school record can be scoped to a secure organization context."],
  ["Ready for connected data", "A clean boundary is in place for a future Supabase integration."],
];
export default function OverviewPage() { return <div className="space-y-7"><section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><Badge>WORKSPACE FOUNDATION</Badge><h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">Welcome to AI SchoolOS</h1><p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">A secure, adaptable operating foundation for the people and systems behind exceptional schools.</p></div><p className="text-sm text-slate-500">Phase 1 · Platform setup</p></section><section className="grid gap-4 md:grid-cols-3">{principles.map(([title, copy], index) => <Card key={title}><CardContent className="p-5"><span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-50 font-semibold text-brand-600">0{index + 1}</span><h2 className="mt-5 text-base font-semibold text-ink">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{copy}</p></CardContent></Card>)}</section><Card><CardHeader><div><CardTitle>Your workspace is ready</CardTitle><p className="mt-1 text-sm text-slate-500">Business modules are intentionally not enabled yet.</p></div><Badge variant="success">FOUNDATION COMPLETE</Badge></CardHeader><CardContent><EmptyState title="No modules installed" description="Students, attendance, fees, exams, and AI capabilities will be introduced as focused modules—not placeholders." /></CardContent></Card></div>; }

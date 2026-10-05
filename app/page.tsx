import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const quickActions = [
  {
    label: "Students",
    description: "Manage student records",
    href: "/students",
    icon: "♙",
  },
  {
    label: "Attendance",
    description: "Monitor daily attendance",
    href: "/attendance",
    icon: "✓",
  },
  {
    label: "Exams",
    description: "Review academic results",
    href: "/exams",
    icon: "✎",
  },
  {
    label: "Fees",
    description: "Track collections",
    href: "/fees",
    icon: "₹",
  },
];

const activity = [
  {
    title: "Attendance review completed",
    detail: "94.2% school-wide attendance recorded",
    time: "Today",
  },
  {
    title: "Mid-term results available",
    detail: "Academic performance report is ready",
    time: "Today",
  },
  {
    title: "Fee follow-up required",
    detail: "Outstanding accounts need attention",
    time: "Today",
  },
];

export default async function OverviewPage() {
  const user = await requireUser();

  return (
    <div className="space-y-7">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-sm sm:p-8">
        <div className="relative z-10">
          <Badge>AI SCHOOL OS · COMMAND CENTER</Badge>

          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Run your school from one intelligent workspace.
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Welcome back. Your school operations, academic performance,
            attendance and finance insights are all in one place.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/ai-copilot"
              className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-navy transition-transform hover:-translate-y-0.5"
            >
              Ask AI Copilot
            </Link>

            <Link
              href="/students"
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              View Students
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-2xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl"
        />
      </section>

      {/* Account */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-ink">
            Signed in as {user.email ?? "your school account"}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Academic Year 2026–27 · Demo workspace
          </p>
        </div>

        <Badge variant="success">SYSTEM ONLINE</Badge>
      </div>

      {/* KPI Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Students
                </p>

                <p className="mt-2 text-3xl font-bold text-ink">
                  1,248
                </p>

                <p className="mt-2 text-xs font-medium text-green-600">
                  ↑ 6.4% from last year
                </p>
              </div>

              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                ♙
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Attendance
                </p>

                <p className="mt-2 text-3xl font-bold text-ink">
                  94.2%
                </p>

                <p className="mt-2 text-xs font-medium text-green-600">
                  Above target
                </p>
              </div>

              <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-50 text-green-700">
                ✓
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Academic Score
                </p>

                <p className="mt-2 text-3xl font-bold text-ink">
                  86.4%
                </p>

                <p className="mt-2 text-xs font-medium text-green-600">
                  Strong performance
                </p>
              </div>

              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                ✎
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Fee Collection
                </p>

                <p className="mt-2 text-3xl font-bold text-ink">
                  91%
                </p>

                <p className="mt-2 text-xs font-medium text-amber-600">
                  9% outstanding
                </p>
              </div>

              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-700">
                ₹
              </span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>

          <p className="mt-1 text-sm text-slate-500">
            Jump directly into your most-used school modules.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group rounded-xl border border-slate-200 p-4 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-white">
                    {action.icon}
                  </span>

                  <div>
                    <p className="font-semibold text-ink">
                      {action.label}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analytics + AI */}
      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>School Health</CardTitle>

                <p className="mt-1 text-sm text-slate-500">
                  Current operational snapshot.
                </p>
              </div>

              <Badge variant="success">HEALTHY</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    Attendance
                  </span>

                  <span className="font-bold text-ink">
                    94.2%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: "94.2%" }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    Academic Performance
                  </span>

                  <span className="font-bold text-ink">
                    86.4%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: "86.4%" }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    Fee Collection
                  </span>

                  <span className="font-bold text-ink">
                    91%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: "91%" }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="bg-navy text-white">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                ✦
              </div>

              <div>
                <CardTitle className="text-white">
                  AI Copilot
                </CardTitle>

                <p className="mt-1 text-xs text-slate-300">
                  Powered by Gemini
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5">
            <p className="text-sm leading-6 text-slate-600">
              Ask your AI assistant about attendance, academics, fees and
              school operations.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Suggested
              </p>

              <p className="mt-2 text-sm font-medium leading-6 text-ink">
                “What should the principal focus on today?”
              </p>
            </div>

            <Link
              href="/ai-copilot"
              className="mt-4 block rounded-lg bg-navy px-4 py-2.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Open AI Copilot
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>

          <p className="mt-1 text-sm text-slate-500">
            Latest activity across your school workspace.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {activity.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50/60 p-4"
            >
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-600" />

              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <p className="text-sm font-semibold text-ink">
                    {item.title}
                  </p>

                  <span className="text-xs text-slate-400">
                    {item.time}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Demo note */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-500">
        Demo workspace: dashboard metrics are sample values for presentation
        and will be connected to live school records in the production
        data layer.
      </div>
    </div>
  );
} 
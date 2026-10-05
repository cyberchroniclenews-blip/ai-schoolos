import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const attendanceData = [
  { label: "Mon", value: 94 },
  { label: "Tue", value: 96 },
  { label: "Wed", value: 91 },
  { label: "Thu", value: 97 },
  { label: "Fri", value: 95 },
  { label: "Sat", value: 89 },
];

const classPerformance = [
  { className: "Class 10-A", score: 92, attendance: 96 },
  { className: "Class 10-B", score: 88, attendance: 94 },
  { className: "Class 9-A", score: 84, attendance: 91 },
  { className: "Class 9-B", score: 79, attendance: 89 },
  { className: "Class 8-A", score: 87, attendance: 97 },
];

const feeCollection = [
  { month: "Apr", value: 72 },
  { month: "May", value: 81 },
  { month: "Jun", value: 76 },
  { month: "Jul", value: 88 },
  { month: "Aug", value: 91 },
  { month: "Sep", value: 95 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge>SCHOOL ANALYTICS</Badge>

          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Reports & Analytics
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Get a high-level view of attendance, academic performance and
            fee collection across your school.
          </p>
        </div>

        <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Reporting Period
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-800">
            Academic Year 2026–27
          </p>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Students
            </p>

            <p className="mt-2 text-3xl font-bold text-ink">1,248</p>

            <p className="mt-1 text-xs text-green-600">
              ↑ 6.4% from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Avg. Attendance
            </p>

            <p className="mt-2 text-3xl font-bold text-ink">94.2%</p>

            <p className="mt-1 text-xs text-green-600">
              Above school target
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Avg. Academic Score
            </p>

            <p className="mt-2 text-3xl font-bold text-ink">86.4%</p>

            <p className="mt-1 text-xs text-green-600">
              Strong overall performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Fee Collection
            </p>

            <p className="mt-2 text-3xl font-bold text-ink">91%</p>

            <p className="mt-1 text-xs text-green-600">
              Collection efficiency
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Attendance Trend */}
      <section className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Trend</CardTitle>

            <p className="mt-1 text-sm text-slate-500">
              Daily attendance percentage across the school.
            </p>
          </CardHeader>

          <CardContent>
            <div className="flex h-64 items-end justify-between gap-3">
              {attendanceData.map((item) => (
                <div
                  key={item.label}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <span className="text-xs font-semibold text-slate-600">
                    {item.value}%
                  </span>

                  <div className="flex h-48 w-full items-end rounded-lg bg-slate-100">
                    <div
                      className="w-full rounded-lg bg-brand-600 transition-all"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />
                  </div>

                  <span className="text-xs font-medium text-slate-500">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fee Collection */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Collection Trend</CardTitle>

            <p className="mt-1 text-sm text-slate-500">
              Monthly collection progress for the current academic year.
            </p>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {feeCollection.map((item) => (
                <div key={item.month}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-600">
                      {item.month}
                    </span>

                    <span className="font-semibold text-ink">
                      {item.value}%
                    </span>
                  </div>

                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-600"
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Class Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Class Performance Overview</CardTitle>

          <p className="mt-1 text-sm text-slate-500">
            Compare academic performance and attendance by class.
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-y border-slate-200 bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 font-semibold">Class</th>
                  <th className="px-5 py-3 font-semibold">
                    Academic Score
                  </th>
                  <th className="px-5 py-3 font-semibold">
                    Attendance
                  </th>
                  <th className="px-5 py-3 font-semibold">Insight</th>
                </tr>
              </thead>

              <tbody>
                {classPerformance.map((item) => (
                  <tr
                    key={item.className}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-semibold text-ink">
                      {item.className}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-brand-600"
                            style={{
                              width: `${item.score}%`,
                            }}
                          />
                        </div>

                        <span className="font-semibold text-ink">
                          {item.score}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          item.attendance >= 95
                            ? "font-semibold text-green-600"
                            : "font-semibold text-amber-600"
                        }
                      >
                        {item.attendance}%
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {item.score >= 90 ? (
                        <Badge variant="success">Top Performing</Badge>
                      ) : item.score >= 80 ? (
                        <Badge>Healthy</Badge>
                      ) : (
                        <Badge>Needs Attention</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insight Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Management Insights</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-green-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Strength
              </p>

              <p className="mt-2 text-lg font-bold text-green-900">
                Attendance
              </p>

              <p className="mt-1 text-sm leading-6 text-green-800">
                School-wide attendance is consistently above the target
                range.
              </p>
            </div>

            <div className="rounded-xl bg-brand-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Opportunity
              </p>

              <p className="mt-2 text-lg font-bold text-brand-900">
                Academic Support
              </p>

              <p className="mt-1 text-sm leading-6 text-brand-800">
                Lower-performing classes can be identified for targeted
                interventions.
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Finance
              </p>

              <p className="mt-2 text-lg font-bold text-amber-900">
                9% Outstanding
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                Fee follow-ups can focus on accounts with pending balances.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}  
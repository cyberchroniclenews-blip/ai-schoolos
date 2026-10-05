"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ResultStatus = "Excellent" | "Good" | "Needs Support";

type ExamResult = {
  id: string;
  student: string;
  className: string;
  exam: string;
  mathematics: number;
  science: number;
  english: number;
  percentage: number;
  status: ResultStatus;
};

const results: ExamResult[] = [
  {
    id: "RES-001",
    student: "Aarav Khan",
    className: "10-A",
    exam: "Mid Term",
    mathematics: 92,
    science: 89,
    english: 94,
    percentage: 92,
    status: "Excellent",
  },
  {
    id: "RES-002",
    student: "Ayesha Fatima",
    className: "10-A",
    exam: "Mid Term",
    mathematics: 88,
    science: 91,
    english: 90,
    percentage: 90,
    status: "Excellent",
  },
  {
    id: "RES-003",
    student: "Rehan Ahmed",
    className: "9-B",
    exam: "Mid Term",
    mathematics: 71,
    science: 76,
    english: 82,
    percentage: 76,
    status: "Good",
  },
  {
    id: "RES-004",
    student: "Zoya Siddiqui",
    className: "8-A",
    exam: "Mid Term",
    mathematics: 96,
    science: 94,
    english: 95,
    percentage: 95,
    status: "Excellent",
  },
  {
    id: "RES-005",
    student: "Hamza Ali",
    className: "9-A",
    exam: "Mid Term",
    mathematics: 62,
    science: 68,
    english: 71,
    percentage: 67,
    status: "Needs Support",
  },
  {
    id: "RES-006",
    student: "Mariam Noor",
    className: "7-B",
    exam: "Mid Term",
    mathematics: 79,
    science: 84,
    english: 81,
    percentage: 81,
    status: "Good",
  },
];

function getStatusBadge(status: ResultStatus) {
  if (status === "Excellent") {
    return <Badge variant="success">Excellent</Badge>;
  }

  if (status === "Good") {
    return <Badge>Good</Badge>;
  }

  return <Badge>Needs Support</Badge>;
}

export default function ExamsPage() {
  const [search, setSearch] = useState("");

  const filteredResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return results;
    }

    return results.filter((result) =>
      [
        result.student,
        result.className,
        result.exam,
        result.id,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const averageScore = Math.round(
    results.reduce((sum, result) => sum + result.percentage, 0) /
      results.length
  );

  const excellentCount = results.filter(
    (result) => result.status === "Excellent"
  ).length;

  const supportCount = results.filter(
    (result) => result.status === "Needs Support"
  ).length;

  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge>EXAMS & RESULTS</Badge>

          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Exams & Results
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Monitor examination performance, identify high achievers and
            quickly spot students who need academic support.
          </p>
        </div>

        <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Current Examination
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-800">
            Mid Term · 2026–27
          </p>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Students Assessed
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {results.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Examination records
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Average Score
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {averageScore}%
            </p>
            <p className="mt-1 text-xs text-green-600">
              Overall performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              High Achievers
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {excellentCount}
            </p>
            <p className="mt-1 text-xs text-green-600">
              Above 90%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Need Support
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {supportCount}
            </p>
            <p className="mt-1 text-xs text-amber-600">
              Academic follow-up
            </p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Examination Results</CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Search student results and review subject-wise performance.
              </p>
            </div>

            <div className="w-full lg:w-80">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search results..."
                aria-label="Search examination results"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-y border-slate-200 bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 font-semibold">Student</th>
                  <th className="px-5 py-3 font-semibold">Class</th>
                  <th className="px-5 py-3 font-semibold">Math</th>
                  <th className="px-5 py-3 font-semibold">Science</th>
                  <th className="px-5 py-3 font-semibold">English</th>
                  <th className="px-5 py-3 font-semibold">Overall</th>
                  <th className="px-5 py-3 font-semibold">Performance</th>
                </tr>
              </thead>

              <tbody>
                {filteredResults.map((result) => (
                  <tr
                    key={result.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-ink">
                          {result.student}
                        </p>
                        <p className="text-xs text-slate-500">
                          {result.id} · {result.exam}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {result.className}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {result.mathematics}%
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {result.science}%
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {result.english}%
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-bold text-ink">
                        {result.percentage}%
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {getStatusBadge(result.status)}
                    </td>
                  </tr>
                ))}

                {filteredResults.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No results found for &quot;{search}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Academic Insight</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Strongest Area
              </p>
              <p className="mt-2 text-lg font-bold text-ink">
                English
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Students are showing consistently strong language performance.
              </p>
            </div>

            <div className="rounded-xl bg-brand-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                School Average
              </p>
              <p className="mt-2 text-lg font-bold text-brand-800">
                {averageScore}%
              </p>
              <p className="mt-1 text-sm text-brand-700">
                Overall examination performance is healthy.
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                Intervention
              </p>
              <p className="mt-2 text-lg font-bold text-amber-900">
                {supportCount} student{supportCount === 1 ? "" : "s"}
              </p>
              <p className="mt-1 text-sm text-amber-800">
                May benefit from targeted academic support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
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

type AttendanceStatus = "Present" | "Absent" | "Late";

type AttendanceRecord = {
  id: string;
  name: string;
  className: string;
  section: string;
  status: AttendanceStatus;
  time: string;
};

const initialRecords: AttendanceRecord[] = [
  {
    id: "STU-001",
    name: "Aarav Khan",
    className: "10",
    section: "A",
    status: "Present",
    time: "08:42 AM",
  },
  {
    id: "STU-002",
    name: "Ayesha Fatima",
    className: "10",
    section: "A",
    status: "Present",
    time: "08:39 AM",
  },
  {
    id: "STU-003",
    name: "Rehan Ahmed",
    className: "9",
    section: "B",
    status: "Late",
    time: "09:11 AM",
  },
  {
    id: "STU-004",
    name: "Zoya Siddiqui",
    className: "8",
    section: "A",
    status: "Present",
    time: "08:47 AM",
  },
  {
    id: "STU-005",
    name: "Hamza Ali",
    className: "9",
    section: "A",
    status: "Absent",
    time: "—",
  },
  {
    id: "STU-006",
    name: "Mariam Noor",
    className: "7",
    section: "B",
    status: "Present",
    time: "08:51 AM",
  },
];

function statusBadge(status: AttendanceStatus) {
  if (status === "Present") {
    return <Badge variant="success">Present</Badge>;
  }

  if (status === "Late") {
    return <Badge>Late</Badge>;
  }

  return <Badge>Absent</Badge>;
}

export default function AttendancePage() {
  const [records, setRecords] = useState(initialRecords);
  const [search, setSearch] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return records;
    }

    return records.filter((record) =>
      [record.name, record.className, record.section, record.id]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [records, search]);

  const presentCount = records.filter(
    (record) => record.status === "Present"
  ).length;

  const absentCount = records.filter(
    (record) => record.status === "Absent"
  ).length;

  const lateCount = records.filter(
    (record) => record.status === "Late"
  ).length;

  const attendanceRate = Math.round(
    ((presentCount + lateCount) / records.length) * 100
  );

  function markPresent(id: string) {
    setRecords((current) =>
      current.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "Present",
              time: "09:00 AM",
            }
          : record
      )
    );
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge>DAILY ATTENDANCE</Badge>

          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Attendance
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Monitor attendance, identify absences and quickly follow up on
            late arrivals.
          </p>
        </div>

        <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Attendance Date
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-800">
            Today · Morning Session
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Attendance Rate
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {attendanceRate}%
            </p>
            <p className="mt-1 text-xs text-green-600">
              Today&apos;s attendance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">Present</p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {presentCount}
            </p>
            <p className="mt-1 text-xs text-green-600">
              Students present
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">Late</p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {lateCount}
            </p>
            <p className="mt-1 text-xs text-amber-600">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">Absent</p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {absentCount}
            </p>
            <p className="mt-1 text-xs text-red-600">
              Follow-up required
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Directory */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Today&apos;s Student Attendance</CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Search students and update attendance instantly.
              </p>
            </div>

            <div className="w-full lg:w-80">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search students..."
                aria-label="Search attendance"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-y border-slate-200 bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 font-semibold">Student</th>
                  <th className="px-5 py-3 font-semibold">Class</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Time</th>
                  <th className="px-5 py-3 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 font-semibold text-brand-700">
                          {record.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-ink">
                            {record.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {record.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      Class {record.className} - {record.section}
                    </td>

                    <td className="px-5 py-4">
                      {statusBadge(record.status)}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {record.time}
                    </td>

                    <td className="px-5 py-4">
                      {record.status === "Absent" ? (
                        <button
                          type="button"
                          onClick={() => markPresent(record.id)}
                          className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition-colors hover:bg-green-100"
                        >
                          Mark Present
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          Recorded
                        </span>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No attendance records found for &quot;{search}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
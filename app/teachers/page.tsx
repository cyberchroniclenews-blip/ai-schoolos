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

type Teacher = {
  id: string;
  name: string;
  subject: string;
  department: string;
  classes: string;
  experience: string;
  status: "Active" | "On Leave";
};

const teachers: Teacher[] = [
  {
    id: "TCH-001",
    name: "Sana Rahman",
    subject: "Mathematics",
    department: "Science",
    classes: "8 - 10",
    experience: "8 Years",
    status: "Active",
  },
  {
    id: "TCH-002",
    name: "Imran Ahmed",
    subject: "Physics",
    department: "Science",
    classes: "9 - 12",
    experience: "11 Years",
    status: "Active",
  },
  {
    id: "TCH-003",
    name: "Fatima Noor",
    subject: "English",
    department: "Languages",
    classes: "6 - 10",
    experience: "6 Years",
    status: "Active",
  },
  {
    id: "TCH-004",
    name: "Rahul Sharma",
    subject: "Computer Science",
    department: "Technology",
    classes: "8 - 12",
    experience: "5 Years",
    status: "On Leave",
  },
  {
    id: "TCH-005",
    name: "Aisha Khan",
    subject: "Biology",
    department: "Science",
    classes: "9 - 12",
    experience: "9 Years",
    status: "Active",
  },
  {
    id: "TCH-006",
    name: "Mohammed Sameer",
    subject: "Social Studies",
    department: "Humanities",
    classes: "6 - 9",
    experience: "7 Years",
    status: "Active",
  },
];

export default function TeachersPage() {
  const [search, setSearch] = useState("");

  const filteredTeachers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return teachers;
    }

    return teachers.filter((teacher) =>
      [
        teacher.name,
        teacher.subject,
        teacher.department,
        teacher.classes,
        teacher.id,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active"
  ).length;

  const departments = new Set(teachers.map((teacher) => teacher.department))
    .size;

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge>STAFF MANAGEMENT</Badge>

          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Teachers
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Manage teaching staff, subjects, departments and classroom
            assignments from one workspace.
          </p>
        </div>

        <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Faculty Workspace
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-800">
            Academic Year 2026–27
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Total Teachers
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {teachers.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Faculty members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Active Faculty
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {activeTeachers}
            </p>
            <p className="mt-1 text-xs text-green-600">
              Currently teaching
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Departments
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {departments}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Academic departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              On Leave
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {teachers.length - activeTeachers}
            </p>
            <p className="mt-1 text-xs text-amber-600">
              Need schedule coverage
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Faculty Directory</CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Search teachers by name, subject, department or class.
              </p>
            </div>

            <div className="w-full lg:w-80">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search teachers..."
                aria-label="Search teachers"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-y border-slate-200 bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 font-semibold">Teacher</th>
                  <th className="px-5 py-3 font-semibold">Subject</th>
                  <th className="px-5 py-3 font-semibold">Department</th>
                  <th className="px-5 py-3 font-semibold">Classes</th>
                  <th className="px-5 py-3 font-semibold">Experience</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 font-semibold text-brand-700">
                          {teacher.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-semibold text-ink">
                            {teacher.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {teacher.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {teacher.subject}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {teacher.department}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {teacher.classes}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {teacher.experience}
                    </td>

                    <td className="px-5 py-4">
                      {teacher.status === "Active" ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge>On Leave</Badge>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredTeachers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No teachers found for &quot;{search}&quot;.
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
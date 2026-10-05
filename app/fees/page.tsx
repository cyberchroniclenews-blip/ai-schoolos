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

type FeeStatus = "Paid" | "Pending" | "Overdue";

type FeeRecord = {
  id: string;
  student: string;
  className: string;
  total: number;
  paid: number;
  due: number;
  status: FeeStatus;
};

const feeRecords: FeeRecord[] = [
  {
    id: "FEE-001",
    student: "Aarav Khan",
    className: "10-A",
    total: 45000,
    paid: 45000,
    due: 0,
    status: "Paid",
  },
  {
    id: "FEE-002",
    student: "Ayesha Fatima",
    className: "10-A",
    total: 45000,
    paid: 30000,
    due: 15000,
    status: "Pending",
  },
  {
    id: "FEE-003",
    student: "Rehan Ahmed",
    className: "9-B",
    total: 42000,
    paid: 20000,
    due: 22000,
    status: "Overdue",
  },
  {
    id: "FEE-004",
    student: "Zoya Siddiqui",
    className: "8-A",
    total: 38000,
    paid: 38000,
    due: 0,
    status: "Paid",
  },
  {
    id: "FEE-005",
    student: "Hamza Ali",
    className: "9-A",
    total: 42000,
    paid: 30000,
    due: 12000,
    status: "Pending",
  },
  {
    id: "FEE-006",
    student: "Mariam Noor",
    className: "7-B",
    total: 36000,
    paid: 36000,
    due: 0,
    status: "Paid",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusBadge(status: FeeStatus) {
  if (status === "Paid") {
    return <Badge variant="success">Paid</Badge>;
  }

  if (status === "Pending") {
    return <Badge>Pending</Badge>;
  }

  return <Badge>Overdue</Badge>;
}

export default function FeesPage() {
  const [search, setSearch] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return feeRecords;
    }

    return feeRecords.filter((record) =>
      [record.student, record.className, record.id, record.status]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const totalFees = feeRecords.reduce(
    (sum, record) => sum + record.total,
    0
  );

  const collectedFees = feeRecords.reduce(
    (sum, record) => sum + record.paid,
    0
  );

  const outstandingFees = feeRecords.reduce(
    (sum, record) => sum + record.due,
    0
  );

  const overdueCount = feeRecords.filter(
    (record) => record.status === "Overdue"
  ).length;

  const collectionRate = Math.round(
    (collectedFees / totalFees) * 100
  );

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge>FEE MANAGEMENT</Badge>

          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Fees & Payments
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Track fee collections, pending balances and overdue accounts
            from one school finance workspace.
          </p>
        </div>

        <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Financial Year
          </p>
          <p className="mt-1 text-sm font-semibold text-brand-800">
            2026–27
          </p>
        </div>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Total Fees
            </p>
            <p className="mt-2 text-2xl font-bold text-ink">
              {formatCurrency(totalFees)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Expected collection
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Collected
            </p>
            <p className="mt-2 text-2xl font-bold text-ink">
              {formatCurrency(collectedFees)}
            </p>
            <p className="mt-1 text-xs text-green-600">
              {collectionRate}% collection rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Outstanding
            </p>
            <p className="mt-2 text-2xl font-bold text-ink">
              {formatCurrency(outstandingFees)}
            </p>
            <p className="mt-1 text-xs text-amber-600">
              Pending balances
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm font-medium text-slate-500">
              Overdue Accounts
            </p>
            <p className="mt-2 text-3xl font-bold text-ink">
              {overdueCount}
            </p>
            <p className="mt-1 text-xs text-red-600">
              Follow-up required
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Payment Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Fee Accounts</CardTitle>
              <p className="mt-1 text-sm text-slate-500">
                Search student accounts and review payment status.
              </p>
            </div>

            <div className="w-full lg:w-80">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search fee records..."
                aria-label="Search fee records"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="border-y border-slate-200 bg-slate-50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3 font-semibold">Student</th>
                  <th className="px-5 py-3 font-semibold">Class</th>
                  <th className="px-5 py-3 font-semibold">Total</th>
                  <th className="px-5 py-3 font-semibold">Paid</th>
                  <th className="px-5 py-3 font-semibold">Due</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-ink">
                          {record.student}
                        </p>
                        <p className="text-xs text-slate-500">
                          {record.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {record.className}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {formatCurrency(record.total)}
                    </td>

                    <td className="px-5 py-4 font-medium text-green-600">
                      {formatCurrency(record.paid)}
                    </td>

                    <td className="px-5 py-4 font-semibold text-ink">
                      {formatCurrency(record.due)}
                    </td>

                    <td className="px-5 py-4">
                      {getStatusBadge(record.status)}
                    </td>
                  </tr>
                ))}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-10 text-center text-sm text-slate-500"
                    >
                      No fee records found for &quot;{search}&quot;.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Collection Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Collection Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">
                Collection progress
              </span>

              <span className="font-bold text-ink">
                {collectionRate}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-brand-600 transition-all"
                style={{ width: `${collectionRate}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-500">
              <span>
                Collected: {formatCurrency(collectedFees)}
              </span>

              <span>
                Remaining: {formatCurrency(outstandingFees)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
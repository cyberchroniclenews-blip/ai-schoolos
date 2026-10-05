"use client";

import { useMemo, useState } from "react";

type Student = {
  id: string;
  admissionNo: string;
  name: string;
  className: string;
  section: string;
  roll: number;
  attendance: number;
  score: number;
  fees: "Paid" | "Pending";
  status: "Active" | "Inactive";
};

const classes = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
const sections = ["All Sections", "A", "B", "C"];

const names = [
  "Aarav Sharma",
  "Ananya Reddy",
  "Arjun Kumar",
  "Diya Patel",
  "Vivaan Singh",
  "Ishita Rao",
  "Aditya Verma",
  "Myra Khan",
  "Reyansh Gupta",
  "Aanya Das",
];

const initialStudents: Student[] = classes.flatMap((className, classIndex) =>
  ["A", "B", "C"].flatMap((section, sectionIndex) =>
    Array.from({ length: 4 }, (_, studentIndex) => ({
      id: `${classIndex}-${sectionIndex}-${studentIndex}`,
      admissionNo: `AS-${classIndex + 1}${section}${String(
        studentIndex + 1,
      ).padStart(2, "0")}`,
      name:
        names[
          (classIndex * 3 + sectionIndex + studentIndex) % names.length
        ],
      className,
      section,
      roll: studentIndex + 1,
      attendance: [96, 92, 88, 98][studentIndex],
      score: [91, 84, 78, 95][studentIndex],
      fees: studentIndex === 2 ? "Pending" : "Paid",
      status: "Active",
    })),
  ),
);

const emptyForm = {
  name: "",
  className: "Class 1",
  section: "A",
  attendance: "95",
  score: "85",
  fees: "Paid" as "Paid" | "Pending",
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedSection, setSelectedSection] =
    useState("All Sections");
  const [search, setSearch] = useState("");

  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const classMatch =
        selectedClass === "All Classes" ||
        student.className === selectedClass;

      const sectionMatch =
        selectedSection === "All Sections" ||
        student.section === selectedSection;

      const searchMatch =
        !search ||
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.admissionNo.toLowerCase().includes(search.toLowerCase());

      return classMatch && sectionMatch && searchMatch;
    });
  }, [students, selectedClass, selectedSection, search]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(student: Student) {
    setEditingId(student.id);
    setForm({
      name: student.name,
      className: student.className,
      section: student.section,
      attendance: String(student.attendance),
      score: String(student.score),
      fees: student.fees,
    });
    setShowForm(true);
    setSelectedStudent(null);
  }

  function saveStudent() {
    if (!form.name.trim()) return;

    if (editingId) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editingId
            ? {
                ...student,
                name: form.name.trim(),
                className: form.className,
                section: form.section,
                attendance: Number(form.attendance),
                score: Number(form.score),
                fees: form.fees,
              }
            : student,
        ),
      );
    } else {
      const newStudent: Student = {
        id: crypto.randomUUID(),
        admissionNo: `NEW-${String(students.length + 1).padStart(3, "0")}`,
        name: form.name.trim(),
        className: form.className,
        section: form.section,
        roll:
          students.filter(
            (student) =>
              student.className === form.className &&
              student.section === form.section,
          ).length + 1,
        attendance: Number(form.attendance),
        score: Number(form.score),
        fees: form.fees,
        status: "Active",
      };

      setStudents((current) => [newStudent, ...current]);
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function deleteStudent(student: Student) {
    const confirmed = window.confirm(
      `Delete ${student.name} from the prototype?`,
    );

    if (!confirmed) return;

    setStudents((current) =>
      current.filter((item) => item.id !== student.id),
    );

    setSelectedStudent(null);
  }

  return (
    <main className="min-h-screen bg-[#07111f] p-6 text-white md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* HEADER */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-cyan-400">
              STUDENT MANAGEMENT
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Students
            </h1>

            <p className="mt-2 text-slate-400">
              Manage students class-wise, section-wise and
              student-by-student.
            </p>
          </div>

          <button
            type="button"
            onClick={openAdd}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 font-semibold text-white shadow-lg"
          >
            + Add Student
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            ["Total Students", students.length],
            ["Classes", 10],
            ["Sections", 30],
            [
              "Active Students",
              students.filter((student) => student.status === "Active")
                .length,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="rounded-2xl border border-cyan-400/20 bg-white/[0.04] p-5">
          <div className="grid gap-4 md:grid-cols-3">

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none"
            >
              <option>All Classes</option>
              {classes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none"
            >
              {sections.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student or admission no..."
              className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none placeholder:text-slate-500"
            />

          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">

          <div className="border-b border-white/10 px-5 py-4">
            <div className="flex flex-wrap items-center justify-between gap-2">

              <div>
                <h2 className="font-semibold">
                  {selectedClass === "All Classes"
                    ? "All Students"
                    : `${selectedClass} Students`}
                </h2>

                <p className="text-sm text-slate-400">
                  {filteredStudents.length} students shown
                </p>
              </div>

              <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                Live Prototype Data
              </div>

            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-sm">

              <thead className="bg-white/[0.03] text-left text-slate-400">
                <tr>
                  <th className="px-5 py-4">Admission No</th>
                  <th className="px-5 py-4">Student</th>
                  <th className="px-5 py-4">Class</th>
                  <th className="px-5 py-4">Section</th>
                  <th className="px-5 py-4">Attendance</th>
                  <th className="px-5 py-4">Score</th>
                  <th className="px-5 py-4">Fees</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-t border-white/5 hover:bg-white/[0.03]"
                  >

                    <td className="px-5 py-4 text-slate-300">
                      {student.admissionNo}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {student.name}
                    </td>

                    <td className="px-5 py-4">
                      {student.className}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-violet-400/10 px-3 py-1 text-violet-300">
                        {student.section}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-cyan-300">
                      {student.attendance}%
                    </td>

                    <td className="px-5 py-4">
                      {student.score}%
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={
                          student.fees === "Paid"
                            ? "text-emerald-400"
                            : "text-amber-400"
                        }
                      >
                        {student.fees}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">

                        <button
                          type="button"
                          onClick={() => setSelectedStudent(student)}
                          className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-3 py-2 text-cyan-300"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => openEdit(student)}
                          className="rounded-lg border border-violet-400/40 bg-violet-400/10 px-3 py-2 text-violet-300"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteStudent(student)}
                          className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-red-300"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">

          <div className="w-full max-w-2xl rounded-3xl border border-cyan-400/30 bg-[#081525] p-6 shadow-2xl">

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                  {editingId ? "UPDATE STUDENT" : "CREATE STUDENT"}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {editingId ? "Edit Student" : "Add New Student"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-white/10 px-3 py-2 text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              <input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Student name"
                className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none"
              />

              <select
                value={form.className}
                onChange={(e) =>
                  setForm({ ...form, className: e.target.value })
                }
                className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none"
              >
                {classes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={form.section}
                onChange={(e) =>
                  setForm({ ...form, section: e.target.value })
                }
                className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none"
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>

              <input
                type="number"
                min="0"
                max="100"
                value={form.attendance}
                onChange={(e) =>
                  setForm({ ...form, attendance: e.target.value })
                }
                placeholder="Attendance %"
                className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none"
              />

              <input
                type="number"
                min="0"
                max="100"
                value={form.score}
                onChange={(e) =>
                  setForm({ ...form, score: e.target.value })
                }
                placeholder="Academic score %"
                className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none"
              />

              <select
                value={form.fees}
                onChange={(e) =>
                  setForm({
                    ...form,
                    fees: e.target.value as "Paid" | "Pending",
                  })
                }
                className="rounded-xl border border-white/10 bg-[#0c192a] px-4 py-3 text-white outline-none"
              >
                <option>Paid</option>
                <option>Pending</option>
              </select>

            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-xl border border-white/10 px-5 py-3 text-slate-300"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveStudent}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-6 py-3 font-semibold"
              >
                {editingId ? "Save Changes" : "Create Student"}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* VIEW PROFILE MODAL */}
      {selectedStudent && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">

          <div className="w-full max-w-4xl rounded-3xl border border-cyan-400/30 bg-[#081525] shadow-2xl">

            <div className="flex items-start justify-between border-b border-white/10 p-6">

              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                  STUDENT 360° PROFILE
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {selectedStudent.name}
                </h2>

                <p className="mt-2 text-slate-400">
                  {selectedStudent.admissionNo} ·{" "}
                  {selectedStudent.className} · Section{" "}
                  {selectedStudent.section}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-slate-300"
              >
                ✕ Close
              </button>

            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Admission No.</p>
                <p className="mt-2 font-semibold">
                  {selectedStudent.admissionNo}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Class</p>
                <p className="mt-2 font-semibold">
                  {selectedStudent.className}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Section</p>
                <p className="mt-2 font-semibold text-violet-300">
                  {selectedStudent.section}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Roll Number</p>
                <p className="mt-2 font-semibold">
                  {selectedStudent.roll}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Attendance</p>
                <p className="mt-2 text-2xl font-bold text-cyan-300">
                  {selectedStudent.attendance}%
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Academic Score</p>
                <p className="mt-2 text-2xl font-bold text-violet-300">
                  {selectedStudent.score}%
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Fee Status</p>
                <p
                  className={`mt-2 text-2xl font-bold ${
                    selectedStudent.fees === "Paid"
                      ? "text-emerald-400"
                      : "text-amber-400"
                  }`}
                >
                  {selectedStudent.fees}
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-5">
                <p className="text-sm text-slate-400">Status</p>
                <p className="mt-2 text-2xl font-bold text-emerald-400">
                  {selectedStudent.status}
                </p>
              </div>

            </div>

            <div className="mx-6 mb-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => openEdit(selectedStudent)}
                className="rounded-xl bg-violet-500/15 px-5 py-3 text-violet-300"
              >
                Edit Student
              </button>

              <button
                type="button"
                onClick={() => deleteStudent(selectedStudent)}
                className="rounded-xl bg-red-500/15 px-5 py-3 text-red-300"
              >
                Delete Student
              </button>

            </div>

          </div>
        </div>
      )}
    </main>
  );
} 
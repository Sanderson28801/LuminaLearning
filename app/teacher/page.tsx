"use client";
import React, { useState } from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import LmsCard from "@/components/LmsCard";
import { useLms } from "@/context/LmsContext";
import { Users, ChevronDown } from "lucide-react";

const DUMMY_STUDENTS = [
  { id: "s2", name: "James Wilson", status: "not_started" },
  { id: "s3", name: "Sarah Miller", status: "published" },
];

export default function TeacherDashboard() {
  const { student } = useLms();
  const [selectedClass, setSelectedClass] = useState("7-Math-A");

  return (
    <AppShell role="Teacher">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Teacher Overview
            </h1>
            <p className="text-slate-500">Managing active class sessions</p>
          </div>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="appearance-none bg-white border-2 border-slate-200 pl-4 pr-10 py-2 rounded-xl font-bold text-slate-700 focus:border-indigo-500 outline-none"
            >
              <option>7-Math-A</option>
              <option>7-Math-B</option>
              <option>8-Algebra-C</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>

        <LmsCard className="overflow-hidden p-0">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            <h2 className="font-bold text-slate-800">
              Student List: {selectedClass}
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {/* The Live Context Student */}
            <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{student.name}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    {student.classId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      student.quizStatus === "not_started"
                        ? "bg-slate-300"
                        : student.reviewStatus === "published"
                        ? "bg-emerald-500"
                        : "bg-amber-500"
                    }`}
                  ></span>
                  <span className="text-sm font-bold text-slate-600">
                    {student.quizStatus === "not_started"
                      ? "Not Started"
                      : student.reviewStatus === "published"
                      ? "Reviewed"
                      : "Submitted"}
                  </span>
                </div>

                {student.quizStatus === "submitted" ? (
                  <Link
                    href={`/teacher/review/${student.id}`}
                    className="btn-primary py-2 px-6"
                  >
                    Review Work
                  </Link>
                ) : (
                  <button
                    disabled
                    className="bg-slate-100 text-slate-400 py-2 px-6 rounded-lg font-bold cursor-not-allowed"
                  >
                    No Submission
                  </button>
                )}
              </div>
            </div>

            {/* Dummy Students */}
            {DUMMY_STUDENTS.map((s) => (
              <div
                key={s.id}
                className="p-6 flex items-center justify-between opacity-60"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center font-bold">
                    {s.name.charAt(0)}
                  </div>
                  <p className="font-bold text-slate-900">{s.name}</p>
                </div>
                <span className="text-sm font-bold text-slate-400 italic">
                  Static Placeholder
                </span>
              </div>
            ))}
          </div>
        </LmsCard>
      </div>
    </AppShell>
  );
}

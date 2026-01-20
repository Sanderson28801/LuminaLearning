"use client";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import LmsCard from "@/components/LmsCard";
import { useLms } from "@/context/LmsContext";
import { BookOpen, Pencil, Calendar } from "lucide-react";
import LinkButton from "@/components/ui/LinkButton";

export default function StudentDashboard() {
  const { student } = useLms();

  return (
    <AppShell role="Student">
      <div className="space-y-10">
        <header>
          <h1 className="text-3xl font-bold text-slate-900">
            Student Dashboard
          </h1>
          <p className="text-slate-500">Welcome back, {student.name}</p>
        </header>

        {/* SECTION 1: MATH ASSIGNMENTS */}
        <section className="p-6 border-2 border-slate-200 rounded-2xl bg-slate-50/50">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="text-indigo-600" size={24} />
            <h2 className="text-xl font-bold text-slate-800">
              Math Assignments
            </h2>
          </div>

          <div className="grid gap-6">
            <LmsCard
              status={
                student.reviewStatus == "published"
                  ? "completed"
                  : student.quizStatus === "submitted"
                  ? "pending"
                  : "active"
              }
              className="p-8"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Grade 7 Diagnostic Quiz
                  </h3>
                  <p className="text-slate-600 max-w-md">
                    Assess your understanding of linear equations and basic
                    algebraic functions.
                  </p>
                </div>
                {student.quizStatus === "submitted" && (
                  <span
                    className={`px-3 py-1 ${
                      student.reviewStatus === "published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    } rounded-full text-xs font-bold uppercase tracking-wider`}
                  >
                    {student.reviewStatus === "published"
                      ? "Feedback Ready"
                      : "Pending Review"}
                  </span>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                {student.quizStatus === "not_started" ? (
                  <Link href="/student/quiz" className="btn-primary">
                    Start Diagnostic Quiz
                  </Link>
                ) : student.reviewStatus === "published" ? (
                  <div className="space-y-4">
                    <p className="text-slate-900 font-semibold italic">
                      Teacher's Summary: "{student.finalTeacherFeedback}"
                    </p>
                    <Link
                      href="/student/results"
                      className="text-indigo-600 font-medium hover:underline"
                    >
                      View detailed feedback &rarr;
                    </Link>
                  </div>
                ) : (
                  <p className="text-amber-700 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Waiting for teacher feedback
                  </p>
                )}
              </div>
            </LmsCard>
          </div>
        </section>

        {/* SECTION 2: ENGLISH ASSIGNMENTS */}
        <section className="p-6 border-2 border-slate-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Pencil className="text-slate-400" size={24} />
            <h2 className="text-xl font-bold text-slate-400">
              English Assignments
            </h2>
          </div>
          <p className="text-slate-400 italic">
            No active assignments for this period.
          </p>
        </section>

        {/* SECTION 3: UPCOMING LESSONS */}
        <section className="p-6 border-2 border-slate-200 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-slate-400" size={24} />
            <h2 className="text-xl font-bold text-slate-400">
              Upcoming Lessons
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LmsCard className="p-4 opacity-50 grayscale">
              <p className="font-bold">Introduction to Geometry</p>
              <p className="text-sm">Monday, Jan 26</p>
            </LmsCard>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

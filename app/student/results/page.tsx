"use client";
import React from "react";
import Link from "next/link";
import AppShell from "@/components/AppShell";
import LmsCard from "@/components/LmsCard";
import { useLms } from "@/context/LmsContext";
import { ChevronLeft, CheckCircle, XCircle, MessageSquare } from "lucide-react";

const QUESTIONS = [
  {
    id: "q1",
    text: "Which of the following is a solution to 2x + 5 = 13?",
    type: "mc",
    correct: "x=4",
  },
  {
    id: "q2",
    text: 'In the equation y = mx + b, what does "m" represent?',
    type: "mc",
    correct: "Slope",
  },
  {
    id: "q3",
    text: "Explain the steps you take to isolate a variable...",
    type: "sa",
  },
  { id: "q4", text: "Give a real-world example...", type: "sa" },
];

export default function StudentResults() {
  const { student } = useLms();

  if (student.reviewStatus !== "published") {
    return (
      <AppShell role="Student">
        <div className="text-center py-20">
          <p className="text-slate-500">
            Results are not yet available for viewing.
          </p>
          <Link
            href="/student"
            className="text-indigo-600 hover:underline mt-4 inline-block"
          >
            Return to Dashboard
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell role="Student">
      <div className="max-w-3xl mx-auto pb-20">
        <Link
          href="/student"
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 font-medium transition-colors"
        >
          <ChevronLeft size={20} /> Back to Dashboard
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Quiz Feedback</h1>
          <p className="text-slate-500">
            Review your performance and teacher suggestions
          </p>
        </header>

        <div className="space-y-8">
          {/* Teacher Summary Card */}
          <LmsCard className="p-8 border-l-8 border-l-indigo-600 bg-indigo-50/30">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-4">
              Final Teacher Summary
            </h2>
            <p className="text-xl text-slate-800 leading-relaxed italic">
              "{student.finalTeacherFeedback}"
            </p>
          </LmsCard>

          {/* Per-Question Feedback */}
          {QUESTIONS.map((q, i) => {
            const isCorrect =
              q.type === "mc" ? student.quizAnswers[q.id] === q.correct : true;
            const feedback = student.perQuestionFeedback[q.id];

            return (
              <LmsCard key={q.id} className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Question {i + 1}
                  </span>
                  {q.type === "mc" && (
                    <span
                      className={`flex items-center gap-1 font-bold text-sm ${
                        isCorrect ? "text-emerald-600" : "text-red-600"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle size={16} /> Correct
                        </>
                      ) : (
                        <>
                          <XCircle size={16} /> Incorrect
                        </>
                      )}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-6">
                  {q.text}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                      Your Answer
                    </p>
                    <p className="font-medium text-slate-800">
                      {student.quizAnswers[q.id] || "No answer"}
                    </p>
                    {!isCorrect && q.type === "mc" && (
                      <p className="mt-2 text-sm text-emerald-600 font-bold">
                        Correct answer: {q.correct}
                      </p>
                    )}
                  </div>

                  {feedback && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-600 mb-2">
                        <MessageSquare size={14} />
                        <span className="text-xs font-bold uppercase tracking-tight">
                          Teacher Feedback
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {feedback}
                      </p>
                    </div>
                  )}
                </div>
              </LmsCard>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}

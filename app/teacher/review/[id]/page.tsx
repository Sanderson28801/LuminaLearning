"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import LmsCard from "@/components/LmsCard";
import { useLms } from "@/context/LmsContext";
import { getTeacherFeedback } from "@/lib/gemini";
import {
  ChevronLeft,
  Sparkles,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  Loader2,
  Undo,
  Trash2,
} from "lucide-react";

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
  { id: "q3", text: "Explain the steps to isolate a variable...", type: "sa" },
  {
    id: "q4",
    text: "Give a real-world example of a linear relationship...",
    type: "sa",
  },
];

export default function TeacherReview() {
  const { student, updateStudent } = useLms();
  const router = useRouter();

  const [localFeedback, setLocalFeedback] = useState<Record<string, string>>(
    student.perQuestionFeedback || {}
  );
  const [localFinal, setLocalFinal] = useState(
    student.finalTeacherFeedback || ""
  );
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [showAllResponses, setShowAllResponses] = useState(false);

  const needsReview = QUESTIONS.filter(
    (q) =>
      q.type === "sa" ||
      (q.type === "mc" && student.quizAnswers[q.id] !== q.correct)
  );
  const autoGraded = QUESTIONS.filter(
    (q) => q.type === "mc" && student.quizAnswers[q.id] === q.correct
  );

  const handleAiGeneration = async () => {
    setIsAiLoading(true);
    const data = await getTeacherFeedback(needsReview, student.quizAnswers);
    if (data) {
      setLocalFeedback((prev) => ({ ...prev, ...data.perQuestion }));
      setLocalFinal(data.finalSummary);
    }
    setIsAiLoading(false);
  };

  const togglePublish = () => {
    updateStudent({
      reviewStatus:
        student.reviewStatus === "pending" ? "published" : "pending",
      perQuestionFeedback: localFeedback,
      finalTeacherFeedback: localFinal,
    });
    if (student.reviewStatus === "pending") router.push("/teacher");
  };

  return (
    <AppShell role="Teacher">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 -mx-4 px-4 py-4 mb-8">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/teacher")}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-900">{student.name}</h1>
          </div>
          <button onClick={togglePublish} className="btn-primary px-8">
            {student.reviewStatus === "published" ? (
              <>
                <Undo size={18} className="mr-2 inline" />
                Unpublish
              </>
            ) : (
              "Publish Feedback"
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-12 pb-20">
        {/* SECTION 1: NEEDS REVIEW */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle size={20} />
              <h2 className="text-lg font-bold uppercase tracking-wider">
                Needs Review
              </h2>
            </div>
            <button
              onClick={handleAiGeneration}
              disabled={isAiLoading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-bold hover:bg-indigo-100 border border-indigo-200 transition-all disabled:opacity-50"
            >
              {isAiLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Sparkles size={18} />
              )}
              {isAiLoading ? "Analyzing..." : "AI Assist All"}
            </button>
          </div>

          <div className="space-y-6">
            {needsReview.map((q) => (
              <LmsCard key={q.id} className="p-6 border-l-4 border-l-amber-400">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-slate-800">{q.text}</h3>
                      {q.type === "mc" && (
                        <XCircle size={18} className="text-red-500" />
                      )}
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Student Answer
                      </p>
                      <p className="font-medium text-slate-900">
                        {student.quizAnswers[q.id] || "No answer"}
                      </p>
                    </div>
                    {q.type === "mc" && (
                      <p className="mt-2 text-sm text-emerald-600 font-bold">
                        Correct: {q.correct}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-2">
                      Teacher Feedback
                    </label>
                    <textarea
                      value={localFeedback[q.id] || ""}
                      onChange={(e) =>
                        setLocalFeedback({
                          ...localFeedback,
                          [q.id]: e.target.value,
                        })
                      }
                      className="w-full flex-grow p-4 text-sm border-2 border-slate-200 rounded-xl focus:border-indigo-500 outline-none h-32"
                      placeholder="Provide feedback..."
                    />
                    <button
                      onClick={() =>
                        setLocalFeedback((prev) => ({ ...prev, [q.id]: "" }))
                      }
                      className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors self-start px-1"
                    >
                      <Trash2 size={14} />
                      Remove Suggestion
                    </button>
                  </div>
                </div>
              </LmsCard>
            ))}
          </div>
        </section>

        {/* SECTION 2: AUTO-GRADED (Correct MC) */}
        <section className="pt-8 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-6 text-emerald-600">
            <CheckCircle size={20} />
            <h2 className="text-lg font-bold uppercase tracking-wider">
              Correct Responses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {autoGraded.map((q) => (
              <div
                key={q.id}
                className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex justify-between items-center opacity-80"
              >
                <p className="text-sm font-medium text-slate-700 truncate mr-4">
                  {q.text}
                </p>
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-700">
                    {student.quizAnswers[q.id]}
                  </span>
                  <CheckCircle size={14} className="text-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: ALL RESPONSES (Context) */}
        <section className="pt-8 border-t border-slate-200">
          <button
            onClick={() => setShowAllResponses(!showAllResponses)}
            className="flex items-center justify-between w-full text-slate-400 hover:text-slate-600 py-2 transition-colors"
          >
            <h2 className="text-sm font-bold uppercase tracking-widest">
              Full Submission History
            </h2>
            {showAllResponses ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </button>

          {showAllResponses && (
            <div className="mt-6 space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              {QUESTIONS.map((q, i) => (
                <div
                  key={q.id}
                  className="flex justify-between text-sm py-2 border-b border-slate-200 last:border-0"
                >
                  <span className="text-slate-500 italic">
                    {i + 1}. {q.text}
                  </span>
                  <span className="font-bold text-slate-800">
                    {student.quizAnswers[q.id] || "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FINAL SUMMARY CARD */}
        <div className="pt-10">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
            Overall Performance Summary
          </label>
          <LmsCard className="p-8 bg-indigo-900 text-white border-0 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 text-indigo-300">
              <Sparkles size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                AI-Suggested Summary
              </span>
            </div>
            <textarea
              value={localFinal}
              onChange={(e) => setLocalFinal(e.target.value)}
              className="w-full bg-indigo-800 border-2 border-indigo-700 rounded-xl p-4 text-lg focus:border-indigo-400 outline-none h-40 transition-all placeholder:text-indigo-400/50"
              placeholder="The AI will generate a summary based on the student's overall performance..."
            />
          </LmsCard>
        </div>
      </div>
    </AppShell>
  );
}

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AppShell from "@/components/AppShell";
import LmsCard from "@/components/LmsCard";
import { useLms } from "@/context/LmsContext";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

const QUIZ_QUESTIONS = [
  {
    id: "q1",
    type: "mc",
    text: "Which of the following is a solution to 2x + 5 = 13?",
    options: ["x=2", "x=4", "x=6", "x=8"],
    correct: "x=4",
  },
  {
    id: "q2",
    type: "mc",
    text: 'In the equation y = mx + b, what does "m" represent?',
    options: ["Y-intercept", "Variable", "Slope", "Constant"],
    correct: "Slope",
  },
  {
    id: "q3",
    type: "sa",
    text: "Explain the steps you take to isolate a variable in a two-step equation.",
  },
  {
    id: "q4",
    type: "sa",
    text: "Give a real-world example of where a linear relationship might exist.",
  },
];

export default function StudentQuiz() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { updateStudent } = useLms();
  const router = useRouter();

  const currentQ = QUIZ_QUESTIONS[idx];
  const progress = ((idx + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleFinish = () => {
    let score = 0;
    if (answers["q1"] === "x=4") score++;
    if (answers["q2"] === "Slope") score++;

    updateStudent({
      quizStatus: "submitted",
      quizAnswers: answers,
      mcScore: score,
      reviewStatus: "pending",
    });
    router.push("/student");
  };

  return (
    <AppShell role="Student">
      <div className="max-w-xl mx-auto py-12">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
              Question {idx + 1} of 4
            </span>
            <span className="text-sm text-slate-400 font-medium">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <LmsCard className="p-10 min-h-[400px] flex flex-col justify-center shadow-xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">
            {currentQ.text}
          </h2>

          <div className="flex-grow">
            {currentQ.type === "mc" ? (
              <div className="grid gap-3">
                {currentQ.options?.map((opt) => (
                  <button
                    key={opt}
                    onClick={() =>
                      setAnswers({ ...answers, [currentQ.id]: opt })
                    }
                    className={`p-4 text-left rounded-xl border-2 transition-all font-medium ${
                      answers[currentQ.id] === opt
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-slate-100 hover:border-slate-300 text-slate-600"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <textarea
                value={answers[currentQ.id] || ""}
                onChange={(e) =>
                  setAnswers({ ...answers, [currentQ.id]: e.target.value })
                }
                placeholder="Type your explanation here..."
                className="w-full h-48 p-4 border-2 border-slate-100 rounded-xl focus:border-indigo-500 focus:outline-none text-lg"
              />
            )}
          </div>
        </LmsCard>

        <div className="flex justify-between mt-8">
          <button
            disabled={idx === 0}
            onClick={() => setIdx(idx - 1)}
            className=" btn-primary flex items-center gap-2 px-6 py-3 font-bold  hover:text-slate-600 disabled:opacity-0 transition-opacity"
          >
            <ChevronLeft size={20} /> Back
          </button> 

          {idx === QUIZ_QUESTIONS.length - 1 ? (
            <button
              onClick={handleFinish}
              className="btn-primary flex items-center gap-2 px-10 py-3 shadow-lg shadow-indigo-200"
            >
              Submit Quiz <Send size={18} />
            </button>
          ) : (
            <button
              onClick={() => setIdx(idx + 1)}
              className="btn-primary flex items-center gap-2 px-10 py-3 "
            >
              Next Question <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </AppShell>
  );
}

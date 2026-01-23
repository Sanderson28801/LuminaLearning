"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Student = {
  id: string;
  name: string;
  classId: string;
  quizAnswers: Record<string, string>;
  mcScore: number | null;
  quizStatus: "not_started" | "submitted";
  reviewStatus: "pending" | "published";
  perQuestionFeedback: Record<string, string>;
  finalTeacherFeedback: string;
  recommendedCourse: string;
};

const initialState: Student = {
  id: "std-1",
  name: "Alex Johnson",
  classId: "7-math-a",
  quizAnswers: {},
  mcScore: null,
  quizStatus: "not_started",
  reviewStatus: "pending",
  perQuestionFeedback: {},
  finalTeacherFeedback: "",
  recommendedCourse: "Intro to Algebra",
};

const LmsContext = createContext<
  | {
      student: Student;
      updateStudent: (updates: Partial<Student>) => void;
    }
  | undefined
>(undefined);

export function LmsProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student>(initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lms_state_v2");
    if (saved) setStudent(JSON.parse(saved));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized)
      localStorage.setItem("lms_state_v2", JSON.stringify(student));
  }, [student, isInitialized]);

  const updateStudent = (updates: Partial<Student>) => {
    setStudent((prev) => ({ ...prev, ...updates }));
  };

  if (!isInitialized) return null;

  return (
    <LmsContext.Provider value={{ student, updateStudent }}>
      {children}
    </LmsContext.Provider>
  );
}

export const useLms = () => {
  const context = useContext(LmsContext);
  if (!context) throw new Error("useLms must be used within LmsProvider");
  return context;
};

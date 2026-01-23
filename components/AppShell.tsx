"use client"; // Client component because it handles interactive UI states if needed

import React from "react";
import Link from "next/link";
import { BookOpen, ShieldCheck } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
  role?: "Student" | "Teacher" | null;
}

const Navbar = ({ role }: { role: "Student" | "Teacher" | null }) => (
  <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <div className="bg-indigo-600 p-1.5 rounded-md text-white">
        <BookOpen size={20} />
      </div>
      <span className="text-lg font-bold text-slate-900 tracking-tight">
        Lumina Learning
      </span>
    </Link>

    {role && (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium
        ${
          role === "Teacher"
            ? "bg-purple-50 text-purple-700 border-purple-200"
            : "bg-blue-50 text-blue-700 border-blue-200"
        }`}
      >
        {role === "Teacher" ? <ShieldCheck size={14} /> : null}
        <span>{role} View</span>
      </div>
    )}
  </nav>
);

const Footer = () => (
  <footer className="w-full py-8 text-center border-t border-slate-200 mt-auto bg-slate-50">
    <p className="text-sm text-slate-400">
      © 2026 Lumina Learning Platform • Education First
    </p>
  </footer>
);

export default function AppShell({ children, role = null }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-page)]">
      <Navbar role={role} />
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

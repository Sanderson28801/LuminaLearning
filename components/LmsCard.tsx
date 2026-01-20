import React from "react";

interface LmsCardProps {
  children: React.ReactNode;
  status?: "active" | "pending" | "completed";
  className?: string;
}

export default function LmsCard({
  children,
  status,
  className = "",
}: LmsCardProps) {
  const statusStyles = {
    active: "border-indigo-200 bg-white",
    pending: "border-amber-200 bg-amber-50/30",
    completed: "border-emerald-200 bg-emerald-50/30",
  };

  return (
    <div
      className={`
      lms-card hover:shadow-md transition-shadow duration-200 border-2
      ${status ? statusStyles[status] : "border-slate-200 bg-white"}
      ${className}
    `}
    >
      {children}
    </div>
  );
}

import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  text: string;
  href: string;
}

export default function LinkButton({ text, href }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 transition-all"
    >
      {text}
    </Link>
  );
}

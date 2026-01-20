import Link from "next/link";
import AppShell from "@/components/AppShell";
import { GraduationCap, Presentation } from "lucide-react";

export default function LoginPage() {
  return (
    <AppShell role={null}>
      <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
        <div className="text-center mb-12 max-w-lg">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Welcome to Lumina
          </h1>
          <p className="text-lg text-slate-600">
            Select your role to continue to your dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Student Link */}
          <Link href="/student" className="group">
            <div
              className="relative flex flex-col items-center p-8 bg-white border-2 border-slate-200 rounded-2xl 
                           hover:border-indigo-600 hover:shadow-lg transition-all duration-300 text-center h-full"
            >
              <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <GraduationCap size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Student
              </h2>
              <p className="text-slate-500">
                Access your quizzes and view your progress.
              </p>
              <span className="mt-6 text-blue-600 font-medium group-hover:underline">
                Continue as Student &rarr;
              </span>
            </div>
          </Link>

          {/* Teacher Link */}
          <Link href="/teacher" className="group">
            <div
              className="relative flex flex-col items-center p-8 bg-white border-2 border-slate-200 rounded-2xl 
                           hover:border-purple-600 hover:shadow-lg transition-all duration-300 text-center h-full"
            >
              <div className="bg-purple-50 p-4 rounded-full text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Presentation size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Teacher
              </h2>
              <p className="text-slate-500">
                Manage classes, review work, and approve feedback.
              </p>
              <span className="mt-6 text-purple-600 font-medium group-hover:underline">
                Continue as Teacher &rarr;
              </span>
            </div>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

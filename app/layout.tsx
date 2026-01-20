import "./globals.css";
import { Inter } from "next/font/google";
import { LmsProvider } from "@/context/LmsContext"; // Ensure this path is correct

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        {/* Wrap children here so all pages share the same LMS state */}
        <LmsProvider>{children}</LmsProvider>
      </body>
    </html>
  );
}

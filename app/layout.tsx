import "./globals.css";
import { Inter } from "next/font/google";
import { LmsProvider } from "@/context/LmsContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <LmsProvider>{children}</LmsProvider>
      </body>
    </html>
  );
}

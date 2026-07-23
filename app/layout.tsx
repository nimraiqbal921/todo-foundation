import Link from "next/link";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Todo Application",
  description: "Next.js Todo App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <nav className="bg-blue-600 text-white p-4 flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/health">Health</Link>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
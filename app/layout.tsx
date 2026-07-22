import Link from "next/link";
import "./globals.css";

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
    <html lang="en">
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
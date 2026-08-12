import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>My Projects</h1>

      <h2>AI Todo App</h2>

      <p>
        An AI-powered task management application built with Next.js, React,
        Tailwind CSS, and Google&apos;s Gemini API.
      </p>

      <h3>Technologies</h3>

      <ul>
        <li>Next.js</li>
        <li>React</li>
        <li>Tailwind CSS</li>
        <li>Google Gemini API</li>
      </ul>

      <Link href="/projects/ai-todo">
        View Case Study →
      </Link>
    </main>
  );
}
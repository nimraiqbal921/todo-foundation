"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/task-storage";
import type { Task } from "@/lib/types";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTasks(getTasks());
    setLoaded(true);
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  const incompleteTasks = tasks.filter(
    (task) => !task.completed
  );

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks.length / tasks.length) * 100
        );

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = incompleteTasks.filter(
    (task) => task.dueDate === today
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <header className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            StudyFlow
          </p>

          <h1 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
            Good morning 👋
          </h1>

          <p className="mt-2 text-slate-600">
            Plan your academic workload without the overwhelm.
          </p>
        </header>

        {/* STATS */}

        <section
          aria-label="Study statistics"
          className="mb-8 grid gap-4 sm:grid-cols-3"
        >

          {/* TOTAL */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {loaded ? tasks.length : "..."}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Tasks you've created
            </p>
          </div>

          {/* COMPLETED */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {loaded ? completedTasks.length : "..."}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Tasks finished
            </p>
          </div>

          {/* PROGRESS */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Study Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {loaded ? `${progress}%` : "..."}
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

        </section>

        {/* MAIN CONTENT */}

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* TODAY'S FOCUS */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Today's Focus
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tasks due today.
              </p>
            </div>

            {!loaded ? (

              <p className="text-sm text-slate-500">
                Loading your tasks...
              </p>

            ) : todayTasks.length === 0 ? (

              <div className="rounded-xl border border-dashed p-8 text-center">

                <p className="font-medium text-slate-800">
                  No tasks due today 🎉
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Add tasks from the Tasks page or use the AI
                  Planner to organize your workload.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {todayTasks.map((task) => (

                  <div
                    key={task.id}
                    className="rounded-xl border p-4"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <h3 className="font-semibold text-slate-900">
                          {task.title}
                        </h3>

                        {task.description && (
                          <p className="mt-1 text-sm text-slate-500">
                            {task.description}
                          </p>
                        )}

                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>

                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                      {task.estimatedMinutes} minutes ·{" "}
                      {task.category}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* AI PLANNER */}

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="mb-6">

              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                ✨
              </div>

              <h2 className="text-xl font-semibold text-slate-900">
                AI Planner
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Let AI help you decide what to work on first,
                organize your workload, and create a realistic
                study plan.
              </p>

            </div>

            <a
href="/planner"
              className="block w-full rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Open AI Planner ✨
            </a>

          </section>

        </div>

        {/* ALL UPCOMING TASKS */}

        {loaded && incompleteTasks.length > 0 && (

          <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

            <div className="mb-6">

              <h2 className="text-xl font-semibold text-slate-900">
                Upcoming Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your remaining workload.
              </p>

            </div>

            <div className="grid gap-3 md:grid-cols-2">

              {incompleteTasks.map((task) => (

                <div
                  key={task.id}
                  className="rounded-xl border p-4"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="font-medium text-slate-900">
                        {task.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {task.category} ·{" "}
                        {task.estimatedMinutes} min
                      </p>

                    </div>

                    <span className="text-xs font-medium capitalize text-slate-500">
                      {task.priority}
                    </span>

                  </div>

                  {task.dueDate && (
                    <p className="mt-3 text-xs text-slate-500">
                      Due: {task.dueDate}
                    </p>
                  )}

                </div>

              ))}

            </div>

          </section>

        )}

      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/task-storage";
import type { Task } from "@/lib/types";

type Check = {
  title: string;
  description: string;
  passed: boolean;
};

export default function StudyHealthPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTasks(getTasks());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm text-slate-500">
            Checking your study health...
          </p>
        </div>
      </main>
    );
  }

  const activeTasks = tasks.filter((task) => !task.completed);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueTasks = activeTasks.filter((task) => {
    if (!task.dueDate) return false;

    const dueDate = new Date(`${task.dueDate}T00:00:00`);

    return dueDate < today;
  });

  const tasksWithoutDueDate = activeTasks.filter(
    (task) => !task.dueDate
  );

  const tasksWithoutPriority = activeTasks.filter(
    (task) => !task.priority
  );

  const totalMinutes = activeTasks.reduce(
    (total, task) => total + task.estimatedMinutes,
    0
  );

  const workloadManageable = totalMinutes <= 180;

  const checks: Check[] = [
    {
      title: "Active tasks added",
      description:
        activeTasks.length > 0
          ? `You have ${activeTasks.length} active task${
              activeTasks.length !== 1 ? "s" : ""
            }.`
          : "Add some tasks to start planning your workload.",
      passed: activeTasks.length > 0,
    },
    {
      title: "Priorities assigned",
      description:
        tasksWithoutPriority.length === 0
          ? "Your active tasks have priorities."
          : `${tasksWithoutPriority.length} task${
              tasksWithoutPriority.length !== 1 ? "s are" : " is"
            } missing a priority.`,
      passed:
        activeTasks.length > 0 &&
        tasksWithoutPriority.length === 0,
    },
    {
      title: "Due dates added",
      description:
        tasksWithoutDueDate.length === 0
          ? "All active tasks have due dates."
          : `${tasksWithoutDueDate.length} task${
              tasksWithoutDueDate.length !== 1 ? "s are" : " is"
            } missing a due date.`,
      passed:
        activeTasks.length > 0 &&
        tasksWithoutDueDate.length === 0,
    },
    {
      title: "No overdue tasks",
      description:
        overdueTasks.length === 0
          ? "You have no overdue active tasks."
          : `${overdueTasks.length} active task${
              overdueTasks.length !== 1 ? "s are" : " is"
            } overdue.`,
      passed: overdueTasks.length === 0,
    },
    {
      title: "Workload is manageable",
      description:
        activeTasks.length === 0
          ? "Add tasks to calculate your workload."
          : `${totalMinutes} minutes of work remaining.`,
      passed:
        activeTasks.length === 0
          ? false
          : workloadManageable,
    },
    {
      title: "AI Planner ready",
      description:
        activeTasks.length > 0
          ? "Your tasks can be analyzed by StudyFlow AI."
          : "Add tasks before using the AI Planner.",
      passed: activeTasks.length > 0,
    },
  ];

  const passedChecks = checks.filter(
    (check) => check.passed
  ).length;

  const percentage = Math.round(
    (passedChecks / checks.length) * 100
  );

  let recommendation =
    "🎉 Your study setup looks healthy! Keep following your StudyFlow plan.";

  if (activeTasks.length === 0) {
    recommendation =
      "💡 Add your assignments, study goals, and deadlines to start building your study plan.";
  } else if (overdueTasks.length > 0) {
    recommendation =
      `⚠️ You have ${overdueTasks.length} overdue task${
        overdueTasks.length !== 1 ? "s" : ""
      }. Consider completing ${
        overdueTasks.length === 1 ? "it" : "them"
      } before moving on to lower-priority work.`;
  } else if (totalMinutes > 180) {
    recommendation =
      "⚠️ Your workload is fairly large. Use the AI Planner to break it into smaller study sessions.";
  } else if (tasksWithoutDueDate.length > 0) {
    recommendation =
      "💡 Add due dates to your tasks so StudyFlow can prioritize them more accurately.";
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}

        <header className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            StudyFlow
          </p>

          <h1 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
            🩺 Study Health
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            Check your current workload and make sure your
            study setup is ready for productive work.
          </p>
        </header>

        {/* SCORE */}

        <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Study Health Score
              </p>

              <p className="mt-2 text-4xl font-bold text-slate-900">
                {passedChecks}/{checks.length}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {percentage}% of checks passed
              </p>
            </div>

            <div className="h-24 w-24 rounded-full border-8 border-indigo-100 flex items-center justify-center">
              <span className="text-xl font-bold text-indigo-600">
                {percentage}%
              </span>
            </div>

          </div>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-indigo-600 transition-all"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

        </section>

        {/* CHECKLIST */}

        <section className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Study Health Checklist
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              StudyFlow checks your current task setup.
            </p>
          </div>

          <div className="space-y-3">

            {checks.map((check) => (

              <div
                key={check.title}
                className="flex items-start gap-4 rounded-xl border p-4"
              >

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${
                    check.passed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {check.passed ? "✓" : "!"}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {check.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {check.description}
                  </p>
                </div>

              </div>

            ))}

          </div>

        </section>

        {/* RECOMMENDATION */}

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

          <p className="text-sm font-medium text-indigo-600">
            StudyFlow Recommendation
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            What should you do?
          </h2>

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-sm leading-6 text-slate-700">
              {recommendation}
            </p>
          </div>

        </section>

        {/* QUICK STATS */}

        <section className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Active Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {activeTasks.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Remaining Time
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalMinutes}
              <span className="ml-1 text-base font-medium">
                min
              </span>
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Overdue
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {overdueTasks.length}
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}
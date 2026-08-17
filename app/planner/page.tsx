"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/task-storage";
import type { Task } from "@/lib/types";

type RecommendedTask = {
  taskId: string;
  reason: string;
};

type StudyPlan = {
  summary: string;
  recommendedTasks: RecommendedTask[];
  workloadWarning: string;
  session: {
    time: string;
    activity: string;
  }[];
};

export default function PlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setTasks(getTasks());
    setLoading(false);
  }, []);

  async function generatePlan() {
    setError("");
    setPlan(null);

    if (tasks.length === 0) {
      setError(
        "You don't have any tasks yet. Add some tasks first."
      );
      return;
    }

    setGenerating(true);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tasks,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate plan"
        );
      }

      setPlan(data.plan);
    } catch (error) {
      console.error("Planner error:", error);

      setError(
        "Something went wrong while creating your plan. Please try again."
      );
    } finally {
      setGenerating(false);
    }
  }

  function getTask(taskId: string) {
    return tasks.find((task) => task.id === taskId);
  }

  const activeTasks = tasks.filter(
    (task) => !task.completed
  );

  const totalMinutes = activeTasks.reduce(
    (total, task) => total + task.estimatedMinutes,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <header className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            StudyFlow
          </p>

          <h1 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
            ✨ AI Planner
          </h1>

          <p className="mt-2 max-w-2xl text-slate-600">
            You decide what needs to get done. StudyFlow
            analyzes your workload and helps you decide what
            to tackle first.
          </p>
        </header>

        {/* WORKLOAD */}

        <section className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Your workload
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {activeTasks.length} active task
                {activeTasks.length !== 1 ? "s" : ""} ·{" "}
                {totalMinutes} minutes estimated
              </p>
            </div>

            <button
              type="button"
              onClick={generatePlan}
              disabled={loading || generating}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generating
                ? "Analyzing workload..."
                : "Generate Plan ✨"}
            </button>

          </div>

          {/* TASK LIST */}

          <div className="mt-6 space-y-3">

            {tasks.length === 0 ? (

              <div className="rounded-xl border border-dashed p-8 text-center">
                <p className="font-medium text-slate-800">
                  No tasks yet
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Add your assignments, study goals, deadlines,
                  and other tasks from the Tasks page.
                </p>
              </div>

            ) : (

              tasks.map((task) => (

                <div
                  key={task.id}
                  className={`rounded-xl border p-4 ${
                    task.completed
                      ? "bg-slate-50 opacity-60"
                      : "bg-white"
                  }`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        {task.completed && (
                          <span
                            className="text-green-600"
                            aria-label="Completed"
                          >
                            ✓
                          </span>
                        )}

                        <h3 className="font-medium text-slate-900">
                          {task.title}
                        </h3>

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        {task.category} ·{" "}
                        {task.estimatedMinutes} min
                        {task.dueDate &&
                          ` · Due ${task.dueDate}`}
                      </p>

                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${
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

                </div>

              ))

            )}

          </div>

        </section>

        {/* ERROR */}

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p className="font-medium">
              We couldn't create your plan.
            </p>

            <p className="mt-1">
              {error}
            </p>
          </div>
        )}

        {/* LOADING */}

        {generating && (
          <section
            aria-live="polite"
            className="mt-8 rounded-2xl border bg-white p-8 text-center shadow-sm"
          >
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

            <h2 className="font-semibold text-slate-900">
              Analyzing your workload...
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              StudyFlow is comparing priority, deadlines,
              and estimated effort.
            </p>
          </section>
        )}

        {/* AI RESULT */}

        {plan && !generating && (
          <section
            aria-labelledby="plan-heading"
            className="mt-8 space-y-6"
          >

            {/* SUMMARY */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <p className="text-sm font-medium text-indigo-600">
                AI Recommendation
              </p>

              <h2
                id="plan-heading"
                className="mt-1 text-2xl font-bold text-slate-900"
              >
                Your suggested plan
              </h2>

              <p className="mt-4 leading-7 text-slate-700">
                {plan.summary}
              </p>

            </div>

            {/* PRIORITY ORDER */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <div className="mb-5">
                <h2 className="text-xl font-semibold text-slate-900">
                  What to work on first
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  StudyFlow ranked your active tasks based
                  on urgency, priority, and effort.
                </p>
              </div>

              <div className="space-y-3">

                {plan.recommendedTasks.map(
                  (recommended, index) => {

                    const task = getTask(
                      recommended.taskId
                    );

                    if (!task) {
                      return null;
                    }

                    return (
                      <div
                        key={recommended.taskId}
                        className="rounded-xl border p-4"
                      >

                        <div className="flex items-start gap-4">

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                            {index + 1}
                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <h3 className="font-semibold text-slate-900">
                                {task.title}
                              </h3>

                              <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
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

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {recommended.reason}
                            </p>

                            <p className="mt-2 text-xs text-slate-500">
                              {task.estimatedMinutes} min ·{" "}
                              {task.category} · Due{" "}
                              {task.dueDate}
                            </p>

                          </div>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            </div>

            {/* WORKLOAD WARNING */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <h2 className="text-xl font-semibold text-slate-900">
                Workload check
              </h2>

              <div className="mt-4 rounded-xl bg-slate-50 p-4">

                <p className="text-sm leading-6 text-slate-700">
                  {plan.workloadWarning}
                </p>

              </div>

            </div>

            {/* STUDY SESSION */}

            <div className="rounded-2xl border bg-white p-6 shadow-sm">

              <div className="mb-5">
                <h2 className="text-xl font-semibold text-slate-900">
                  Suggested study session
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  A realistic way to approach your current
                  workload.
                </p>
              </div>

              <div className="space-y-3">

                {plan.session.map((item, index) => (

                  <div
                    key={`${item.time}-${index}`}
                    className="flex gap-4 rounded-xl border p-4"
                  >

                    <div className="w-24 shrink-0 text-sm font-semibold text-indigo-600">
                      {item.time}
                    </div>

                    <p className="text-sm leading-6 text-slate-700">
                      {item.activity}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* REGENERATE */}

            <div className="text-center">

              <button
                type="button"
                onClick={generatePlan}
                disabled={generating}
                className="rounded-xl border bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
              >
                Regenerate Plan
              </button>

            </div>

          </section>
        )}

      </div>
    </main>
  );
}

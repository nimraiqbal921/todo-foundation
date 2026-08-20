"use client";

import { useEffect, useState } from "react";
import { getTasks, saveTasks } from "@/lib/task-storage";
import type { Task, Priority } from "@/lib/types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState("30");
  const [category, setCategory] = useState("Study");

  useEffect(() => {
    setTasks(getTasks());
    setLoaded(true);
  }, []);

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      estimatedMinutes: Number(estimatedMinutes) || 30,
      category,
      completed: false,
    };

    setTasks((currentTasks) => {
      const updatedTasks = [...currentTasks, newTask];
      saveTasks(updatedTasks);
      return updatedTasks;
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setEstimatedMinutes("30");
    setCategory("Study");
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      );

      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.filter(
        (task) => task.id !== id
      );

      saveTasks(updatedTasks);
      return updatedTasks;
    });
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        <header className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            StudyFlow
          </p>

          <h1 className="mt-1 text-4xl font-bold tracking-tight text-slate-900">
            My Tasks
          </h1>

          <p className="mt-2 text-slate-600">
            Add your own academic tasks and let StudyFlow help you plan them.
          </p>
        </header>

        <section
          aria-label="Task statistics"
          className="mb-8 grid gap-4 sm:grid-cols-3"
        >
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {completedCount}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Remaining</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {tasks.length - completedCount}
            </p>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">

          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Add a task
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              You decide what needs to get done.
            </p>

            <form onSubmit={addTask} className="mt-6 space-y-4">

              <div>
                <label
                  htmlFor="task-title"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Task title
                </label>

                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Study normalization"
                  className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id="task-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="What needs to be done?"
                  className="min-h-24 w-full resize-none rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="task-priority"
                  value={priority}
                  onChange={(event) =>
                    setPriority(event.target.value as Priority)
                  }
                  className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-date"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Due date
                </label>

                <input
                  id="task-date"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="task-time"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Estimated time (minutes)
                </label>

                <input
                  id="task-time"
                  type="number"
                  min="5"
                  value={estimatedMinutes}
                  onChange={(event) =>
                    setEstimatedMinutes(event.target.value)
                  }
                  className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="task-category"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Category
                </label>

                <select
                  id="task-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-xl border px-3 py-2.5 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Study</option>
                  <option>Assignment</option>
                  <option>Exam</option>
                  <option>Project</option>
                  <option>Practice</option>
                  <option>Deadline</option>
                  <option>Other</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                + Add Task
              </button>

            </form>
          </section>

          <section className="rounded-2xl border bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Your Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                These are the tasks you have created.
              </p>
            </div>

            {!loaded ? (

              <div className="rounded-2xl border border-dashed p-10 text-center">
                <p className="text-sm text-slate-500">
                  Loading your tasks...
                </p>
              </div>

            ) : tasks.length === 0 ? (

              <div className="rounded-2xl border border-dashed p-10 text-center">
                <p className="text-lg font-medium text-slate-800">
                  No tasks yet
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Add your first task and StudyFlow can help you plan it.
                </p>
              </div>

            ) : (

              <div className="space-y-3">

                {tasks.map((task) => (

                  <article
                    key={task.id}
                    className="rounded-xl border p-4"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex gap-3">

                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          aria-label={`Mark ${task.title} as ${
                            task.completed ? "incomplete" : "complete"
                          }`}
                          className="mt-1 h-4 w-4"
                        />

                        <div>

                          <h3
                            className={
                              task.completed
                                ? "font-semibold text-slate-400 line-through"
                                : "font-semibold text-slate-900"
                            }
                          >
                            {task.title}
                          </h3>

                          {task.description && (
                            <p className="mt-1 text-sm text-slate-500">
                              {task.description}
                            </p>
                          )}

                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() => deleteTask(task.id)}
                        className="text-sm text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-500"
                        aria-label={`Delete ${task.title}`}
                      >
                        Delete
                      </button>

                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-xs">

                      <span className="rounded-full bg-slate-100 px-3 py-1 capitalize">
                        {task.priority}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1">
                        {task.category}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1">
                        {task.estimatedMinutes} min
                      </span>

                      {task.dueDate && (
                        <span className="rounded-full bg-slate-100 px-3 py-1">
                          Due {task.dueDate}
                        </span>
                      )}

                    </div>

                  </article>

                ))}

              </div>

            )}

          </section>

        </div>
      </div>
    </main>
  );
}

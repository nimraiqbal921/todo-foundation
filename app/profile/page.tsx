"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Nimra");
  const [academicFocus, setAcademicFocus] =
    useState("Computer Science");
  const [studyGoal, setStudyGoal] = useState(
    "Stay organized and complete tasks on time"
  );

  const [sessionLength, setSessionLength] =
    useState("30 minutes");

  const [breakPreference, setBreakPreference] =
    useState("Short breaks");

  const [planningStyle, setPlanningStyle] =
    useState("Deadline-focused");

  const [defaultPriority, setDefaultPriority] =
    useState("Medium");

  const [saved, setSaved] = useState(false);

  const [preferences, setPreferences] = useState({
    deadlines: true,
    difficulty: true,
    workload: true,
    sessions: true,
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      "studyflow-profile"
    );

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        setName(profile.name || "Nimra");
        setAcademicFocus(
          profile.academicFocus || "Computer Science"
        );
        setStudyGoal(
          profile.studyGoal ||
            "Stay organized and complete tasks on time"
        );
        setSessionLength(
          profile.sessionLength || "30 minutes"
        );
        setBreakPreference(
          profile.breakPreference || "Short breaks"
        );
        setPlanningStyle(
          profile.planningStyle || "Deadline-focused"
        );
        setDefaultPriority(
          profile.defaultPriority || "Medium"
        );

        if (profile.preferences) {
          setPreferences(profile.preferences);
        }
      } catch {
        // Ignore invalid saved profile data.
      }
    }
  }, []);

  function saveProfile() {
    const profile = {
      name,
      academicFocus,
      studyGoal,
      sessionLength,
      breakPreference,
      planningStyle,
      defaultPriority,
      preferences,
    };

    localStorage.setItem(
      "studyflow-profile",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  }

  function togglePreference(
    key: keyof typeof preferences
  ) {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
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
            👤 Profile
          </h1>

          <p className="mt-2 text-slate-600">
            Manage your study goals and planning preferences.
          </p>
        </header>

        {/* ABOUT YOU */}

        <section className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              About You
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell StudyFlow a little about your academic goals.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="academic-focus"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Academic Focus
              </label>

              <input
                id="academic-focus"
                type="text"
                value={academicFocus}
                onChange={(event) =>
                  setAcademicFocus(event.target.value)
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          <div className="mt-5">

            <label
              htmlFor="study-goal"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Study Goal
            </label>

            <textarea
              id="study-goal"
              value={studyGoal}
              onChange={(event) =>
                setStudyGoal(event.target.value)
              }
              className="min-h-24 w-full resize-none rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

        </section>

        {/* STUDY PREFERENCES */}

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Study Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Choose how you prefer to study.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* SESSION */}

            <div>
              <label
                htmlFor="session-length"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Preferred session
              </label>

              <select
                id="session-length"
                value={sessionLength}
                onChange={(event) =>
                  setSessionLength(event.target.value)
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>25 minutes</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
                <option>90 minutes</option>
              </select>
            </div>

            {/* BREAK */}

            <div>
              <label
                htmlFor="break-preference"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Break preference
              </label>

              <select
                id="break-preference"
                value={breakPreference}
                onChange={(event) =>
                  setBreakPreference(event.target.value)
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>No breaks</option>
                <option>Short breaks</option>
                <option>Regular breaks</option>
                <option>Long breaks</option>
              </select>
            </div>

            {/* PLANNING STYLE */}

            <div>
              <label
                htmlFor="planning-style"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Planning style
              </label>

              <select
                id="planning-style"
                value={planningStyle}
                onChange={(event) =>
                  setPlanningStyle(event.target.value)
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Deadline-focused</option>
                <option>Priority-focused</option>
                <option>Balanced</option>
                <option>Flexible</option>
              </select>
            </div>

            {/* PRIORITY */}

            <div>
              <label
                htmlFor="default-priority"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Default priority
              </label>

              <select
                id="default-priority"
                value={defaultPriority}
                onChange={(event) =>
                  setDefaultPriority(event.target.value)
                }
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

          </div>

        </section>

        {/* PLANNING PREFERENCES */}

        <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Planning Preferences
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Tell StudyFlow what matters when creating your plans.
            </p>
          </div>

          <div className="space-y-3">

            {/* DEADLINES */}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:bg-slate-50">

              <input
                type="checkbox"
                checked={preferences.deadlines}
                onChange={() =>
                  togglePreference("deadlines")
                }
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="font-medium text-slate-800">
                  Prioritize upcoming deadlines
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Give tasks with closer deadlines more attention.
                </p>
              </div>

            </label>

            {/* DIFFICULTY */}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:bg-slate-50">

              <input
                type="checkbox"
                checked={preferences.difficulty}
                onChange={() =>
                  togglePreference("difficulty")
                }
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="font-medium text-slate-800">
                  Consider task difficulty
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Consider effort and estimated time when planning.
                </p>
              </div>

            </label>

            {/* WORKLOAD */}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:bg-slate-50">

              <input
                type="checkbox"
                checked={preferences.workload}
                onChange={() =>
                  togglePreference("workload")
                }
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="font-medium text-slate-800">
                  Balance workload
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Avoid creating unrealistic study schedules.
                </p>
              </div>

            </label>

            {/* SESSIONS */}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 hover:bg-slate-50">

              <input
                type="checkbox"
                checked={preferences.sessions}
                onChange={() =>
                  togglePreference("sessions")
                }
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="font-medium text-slate-800">
                  Suggest realistic study sessions
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Break your workload into manageable study sessions.
                </p>
              </div>

            </label>

          </div>

        </section>

        {/* SAVE */}

        <section className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border bg-white p-6 shadow-sm sm:flex-row">

          <div>
            <p className="font-medium text-slate-900">
              Save your preferences
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Your profile is saved locally in your browser.
            </p>
          </div>

          <button
            type="button"
            onClick={saveProfile}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Profile
          </button>

        </section>

        {saved && (
          <div
            role="status"
            className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700"
          >
            ✓ Your StudyFlow profile has been saved successfully.
          </div>
        )}

      </div>
    </main>
  );
}
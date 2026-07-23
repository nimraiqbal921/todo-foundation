"use client";

import { useState } from "react";

export default function Disclosure() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        About Me
      </button>

      {open && (
        <div>
          <p>
            I am a Front-End Developer learning React
            and accessibility.
          </p>
        </div>
      )}
    </div>
  );
}
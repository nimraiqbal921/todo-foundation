"use client";

import { useRef, useState, useEffect } from "react";

export default function Modal() {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      modalRef.current?.focus();
    } else {
      buttonRef.current?.focus();
    }
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
    }

    if (e.key === "Tab") {
      const focusableElements =
        modalRef.current?.querySelectorAll("button");

      if (!focusableElements || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement =
        focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }

      if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>

      {open && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
        >
          <h2>My Modal</h2>

          <p>
            This is a modal dialog.
          </p>

          <button onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
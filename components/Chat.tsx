"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import ToolRenderer from "./ToolRenderer";

export default function Chat() {
  const {
    messages,
    sendMessage,
    stop,
    status,
    error,
    regenerate,
  } = useChat();

  const [input, setInput] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isAtBottom]);

  function handleScroll() {
    const box = chatBoxRef.current;

    if (!box) return;

    const atBottom =
      box.scrollHeight -
        box.scrollTop <=
      box.clientHeight + 50;

    setIsAtBottom(atBottom);
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    sendMessage({
      text: input.trim(),
    });

    setInput("");
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">

      <h1 className="text-3xl font-bold mb-5">
        AI Tool Chat
      </h1>

      {/* CHAT AREA */}
      <div
        ref={chatBoxRef}
        onScroll={handleScroll}
        className="
          border
          rounded-lg
          p-4
          h-[500px]
          overflow-y-auto
          space-y-4
        "
      >

        {/* EMPTY STATE */}
        {messages.length === 0 && !error && (
          <div className="flex h-full items-center justify-center">
            <div className="text-center max-w-md">
              <h2 className="text-xl font-semibold text-gray-800">
                No messages yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Try asking me to create a task, check your
                tasks, or help you plan your day.
              </p>

              <button
                type="button"
                onClick={() => {
                  setInput("Show me my tasks");
                }}
                className="
                  mt-5
                  rounded-lg
                  bg-gray-100
                  px-4
                  py-2
                  text-sm
                  hover:bg-gray-200
                "
              >
                Try an example
              </button>
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`
              p-3
              rounded-lg
              ${
                message.role === "user"
                  ? "bg-blue-100 ml-10"
                  : "bg-gray-100 mr-10"
              }
            `}
          >
            <p className="font-bold mb-2">
              {message.role === "user" ? "You" : "AI"}
            </p>

            {message.parts.map((part, index) => {
              if (part.type === "text") {
                return (
                  <p key={index}>
                    {part.text}
                  </p>
                );
              }

              if (part.type.startsWith("tool-")) {
                return (
                  <ToolRenderer
                    key={index}
                    part={part}
                  />
                );
              }

              return null;
            })}
          </div>
        ))}

        {/* LOADING STATE */}
        {status === "submitted" && (
          <div
            className="
              bg-gray-100
              rounded-lg
              p-4
              mr-10
            "
          >
            <div className="animate-pulse space-y-2">
              <div className="h-3 w-3/4 rounded bg-gray-300" />
              <div className="h-3 w-1/2 rounded bg-gray-300" />
              <div className="h-3 w-2/3 rounded bg-gray-300" />
            </div>
          </div>
        )}

        {/* ERROR STATE */}
        {error && (
          <div
            className="
              mr-10
              rounded-lg
              border
              border-red-200
              bg-red-50
              p-4
            "
          >
            <p className="font-semibold text-red-700">
              Something went wrong
            </p>

            <p className="mt-1 text-sm text-red-600">
              Your message could not be completed.
              Please try again.
            </p>

            <button
              type="button"
              onClick={() => regenerate()}
              className="
                mt-3
                rounded-lg
                bg-black
                px-4
                py-2
                text-sm
                font-medium
                text-white
                hover:bg-gray-800
              "
            >
              Retry
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* JUMP TO LATEST */}
      {!isAtBottom && (
        <button
          type="button"
          onClick={() => {
            bottomRef.current?.scrollIntoView({
              behavior: "smooth",
            });

            setIsAtBottom(true);
          }}
          className="
            fixed
            bottom-24
            right-10
            bg-black
            text-white
            px-4
            py-2
            rounded-full
          "
        >
          Jump to latest ↓
        </button>
      )}

      {/* INPUT */}
      <form
        onSubmit={submit}
        className="flex gap-2 mt-4"
      >
        <input
          suppressHydrationWarning
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="
            flex-1
            rounded-lg
            border
            border-gray-300
            px-4
            py-3
            outline-none
            focus:border-black
          "
        />

        {/* STOP / SEND */}
        {status === "streaming" ||
        status === "submitted" ? (
          <button
            type="button"
            onClick={() => stop()}
            className="
              rounded-lg
              bg-red-600
              px-5
              text-white
              hover:bg-red-700
            "
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="
              rounded-lg
              bg-black
              px-5
              text-white
              hover:bg-gray-800
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
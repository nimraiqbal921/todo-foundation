"use client";

import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Tab 1",
      content: "This is content of Tab 1",
    },
    {
      title: "Tab 2",
      content: "This is content of Tab 2",
    },
    {
      title: "Tab 3",
      content: "This is content of Tab 3",
    },
  ];

  function handleKeyDown(
    e: React.KeyboardEvent,
    index: number
  ) {
    if (e.key === "ArrowRight") {
      setActiveTab((index + 1) % tabs.length);
    }

    if (e.key === "ArrowLeft") {
      setActiveTab(
        (index - 1 + tabs.length) % tabs.length
      );
    }

    if (e.key === "Home") {
      setActiveTab(0);
    }

    if (e.key === "End") {
      setActiveTab(tabs.length - 1);
    }
  }

  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.title}
            role="tab"
            aria-selected={activeTab === index}
            onClick={() => setActiveTab(index)}
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
          >
            {tab.title}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
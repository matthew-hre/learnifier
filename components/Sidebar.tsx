"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTopics } from "../app/contexts/TopicsContext";

export default function Sidebar() {
  const { topics } = useTopics();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background-muted h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Topics</h2>
        {topics.length === 0 ? (
          <p className="text-foreground-muted">No topics generated yet.</p>
        ) : (
          <ul className="space-y-2">
            {topics.map((topic, index) => (
              <li key={index}>
                <Link
                  href={`/quiz/${encodeURIComponent(topic.name)}`}
                  className={`block p-2 rounded ${
                    pathname === `/quiz/${encodeURIComponent(topic.name)}`
                      ? "bg-foreground-muted"
                      : "hover:bg-foreground-muted"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{topic.name}</span>
                    <span className="text-sm text-foreground">
                      {topic.completion}%
                    </span>
                  </div>
                  <div className="w-full bg-background h-1 mt-1 rounded">
                    <div
                      className="bg-green h-1 rounded"
                      style={{ width: `${topic.completion}%` }}
                    ></div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

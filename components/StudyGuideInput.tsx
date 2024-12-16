"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTopics } from "../app/contexts/TopicsContext";

export default function StudyGuideInput() {
  const [studyGuide, setStudyGuide] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setTopics } = useTopics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studyGuide }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate topics");
      }

      const { topics } = await response.json();

      const topicsWithCompletion = topics.map((topic: object) => ({
        ...topic,
        completion: 0,
      }));

      setTopics(topicsWithCompletion);

      router.push(`/quiz/${encodeURIComponent(topicsWithCompletion[0].name)}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate topics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={studyGuide}
        onChange={(e) => setStudyGuide(e.target.value)}
        placeholder="Paste your study guide here..."
        className="w-full h-64 p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Generating Topics..." : "Generate Topics"}
      </button>
    </form>
  );
}

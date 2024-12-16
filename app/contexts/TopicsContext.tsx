"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Topic {
  name: string;
  description: string;
  subtopics: string[];
  completion: number;
}

interface TopicsContextType {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  updateTopicCompletion: (topicName: string, completion: number) => void;
}

const TopicsContext = createContext<TopicsContextType | undefined>(undefined);

export function TopicsProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>(() => {
    if (typeof window !== "undefined") {
      const savedTopics = localStorage.getItem("topics");
      return savedTopics ? JSON.parse(savedTopics) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("topics", JSON.stringify(topics));
  }, [topics]);

  const updateTopicCompletion = (topicName: string, completion: number) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.name === topicName ? { ...topic, completion } : topic
      )
    );
  };

  return (
    <TopicsContext.Provider
      value={{ topics, setTopics, updateTopicCompletion }}
    >
      {children}
    </TopicsContext.Provider>
  );
}

export function useTopics() {
  const context = useContext(TopicsContext);
  if (context === undefined) {
    throw new Error("useTopics must be used within a TopicsProvider");
  }
  return context;
}

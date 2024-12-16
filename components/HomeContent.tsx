"use client";

import { useTopics } from "../app/contexts/TopicsContext";
import StudyGuideInput from "./StudyGuideInput";

export default function HomeContent() {
  const { topics } = useTopics();

  return (
    <>
      {topics.length > 0 ? (
        <div>
          <p className="mb-4">
            You have already generated topics. Select a topic from the sidebar
            to start studying!
          </p>
          <p>
            If you want to generate new topics, please refresh the page and
            submit a new study guide.
          </p>
        </div>
      ) : (
        <StudyGuideInput />
      )}
    </>
  );
}

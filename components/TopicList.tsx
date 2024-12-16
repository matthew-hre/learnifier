import Link from "next/link";

interface TopicListProps {
  topics: string[];
}

export default function TopicList({ topics }: TopicListProps) {
  return (
    <ul className="space-y-4">
      {topics.map((topic, index) => (
        <li key={index}>
          <Link
            href={`/quiz/${encodeURIComponent(topic)}`}
            className="block p-4 bg-gray-800 hover:bg-gray-700 rounded"
          >
            {topic}
          </Link>
        </li>
      ))}
    </ul>
  );
}

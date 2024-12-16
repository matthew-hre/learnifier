import TopicList from "@/components/TopicList";

export default function Topics() {
  // TODO: Fetch topics from API or state management
  const mockTopics = ["Topic 1", "Topic 2", "Topic 3"];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Study Topics</h1>
      <TopicList topics={mockTopics} />
    </main>
  );
}

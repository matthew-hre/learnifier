import { Suspense } from "react";
import Quiz from "@/components/Quiz";
import { Loader } from "lucide-react";

export default async function QuizPage({
  params,
}: {
  params: { topic: string };
}) {
  const { topic } = await params;
  const topicName = decodeURIComponent(topic);

  return (
    <main className="p-8 min-h-screen">
      <Suspense
        fallback={
          <div className="h-full flex flex-col items-center justify-center">
            <Loader className="mx-auto animate-spin" size={64} />
          </div>
        }
      >
        <Quiz topicName={topicName} />
      </Suspense>
    </main>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useTopics } from "../app/contexts/TopicsContext";
import { useRouter } from "next/navigation";
import { generateQuestions } from "../app/actions/generateQuestions";
import { Loader } from "lucide-react";

interface QuizProps {
  topicName: string;
}

interface Question {
  question: string;
  type: "multiple-choice" | "short-answer";
  options: string[] | null;
  correctAnswer: string;
  explanation: string;
}

export default function Quiz({ topicName }: QuizProps) {
  const { topics, updateTopicCompletion } = useTopics();
  const router = useRouter();
  const topic = topics.find((t) => t.name === topicName);
  const [currentSubtopic, setCurrentSubtopic] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showShowCorrectAnswerButton, setShowShowCorrectAnswerButton] =
    useState(false);

  useEffect(() => {
    if (topic) {
      loadQuestions();
    }
  }, [topic, currentSubtopic]);

  const loadQuestions = async () => {
    if (topic) {
      setIsLoading(true);
      try {
        const generatedQuestions = await generateQuestions(
          topic.name,
          topic.subtopics[currentSubtopic]
        );
        setQuestions(generatedQuestions);
        setCurrentQuestion(0);
        setUserAnswer("");
        setSelectedOption(null);
        setFeedback("");
        setShowExplanation(false);
      } catch (error) {
        console.error("Failed to load questions:", error);
      }
      setIsLoading(false);
    }
  };

  if (!topic) {
    return <div>Topic not found</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentQ = questions[currentQuestion];
    let isCorrect = false;

    if (currentQ.type === "multiple-choice") {
      isCorrect = selectedOption === currentQ.correctAnswer;
      console.log(selectedOption, currentQ.correctAnswer);
    } else {
      isCorrect = userAnswer
        .toLowerCase()
        .includes(currentQ.correctAnswer.toLowerCase());
    }

    if (isCorrect) {
      console.log("Correct");
      setFeedback("Correct! Great job!");
      setShowExplanation(true);
    } else {
      console.log("Incorrect");
      setFeedback("Not quite. Try again!");
      setShowShowCorrectAnswerButton(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (currentSubtopic < topic.subtopics.length - 1) {
      setCurrentSubtopic((prev) => prev + 1);
      const newCompletion = Math.round(
        ((currentSubtopic + 1) / topic.subtopics.length) * 100
      );
      updateTopicCompletion(topicName, newCompletion);
    } else {
      // Quiz completed
      updateTopicCompletion(topicName, 100);
      router.push("/"); // Redirect to home page after completing the quiz
    }
    setUserAnswer("");
    setSelectedOption(null);
    setFeedback("");
    setShowExplanation(false);
    setShowCorrectAnswer(false);
    setShowShowCorrectAnswerButton(false);
  };

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="mx-auto animate-spin" size={64} />
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{topic.name}</h2>
      <p className="text-foreground-muted">{topic.description}</p>
      <div className="bg-background-muted p-4 rounded">
        <h3 className="text-xl mb-2">
          Question about {topic.subtopics[currentSubtopic]}
        </h3>
        <p className="mb-4">{currentQ.question}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentQ.type === "multiple-choice" ? (
            <div className="grid grid-cols-2 gap-4">
              {currentQ.options?.map((option, index) => (
                <div
                  key={index}
                  className={`p-2 border border-foreground-muted rounded cursor-pointer ${
                    selectedOption === String.fromCharCode(65 + index)
                      ? "bg-primary text-foreground border-none"
                      : "bg-background-muted text-foreground"
                  }`}
                  onClick={() =>
                    setSelectedOption(String.fromCharCode(65 + index))
                  }
                >
                  {option}
                </div>
              ))}
            </div>
          ) : (
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer..."
              className="w-full p-2 bg-background text-foreground border border-foreground-muted rounded"
              rows={4}
            />
          )}
          <button
            type="submit"
            className="px-4 py-2 mr-4 bg-primary hover:bg-foreground-muted text-foreground rounded"
            disabled={showCorrectAnswer}
          >
            Submit Answer
          </button>
          {showShowCorrectAnswerButton && (
            <button
              onClick={() => setShowCorrectAnswer(true)}
              className="px-4 py-2 bg-background hover:bg-foreground-muted text-foreground rounded"
            >
              Show Correct Answer
            </button>
          )}
        </form>
      </div>
      {feedback && (
        <div
          className={`p-4 rounded border bg-background-muted ${
            feedback.includes("Correct") ? "border-green" : "border-red"
          }`}
        >
          <p className="font-bold">{feedback}</p>
          {showCorrectAnswer && (
            <p className="mt-2 text-foreground-muted">
              <strong>Correct Answer:</strong> {currentQ.correctAnswer}
            </p>
          )}
          {(showExplanation || showCorrectAnswer) && (
            <p
              className={`mt-2 ${
                showCorrectAnswer ? "text-foreground-muted" : "text-foreground"
              }`}
            >
              {currentQ.explanation}
            </p>
          )}
        </div>
      )}
      {feedback && (
        <button
          onClick={handleNext}
          className="px-4 py-2 mr-4 bg-primary hover:bg-foreground-muted text-foreground rounded"
        >
          Next Question
        </button>
      )}
      <div className="text-background-muted">
        Progress: Subtopic {currentSubtopic + 1} / {topic.subtopics.length},
        Question {currentQuestion + 1} / {questions.length}
      </div>
    </div>
  );
}

"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function generateQuestions(topic: string, subtopic: string) {
  const prompt = `
    Generate several quiz questions about the subtopic "${subtopic}" within the main topic "${topic}".
    Each question should be challenging and test deep understanding.
    For each question, decide if it's best suited as a multiple-choice or short answer question.
    Short answer questions should only be used if the answer is single term to a definition, or a value to a math / logic question.
    If it's a multiple-choice question, provide 4 options.
    Format the response as a JSON array of objects without markdown formatting, where each object has the following structure:
    {
      "question": "The question text",
      "type": "multiple-choice" or "short-answer",
      "options": ["A", "B", "C", "D"] (only for multiple-choice, null for short-answer),
      "correctAnswer": "The correct answer (option letter for multiple-choice, or brief answer for short-answer)",
      "explanation": "A brief explanation of the correct answer"
    }
  `;

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
    });

    const questions = JSON.parse(text);
    return questions;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions");
  }
}

import { NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  try {
    const { studyGuide } = await req.json();

    const prompt = `
      Given the following study guide, generate main topics for study. 
      For each topic, provide a brief description and a list of subtopics.
      Format the response as a JSON array of objects without markdown formatting, where each object has the following structure:
      {
        "name": "Main Topic Name",
        "description": "Brief description of the topic",
        "subtopics": ["Subtopic 1", "Subtopic 2", "Subtopic 3"]
      }

      Study Guide:
      ${studyGuide}
    `;

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: prompt,
    });

    const topics = JSON.parse(text);

    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error generating topics:", error);
    return NextResponse.json(
      { error: "Failed to generate topics" },
      { status: 500 }
    );
  }
}

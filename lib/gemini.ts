import { GoogleGenerativeAI } from "@google/generative-ai";

// Access variables using process.env

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API || "";

const genAI = new GoogleGenerativeAI(apiKey);

export async function getTeacherFeedback(
  questions: any[],
  answers: Record<string, string>,
  nextClass: any[]
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert, encouraging teacher. Review these quiz questions and student answers.
    Provide constructive feedback for each question and one final overall summary.

    Then look through the provided next possible lessons and suggest which lessons the student should focus on to improve their skills based on their quiz performance.

    Select the index 
    
    Data:
    ${questions
      .map(
        (q) =>
          `ID: ${q.id} | Question: ${q.text} | Answer: ${
            answers[q.id] || "No answer"
          }`
      )
      .join("\n")}
    
    Next Lessons:
    ${nextClass
      .map((lesson, index) => `Index: ${index} | Title: ${lesson}`)
      .join("\n")}

    Return ONLY a valid JSON object with:
    1. "perQuestion": object where keys are Question IDs and values are feedback strings which are 1-2 sentences.
    2. "finalSummary": a 2-3 sentence summary of overall performance.
    3. "recommendedLessonIndex": the index number of the most suitable next lesson for the student to focus on.
    4. "recommendedLessonSentence": a 1-2 sentence explanation of why this lesson is recommended.
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response
      .text()
      .replace(/```json|```/g, "")
      .trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyA0vlSFsEUhGT6ur_r169JEZlL4Lg4W7nY");

export async function getTeacherFeedback(
  questions: any[],
  answers: Record<string, string>
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an expert, encouraging teacher. Review these quiz questions and student answers.
    Provide constructive feedback for each question and one final overall summary.
    
    Data:
    ${questions
      .map(
        (q) =>
          `ID: ${q.id} | Question: ${q.text} | Answer: ${
            answers[q.id] || "No answer"
          }`
      )
      .join("\n")}

    Return ONLY a valid JSON object with:
    1. "perQuestion": object where keys are Question IDs and values are feedback strings which are 1-2 sentences.
    2. "finalSummary": a 2-3 sentence summary of overall performance.
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

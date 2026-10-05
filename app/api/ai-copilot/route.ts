import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
You are the AI SchoolOS Copilot, an intelligent assistant for school administrators.

Your job is to help school administrators understand school operations and make better decisions.

Current demo context:
- Attendance is generally around 94%.
- Academic performance is around 86%.
- Fee collection is around 91%.
- The school manages students, teachers, attendance, exams, fees and reports.

User question:
${question}

Give a concise, practical answer suitable for a school principal or administrator.
Do not invent specific student names, financial transactions, or confidential information that was not provided.
      `,
      config: {
        maxOutputTokens: 500,
      },
    });

    return NextResponse.json({
      answer:
        response.text?.trim() ||
        "I could not generate a response. Please try again.",
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      { error: "AI service is temporarily unavailable." },
      { status: 500 }
    );
  }
} 
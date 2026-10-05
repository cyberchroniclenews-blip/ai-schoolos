"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const quickQuestions = [
  "Which students need attendance follow-up?",
  "Give me an academic performance summary.",
  "Which fees need urgent follow-up?",
  "What should the principal focus on today?",
];

export default function AICopilotPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I’m your AI SchoolOS Copilot. Ask me about attendance, academics, fees or daily school operations.",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  async function askCopilot(text: string) {
    const trimmed = text.trim();

    if (!trimmed || isThinking) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: trimmed,
      },
    ]);

    setQuestion("");
    setIsThinking(true);

    try {
      const response = await fetch("/api/ai-copilot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            data.answer ||
            "I could not generate a response. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Copilot error:", error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "I’m unable to connect to the AI service right now. Please check the Gemini configuration and try again.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void askCopilot(question);
  }

  return (
    <div className="space-y-7">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <Badge>AI SCHOOLOS COPILOT</Badge>

          <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            AI Copilot
          </h1>

          <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600">
            Ask questions about school operations and turn school data into
            actionable insights.
          </p>
        </div>

        <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
            Intelligence Layer
          </p>

          <p className="mt-1 text-sm font-semibold text-brand-800">
            Powered by Gemini
          </p>
        </div>
      </section>

      {/* AI status */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-lg text-white shadow-sm">
              ✦
            </div>

            <div>
              <p className="font-semibold text-ink">
                School Intelligence Assistant
              </p>

              <p className="text-sm text-slate-500">
                Real-time AI responses for school administration.
              </p>
            </div>
          </div>

          <Badge variant="success">AI ONLINE</Badge>
        </CardContent>
      </Card>

      {/* Main Copilot */}
      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <Card className="overflow-hidden">
          <CardHeader className="border-b border-slate-200">
            <CardTitle>Ask your school assistant</CardTitle>

            <p className="mt-1 text-sm text-slate-500">
              Ask naturally about attendance, academics, fees or operations.
            </p>
          </CardHeader>

          <CardContent className="flex min-h-[560px] flex-col p-0">
            {/* Messages */}
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      message.role === "user"
                        ? "max-w-[85%] rounded-2xl rounded-br-md bg-navy px-4 py-3 text-sm leading-6 text-white"
                        : "max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                    }
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    Gemini is analyzing your question...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-slate-200 p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Ask about attendance, exams, fees..."
                  disabled={isThinking}
                  aria-label="Ask AI Copilot"
                />

                <button
                  type="submit"
                  disabled={isThinking || !question.trim()}
                  className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isThinking ? "Thinking..." : "Ask AI"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Quick Questions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Questions</CardTitle>

            <p className="mt-1 text-sm text-slate-500">
              Start with a common school-management question.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            {quickQuestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => void askCopilot(item)}
                disabled={isThinking}
                className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium leading-6 text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {item}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Insight cards */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Attendance
            </p>

            <p className="mt-2 text-xl font-bold text-ink">94.2%</p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Overall attendance remains strong.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Academics
            </p>

            <p className="mt-2 text-xl font-bold text-ink">86.4%</p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Average academic performance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Fees
            </p>

            <p className="mt-2 text-xl font-bold text-ink">91%</p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Current collection efficiency.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
} 
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:5050/api";

async function http<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const txt = await res.text();
  if (!res.ok) {
    throw new Error(txt || `${res.status} ${res.statusText}`);
  }
  try {
    return JSON.parse(txt) as T;
  } catch {
    return txt as unknown as T;
  }
}

export type RandomQuestion = {
  id: string;
  instruction: string;
  stage?: "preflop" | "postflop";
  street?: "preflop" | "flop" | "turn" | "river";
  choices: string[];
  correctAnswer: string;
};

export const api = {
  randomQuestion: (stage?: "preflop" | "postflop") =>
    http<RandomQuestion>("GET", `/questions/random${stage ? `?stage=${stage}` : ""}`),
  explain: (instruction: string, selectedAnswer: string, correctAnswer: string) =>
    http<{ explanation: string }>("POST", "/explain", {
      instruction,
      selectedAnswer,
      correctAnswer,
    }),
};

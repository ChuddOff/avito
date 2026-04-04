import { puter } from "@heyputer/puter.js";

export type PuterChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type PuterTextPart = {
  text?: string;
};

type PuterChatResponse = {
  message?: {
    content?: string | PuterTextPart[];
  };
};

function extractPuterText(response: unknown) {
  if (typeof response === "string") {
    return response.trim();
  }

  const maybeResponse = response as PuterChatResponse;
  const content = maybeResponse.message?.content;

  if (typeof content === "string") {
    return content.trim();
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => part?.text ?? "")
      .join("")
      .trim();
  }

  return "";
}

export async function puterChat(messages: PuterChatMessage[]) {
  const response = await puter.ai.chat(messages, {
    model: "gpt-5.4-nano",
    stream: false,
    temperature: 0.2,
    max_tokens: 400,
  });

  const text = extractPuterText(response);

  if (!text) {
    throw new Error("Puter вернул пустой ответ");
  }

  return text;
}

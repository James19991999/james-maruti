import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { buildChatSystemPrompt } from "@/lib/chat-context";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TURNS = 12; // caps conversation length sent per request (cost + abuse control)

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The chat assistant isn't configured yet. Try the contact form instead." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { messages } = (body ?? {}) as { messages?: unknown };

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }
  if (messages.length > MAX_TURNS) {
    return NextResponse.json(
      { error: "This conversation has gotten long — try starting a new one." },
      { status: 400 }
    );
  }

  const cleanMessages: ChatMessage[] = [];
  for (const m of messages) {
    if (
      typeof m !== "object" ||
      m === null ||
      !("role" in m) ||
      !("content" in m) ||
      (m as { role: unknown }).role !== "user" && (m as { role: unknown }).role !== "assistant" ||
      typeof (m as { content: unknown }).content !== "string"
    ) {
      return NextResponse.json({ error: "Malformed message in conversation." }, { status: 400 });
    }
    const content = (m as ChatMessage).content.trim();
    if (content.length === 0 || content.length > 2000) {
      return NextResponse.json(
        { error: "Messages must be between 1 and 2000 characters." },
        { status: 400 }
      );
    }
    cleanMessages.push({ role: (m as ChatMessage).role, content });
  }

  try {
    const ip = getClientIp(request);
    const { allowed, retryAfterSeconds } = await checkRateLimit(ip, "chat");
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many messages. Please wait a few minutes and try again." },
        { status: 429, headers: retryAfterSeconds ? { "Retry-After": String(retryAfterSeconds) } : undefined }
      );
    }
  } catch (error) {
    console.error("Chat rate limit check failed, proceeding without it:", error);
  }

  try {
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 512,
      system: buildChatSystemPrompt(),
      messages: cleanMessages,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const reply = textBlock && "text" in textBlock ? textBlock.text : "";

    if (!reply) {
      return NextResponse.json(
        { error: "Didn't get a usable response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Anthropic API request failed:", error);
    return NextResponse.json(
      { error: "Something went wrong reaching the assistant. Please try again shortly." },
      { status: 502 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { chatRateLimiter } from "@/lib/ai/rate-limit";
import { resolveGroundedQuery } from "@/lib/ai/knowledge-retrieval";
import { callGeminiAssistant } from "@/lib/ai/adapter";

const ChatRequestSchema = z.object({
  message: z.string().trim().min(1, "Message cannot be empty").max(500, "Message exceeds 500 characters"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(1000),
      })
    )
    .max(10)
    .optional(),
});

export async function POST(req: NextRequest) {
  // Content-Type validation
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { error: "Invalid Content-Type. Expected application/json." },
      { status: 415 }
    );
  }

  // Client IP extraction for rate limiting
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

  // Rate Limiting Enforcement
  const rateLimitCheck = chatRateLimiter.check(ip);
  if (!rateLimitCheck.success) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded. Too many JARVIS queries from this terminal.",
        resetMs: rateLimitCheck.resetMs,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rateLimitCheck.resetMs / 1000)),
        },
      }
    );
  }

  // Body Parsing and Schema Validation
  let bodyJson: unknown;
  try {
    bodyJson = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed JSON payload in request body." },
      { status: 400 }
    );
  }

  const parseResult = ChatRequestSchema.safeParse(bodyJson);
  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        details: parseResult.error.format(),
      },
      { status: 400 }
    );
  }

  const { message, history = [] } = parseResult.data;

  // 1. Try Gemini Provider if configured and eligible
  if (process.env.GEMINI_API_KEY) {
    const aiResult = await callGeminiAssistant(message, history);
    if (aiResult) {
      return NextResponse.json({
        response: aiResult.response,
        sources: aiResult.sources,
        action: aiResult.action,
        provider: "gemini",
      });
    }
  }

  // 2. Deterministic Local Knowledge Engine Fallback
  const localResult = resolveGroundedQuery(message);

  return NextResponse.json({
    response: localResult.response,
    sources: localResult.sources,
    action: localResult.action,
    provider: "grounded-local",
  });
}

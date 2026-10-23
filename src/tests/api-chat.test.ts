import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/chat/route";
import { chatRateLimiter } from "@/lib/ai/rate-limit";

describe("Phase 4: /api/chat Route Handler Integration", () => {
  beforeEach(() => {
    chatRateLimiter.reset();
  });

  it("returns grounded responses for valid JSON payload", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "192.168.1.10" },
      body: JSON.stringify({ message: "What has Sahil built with LLMs?" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.response).toBeDefined();
    expect(data.sources).toBeDefined();
    expect(data.provider).toBeDefined();
  });

  it("rejects non-JSON Content-Type with 415 Unsupported Media Type", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "plain text message",
    });

    const res = await POST(req);
    expect(res.status).toBe(415);
  });

  it("rejects empty message with 400 Bad Request", async () => {
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "   " }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("rejects messages exceeding 500 characters with 400 Bad Request", async () => {
    const oversized = "A".repeat(501);
    const req = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: oversized }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("enforces rate limits and returns 429 when threshold exceeded", async () => {
    const ip = "10.0.0.99";

    // Exhaust the 20 requests limit
    for (let i = 0; i < 20; i++) {
      const req = new NextRequest("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
        body: JSON.stringify({ message: "Ping" }),
      });
      await POST(req);
    }

    // 21st request should be rejected
    const blockedReq = new NextRequest("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify({ message: "Ping" }),
    });

    const res = await POST(blockedReq);
    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeDefined();
  });
});

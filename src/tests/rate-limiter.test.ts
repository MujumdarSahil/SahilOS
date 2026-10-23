import { describe, it, expect, beforeEach } from "vitest";
import { SlidingWindowRateLimiter } from "@/lib/ai/rate-limit";

describe("Phase 4: Sliding Window Rate Limiter", () => {
  let limiter: SlidingWindowRateLimiter;

  beforeEach(() => {
    limiter = new SlidingWindowRateLimiter(5, 1000); // 5 requests per 1000ms
  });

  it("permits initial requests below threshold", () => {
    const res = limiter.check("test-client");
    expect(res.success).toBe(true);
    expect(res.remaining).toBe(4);
  });

  it("blocks requests once the threshold is exceeded", () => {
    for (let i = 0; i < 5; i++) {
      limiter.check("test-client-2");
    }
    const sixth = limiter.check("test-client-2");
    expect(sixth.success).toBe(false);
    expect(sixth.remaining).toBe(0);
    expect(sixth.resetMs).toBeGreaterThan(0);
  });

  it("tracks rate limits separately across distinct IP/client keys", () => {
    for (let i = 0; i < 5; i++) {
      limiter.check("ip-alpha");
    }
    expect(limiter.check("ip-alpha").success).toBe(false);
    expect(limiter.check("ip-beta").success).toBe(true);
  });
});

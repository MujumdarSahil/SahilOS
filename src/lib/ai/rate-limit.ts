interface RateLimitEntry {
  timestamps: number[];
}

export class SlidingWindowRateLimiter {
  private cache: Map<string, RateLimitEntry> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 20, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Periodic sweep every 5 minutes to prevent memory leak
    if (typeof setInterval !== "undefined") {
      setInterval(() => this.cleanup(), 300000).unref?.();
    }
  }

  public check(identifier: string): { success: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    const entry = this.cache.get(identifier) || { timestamps: [] };

    // Filter out timestamps outside current sliding window
    const validTimestamps = entry.timestamps.filter((t) => now - t < this.windowMs);

    if (validTimestamps.length >= this.maxRequests) {
      const oldest = validTimestamps[0];
      const resetMs = oldest ? this.windowMs - (now - oldest) : this.windowMs;
      return { success: false, remaining: 0, resetMs: Math.max(0, resetMs) };
    }

    validTimestamps.push(now);
    this.cache.set(identifier, { timestamps: validTimestamps });

    return {
      success: true,
      remaining: this.maxRequests - validTimestamps.length,
      resetMs: this.windowMs,
    };
  }

  public cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      const valid = entry.timestamps.filter((t) => now - t < this.windowMs);
      if (valid.length === 0) {
        this.cache.delete(key);
      } else {
        this.cache.set(key, { timestamps: valid });
      }
    }
  }

  public reset(): void {
    this.cache.clear();
  }
}

// Global shared singleton for the route handler
export const chatRateLimiter = new SlidingWindowRateLimiter(20, 60000);

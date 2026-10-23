import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  BrowserSpeechRecognizer,
  isSpeechRecognitionSupported,
} from "@/lib/speech/recognition";

describe("Phase 5: Speech Recognition Lifecycle & Fallbacks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("handles environments without speech recognition gracefully", () => {
    delete (window as any).SpeechRecognition;
    delete (window as any).webkitSpeechRecognition;

    const onStatusChange = vi.fn();
    const recognizer = new BrowserSpeechRecognizer({
      onTranscript: vi.fn(),
      onStatusChange,
    });

    expect(isSpeechRecognitionSupported()).toBe(false);
    expect(recognizer.getStatus()).toBe("UNSUPPORTED");
    expect(onStatusChange).toHaveBeenCalledWith("UNSUPPORTED");
  });

  it("handles mic permission denial gracefully without crashing", () => {
    let errorHandler: ((e: any) => void) | null = null;
    const startMock = vi.fn();
    const stopMock = vi.fn();

    // Mock speech recognition
    (window as any).SpeechRecognition = vi.fn().mockImplementation(() => ({
      start: startMock,
      stop: stopMock,
      set onerror(fn: any) {
        errorHandler = fn;
      },
    }));

    const onStatusChange = vi.fn();
    const onError = vi.fn();

    const recognizer = new BrowserSpeechRecognizer({
      onTranscript: vi.fn(),
      onStatusChange,
      onError,
    });

    // Simulate browser permission denied event
    if (errorHandler) {
      (errorHandler as any)({ error: "not-allowed" });
    }

    expect(recognizer.getStatus()).toBe("PERMISSION_DENIED");
    expect(onStatusChange).toHaveBeenCalledWith("PERMISSION_DENIED");
    expect(onError).toHaveBeenCalledWith(expect.stringContaining("Microphone permission denied"));
  });

  it("delivers transcript when speech recognition completes", () => {
    let resultHandler: ((e: any) => void) | null = null;

    (window as any).SpeechRecognition = vi.fn().mockImplementation(() => ({
      start: vi.fn(),
      stop: vi.fn(),
      set onresult(fn: any) {
        resultHandler = fn;
      },
    }));

    const onTranscript = vi.fn();
    const onStatusChange = vi.fn();

    new BrowserSpeechRecognizer({
      onTranscript,
      onStatusChange,
    });

    // Simulate speech recognition result
    if (resultHandler) {
      (resultHandler as any)({
        results: [[{ transcript: "Show me MedAgentX" }]],
      });
    }

    expect(onTranscript).toHaveBeenCalledWith("Show me MedAgentX");
  });
});

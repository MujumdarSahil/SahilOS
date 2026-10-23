import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  cleanTextForSpeech,
  BrowserSpeechSynthesizer,
  isSpeechSynthesisSupported,
} from "@/lib/speech/synthesis";

describe("Phase 5: Speech Synthesis & Text Scrubbing", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("cleanTextForSpeech cleans markdown, URLs, brackets, and special characters", () => {
    const raw = "• Visit [Portfolio](https://example.com/demo) for **details**! {action: test} — Latency: <50ms";
    const cleaned = cleanTextForSpeech(raw);

    expect(cleaned).not.toContain("https://");
    expect(cleaned).not.toContain("[Portfolio]");
    expect(cleaned).toContain("Portfolio");
    expect(cleaned).toContain("details");
    expect(cleaned).not.toContain("{action: test}");
    expect(cleaned).not.toContain("•");
  });

  it("BrowserSpeechSynthesizer starts muted by default for zero surprise audio", () => {
    const synthesizer = new BrowserSpeechSynthesizer();
    expect(synthesizer.getMuted()).toBe(true);
  });

  it("BrowserSpeechSynthesizer toggles mute status correctly", () => {
    const synthesizer = new BrowserSpeechSynthesizer();
    synthesizer.setMuted(false);
    expect(synthesizer.getMuted()).toBe(false);

    synthesizer.setMuted(true);
    expect(synthesizer.getMuted()).toBe(true);
  });

  it("does not speak if muted", () => {
    const cancelMock = vi.fn();
    const speakMock = vi.fn();
    (window as any).speechSynthesis = { cancel: cancelMock, speak: speakMock };
    (window as any).SpeechSynthesisUtterance = vi.fn();

    const synthesizer = new BrowserSpeechSynthesizer(true);
    synthesizer.speak("Hello Jarvis");

    expect(speakMock).not.toHaveBeenCalled();
  });

  it("calls window.speechSynthesis.speak when unmuted", () => {
    const cancelMock = vi.fn();
    const speakMock = vi.fn();
    (window as any).speechSynthesis = { cancel: cancelMock, speak: speakMock };
    (window as any).SpeechSynthesisUtterance = vi.fn().mockImplementation((text) => ({
      text,
      lang: "en-US",
    }));

    const synthesizer = new BrowserSpeechSynthesizer(false);
    synthesizer.speak("Operational status normal.");

    expect(cancelMock).toHaveBeenCalled();
    expect(speakMock).toHaveBeenCalled();
  });
});

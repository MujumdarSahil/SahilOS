import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { JarvisVoiceControls } from "@/components/jarvis/JarvisVoiceControls";

describe("Phase 5: JarvisVoiceControls Component", () => {
  const onTranscriptReceived = vi.fn();
  const onStopSpeaking = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders voice query button and audio mute button", () => {
    (window as any).speechSynthesis = { cancel: vi.fn(), speak: vi.fn() };
    (window as any).SpeechSynthesisUtterance = vi.fn();

    render(
      <JarvisVoiceControls
        onTranscriptReceived={onTranscriptReceived}
        isSpeaking={false}
        onStopSpeaking={onStopSpeaking}
      />
    );

    expect(screen.getByRole("button", { name: /activate voice input/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /unmute spoken responses/i })).toBeInTheDocument();
  });

  it("toggles mute state when mute button is clicked", () => {
    (window as any).speechSynthesis = { cancel: vi.fn(), speak: vi.fn() };
    (window as any).SpeechSynthesisUtterance = vi.fn();

    render(
      <JarvisVoiceControls
        onTranscriptReceived={onTranscriptReceived}
        isSpeaking={false}
        onStopSpeaking={onStopSpeaking}
      />
    );

    const muteBtn = screen.getByRole("button", { name: /unmute spoken responses/i });
    fireEvent.click(muteBtn);

    expect(screen.getByRole("button", { name: /mute spoken responses/i })).toBeInTheDocument();
  });

  it("shows stop button when isSpeaking is true", () => {
    (window as any).speechSynthesis = { cancel: vi.fn(), speak: vi.fn() };
    (window as any).SpeechSynthesisUtterance = vi.fn();

    render(
      <JarvisVoiceControls
        onTranscriptReceived={onTranscriptReceived}
        isSpeaking={true}
        onStopSpeaking={onStopSpeaking}
      />
    );

    const stopBtn = screen.getByRole("button", { name: /stop audio speech playback/i });
    expect(stopBtn).toBeInTheDocument();

    fireEvent.click(stopBtn);
    expect(onStopSpeaking).toHaveBeenCalled();
  });
});

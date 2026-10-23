export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function cleanTextForSpeech(text: string): string {
  return text
    // Remove Markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // Remove URLs
    .replace(/https?:\/\/\S+/g, "")
    // Remove bullets and symbols
    .replace(/[•*#>`_~-]/g, " ")
    // Remove JSON or directive brackets
    .replace(/\{[^}]+\}/g, "")
    // Collapse excess whitespace
    .replace(/\s+/g, " ")
    .trim();
}

export class BrowserSpeechSynthesizer {
  private isMuted: boolean = true; // Off by default as required by spec!
  private isSpeakingState: boolean = false;

  constructor(defaultMuted: boolean = true) {
    this.isMuted = defaultMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public isSpeaking(): boolean {
    return this.isSpeakingState;
  }

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    if (this.isMuted || !isSpeechSynthesisSupported()) {
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const cleaned = cleanTextForSpeech(text);
      if (!cleaned) return;

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.lang = "en-US";
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.isSpeakingState = true;
        onStart?.();
      };

      utterance.onend = () => {
        this.isSpeakingState = false;
        onEnd?.();
      };

      utterance.onerror = (e) => {
        this.isSpeakingState = false;
        onError?.(e);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      this.isSpeakingState = false;
      onError?.(e);
    }
  }

  public stop(): void {
    if (isSpeechSynthesisSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
    this.isSpeakingState = false;
  }
}

// Global shared singleton
export const jarvisVoiceSynthesizer = new BrowserSpeechSynthesizer(true);

export type SpeechRecognitionStatus =
  | "IDLE"
  | "LISTENING"
  | "PROCESSING"
  | "PERMISSION_DENIED"
  | "UNSUPPORTED"
  | "ERROR";

export interface SpeechRecognitionCallbacks {
  onTranscript: (transcript: string) => void;
  onStatusChange: (status: SpeechRecognitionStatus) => void;
  onError?: (error: string) => void;
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(
    (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition
  );
}

export class BrowserSpeechRecognizer {
  private recognition: any = null;
  private status: SpeechRecognitionStatus = "IDLE";
  private callbacks: SpeechRecognitionCallbacks;

  constructor(callbacks: SpeechRecognitionCallbacks) {
    this.callbacks = callbacks;
    this.init();
  }

  private init() {
    if (!isSpeechRecognitionSupported()) {
      this.status = "UNSUPPORTED";
      this.callbacks.onStatusChange("UNSUPPORTED");
      return;
    }

    try {
      const SpeechRecognitionConstructor =
        (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

      this.recognition = new SpeechRecognitionConstructor();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";

      this.recognition.onstart = () => {
        this.status = "LISTENING";
        this.callbacks.onStatusChange("LISTENING");
      };

      this.recognition.onresult = (event: any) => {
        this.status = "PROCESSING";
        this.callbacks.onStatusChange("PROCESSING");

        const transcript = event.results?.[0]?.[0]?.transcript || "";
        if (transcript.trim()) {
          this.callbacks.onTranscript(transcript.trim());
        }
      };

      this.recognition.onerror = (event: any) => {
        const errorType = event.error;
        if (errorType === "not-allowed" || errorType === "service-not-allowed") {
          this.status = "PERMISSION_DENIED";
          this.callbacks.onStatusChange("PERMISSION_DENIED");
          this.callbacks.onError?.("Microphone permission denied. Text input mode remains fully active.");
        } else if (errorType === "no-speech") {
          this.status = "IDLE";
          this.callbacks.onStatusChange("IDLE");
        } else {
          this.status = "ERROR";
          this.callbacks.onStatusChange("ERROR");
          this.callbacks.onError?.(`Speech input error: ${errorType}`);
        }
      };

      this.recognition.onend = () => {
        if (this.status === "LISTENING" || this.status === "PROCESSING") {
          this.status = "IDLE";
          this.callbacks.onStatusChange("IDLE");
        }
      };
    } catch (e) {
      this.status = "UNSUPPORTED";
      this.callbacks.onStatusChange("UNSUPPORTED");
    }
  }

  public start(): void {
    if (!this.recognition) {
      this.callbacks.onStatusChange("UNSUPPORTED");
      return;
    }

    try {
      this.recognition.start();
    } catch (e) {
      // If already started, safely stop and restart
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
    }
  }

  public stop(): void {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
      this.status = "IDLE";
      this.callbacks.onStatusChange("IDLE");
    }
  }

  public abort(): void {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // Ignore
      }
      this.status = "IDLE";
      this.callbacks.onStatusChange("IDLE");
    }
  }

  public getStatus(): SpeechRecognitionStatus {
    return this.status;
  }
}

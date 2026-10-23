"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, Shield, Square, Radio } from "lucide-react";
import {
  BrowserSpeechRecognizer,
  SpeechRecognitionStatus,
  isSpeechRecognitionSupported,
} from "@/lib/speech/recognition";
import {
  jarvisVoiceSynthesizer,
  isSpeechSynthesisSupported,
} from "@/lib/speech/synthesis";

interface JarvisVoiceControlsProps {
  onTranscriptReceived: (transcript: string) => void;
  isSpeaking: boolean;
  onStopSpeaking: () => void;
  disabled?: boolean;
}

export const JarvisVoiceControls: React.FC<JarvisVoiceControlsProps> = ({
  onTranscriptReceived,
  isSpeaking,
  onStopSpeaking,
  disabled = false,
}) => {
  const [recognitionStatus, setRecognitionStatus] = useState<SpeechRecognitionStatus>("IDLE");
  const [voiceMuted, setVoiceMuted] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognizerRef = useRef<BrowserSpeechRecognizer | null>(null);

  useEffect(() => {
    // Check speech recognition capability
    if (isSpeechRecognitionSupported()) {
      recognizerRef.current = new BrowserSpeechRecognizer({
        onTranscript: (transcript) => {
          setRecognitionStatus("PROCESSING");
          onTranscriptReceived(transcript);
        },
        onStatusChange: (status) => {
          setRecognitionStatus(status);
          if (status === "IDLE" || status === "LISTENING") {
            setErrorMessage(null);
          }
        },
        onError: (err) => {
          setErrorMessage(err);
        },
      });
    } else {
      setRecognitionStatus("UNSUPPORTED");
    }

    // Initialize voice synthesizer state
    setVoiceMuted(jarvisVoiceSynthesizer.getMuted());

    return () => {
      recognizerRef.current?.abort();
      jarvisVoiceSynthesizer.stop();
    };
  }, [onTranscriptReceived]);

  const toggleListening = () => {
    if (disabled || !recognizerRef.current) return;

    if (recognitionStatus === "LISTENING") {
      recognizerRef.current.stop();
    } else {
      setErrorMessage(null);
      // Cancel speech synthesis if speaking when user starts talking
      jarvisVoiceSynthesizer.stop();
      onStopSpeaking();
      recognizerRef.current.start();
    }
  };

  const toggleMute = () => {
    const nextState = !voiceMuted;
    setVoiceMuted(nextState);
    jarvisVoiceSynthesizer.setMuted(nextState);
    if (nextState) {
      onStopSpeaking();
    }
  };

  const isRecognitionSupported = isSpeechRecognitionSupported();
  const isSynthesisSupported = isSpeechSynthesisSupported();

  return (
    <div className="border-t border-cyan/15 bg-obsidian-card p-2.5 space-y-2">
      <div className="flex items-center justify-between gap-2">
        {/* Microphone Voice Input Button */}
        <button
          onClick={toggleListening}
          disabled={disabled || !isRecognitionSupported || recognitionStatus === "PERMISSION_DENIED"}
          aria-label={
            recognitionStatus === "LISTENING"
              ? "Stop listening to voice input"
              : "Activate voice input"
          }
          className={`flex-1 flex items-center justify-center space-x-2 rounded py-1.5 px-3 font-mono text-xs transition border ${
            recognitionStatus === "LISTENING"
              ? "bg-amber/25 border-amber text-amber animate-pulse shadow-hud-amber"
              : recognitionStatus === "PERMISSION_DENIED"
              ? "bg-gunmetal-surface border-cyan/15 text-ice-muted cursor-not-allowed opacity-60"
              : !isRecognitionSupported
              ? "bg-gunmetal-surface border-cyan/15 text-ice-muted opacity-50 cursor-not-allowed"
              : "bg-gunmetal border-cyan/30 text-cyan hover:bg-cyan/15 hover:border-cyan"
          }`}
        >
          {recognitionStatus === "LISTENING" ? (
            <>
              <Radio className="h-3.5 w-3.5 text-amber animate-spin" />
              <span className="font-bold">LISTENING... [CLICK TO STOP]</span>
            </>
          ) : recognitionStatus === "PERMISSION_DENIED" ? (
            <>
              <MicOff className="h-3.5 w-3.5 text-amber" />
              <span>MIC ACCESS DENIED</span>
            </>
          ) : !isRecognitionSupported ? (
            <>
              <MicOff className="h-3.5 w-3.5" />
              <span>VOICE UNSUPPORTED</span>
            </>
          ) : (
            <>
              <Mic className="h-3.5 w-3.5" />
              <span>VOICE QUERY</span>
            </>
          )}
        </button>

        {/* Voice Audio Output Toggle */}
        {isSynthesisSupported && (
          <button
            onClick={toggleMute}
            aria-label={voiceMuted ? "Unmute spoken responses" : "Mute spoken responses"}
            title={voiceMuted ? "Enable Spoken Responses" : "Mute Spoken Responses"}
            className={`flex items-center space-x-1 rounded px-2.5 py-1.5 font-mono text-xs border transition ${
              voiceMuted
                ? "bg-gunmetal border-cyan/20 text-ice-muted hover:text-ice"
                : "bg-cyan/20 border-cyan text-cyan shadow-hud-cyan"
            }`}
          >
            {voiceMuted ? (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span className="hidden sm:inline text-[10px]">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5 animate-pulse" />
                <span className="hidden sm:inline text-[10px]">VOICE ON</span>
              </>
            )}
          </button>
        )}

        {/* Stop Speaking Button (visible when actively speaking) */}
        {isSpeaking && (
          <button
            onClick={() => {
              jarvisVoiceSynthesizer.stop();
              onStopSpeaking();
            }}
            aria-label="Stop audio speech playback"
            className="flex items-center space-x-1 rounded border border-amber/40 bg-amber/20 px-2 py-1.5 font-mono text-xs text-amber hover:bg-amber/30 transition"
          >
            <Square className="h-3 w-3 fill-amber" />
            <span className="text-[10px]">STOP</span>
          </button>
        )}
      </div>

      {/* Error or Privacy Status Banner */}
      {errorMessage ? (
        <div className="font-mono text-[9px] text-amber flex items-center space-x-1 px-1">
          <span>⚠ {errorMessage}</span>
        </div>
      ) : (
        <div className="flex items-center justify-between text-[9px] font-mono text-ice-muted/60 px-1 select-none">
          <span className="flex items-center space-x-1">
            <Shield className="h-2.5 w-2.5 text-stark-green" />
            <span>EPHEMERAL VOICE STREAM // NEVER RECORDED</span>
          </span>
          <span>STARK AUDIO v2</span>
        </div>
      )}
    </div>
  );
};

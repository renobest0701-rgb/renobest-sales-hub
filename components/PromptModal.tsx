"use client";

import { useState } from "react";

type Props = {
  agentName: string;
  prompt: string;
  agentUrl: string;
  onClose: () => void;
};

export default function PromptModal({ agentName, prompt, agentUrl, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = prompt;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #E8E8E4",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontSize: "11px", color: "#C9A84C", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "2px" }}>
              GENERATED PROMPT
            </p>
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#1A1A1A" }}>{agentName}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "1px solid #E0E0DC",
              background: "transparent",
              cursor: "pointer",
              fontSize: "16px",
              color: "#888",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Prompt text */}
        <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
          <pre
            style={{
              background: "#F9F9F6",
              border: "1px solid #E8E8E4",
              borderRadius: "8px",
              padding: "16px",
              fontSize: "13px",
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              color: "#2A2A2A",
              fontFamily: "inherit",
              margin: 0,
            }}
          >
            {prompt}
          </pre>
        </div>

        {/* Actions */}
        <div
          style={{
            padding: "16px 24px 20px",
            borderTop: "1px solid #E8E8E4",
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              flex: 1,
              minWidth: "160px",
              height: "44px",
              borderRadius: "8px",
              border: "none",
              background: copied ? "#4CAF50" : "linear-gradient(135deg, #9B7B2E 0%, #C9A84C 50%, #E8D08A 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
              letterSpacing: "0.05em",
            }}
          >
            {copied ? "✓ コピーしました" : "プロンプトをコピー"}
          </button>

          {agentUrl ? (
            <a
              href={agentUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                minWidth: "160px",
                height: "44px",
                borderRadius: "8px",
                border: "2px solid #C9A84C",
                background: "transparent",
                color: "#C9A84C",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                letterSpacing: "0.05em",
              }}
            >
              AIを開く →
            </a>
          ) : (
            <button
              disabled
              style={{
                flex: 1,
                minWidth: "160px",
                height: "44px",
                borderRadius: "8px",
                border: "2px solid #DCDCD8",
                background: "transparent",
                color: "#AAAAAA",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "not-allowed",
              }}
            >
              URL未設定
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

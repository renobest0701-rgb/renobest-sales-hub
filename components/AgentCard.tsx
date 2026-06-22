"use client";

import { Agent } from "@/lib/agents";

type Props = {
  agent: Agent;
  onGenerate: (agentId: string) => void;
};

export default function AgentCard({ agent, onGenerate }: Props) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        border: "1px solid #F0EEE8",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.18)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.07)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Agent name */}
      <div>
        <p
          style={{
            fontSize: "10px",
            color: "#C9A84C",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          AI AGENT
        </p>
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3 }}>
          {agent.name}
        </h3>
      </div>

      {/* Description */}
      <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, flex: 1 }}>
        {agent.description}
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={() => onGenerate(agent.id)}
          style={{
            height: "40px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #9B7B2E 0%, #C9A84C 50%, #E8D08A 100%)",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            letterSpacing: "0.03em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          このAI用プロンプトを生成
        </button>

        {agent.url ? (
          <a
            href={agent.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: "40px",
              borderRadius: "8px",
              border: "2px solid #C9A84C",
              background: "transparent",
              color: "#C9A84C",
              fontWeight: 700,
              fontSize: "13px",
              cursor: "pointer",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              letterSpacing: "0.03em",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            AIを開く →
          </a>
        ) : (
          <div
            style={{
              height: "40px",
              borderRadius: "8px",
              border: "2px solid #DCDCD8",
              background: "transparent",
              color: "#BBBBBB",
              fontWeight: 600,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            URL未設定
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { memo } from "react";
import { Agent } from "@/lib/agents";

type Props = {
  agent: Agent;
  onGenerate: (agentId: string) => void;
};

function AgentCard({ agent, onGenerate }: Props) {
  return (
    <div className="agent-card">
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

      <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, flex: 1 }}>
        {agent.description}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={() => onGenerate(agent.id)}
          className="btn-gold"
          style={{ height: "40px", borderRadius: "8px", fontSize: "13px" }}
        >
          このAI用プロンプトを生成
        </button>

        {agent.url ? (
          <a
            href={agent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold"
            style={{ height: "40px", borderRadius: "8px", fontSize: "13px", gap: "4px" }}
          >
            AIを開く →
          </a>
        ) : (
          <div
            className="btn-disabled"
            style={{ height: "40px", borderRadius: "8px" }}
          >
            URL未設定
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(AgentCard);

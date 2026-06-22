"use client";

import { useState, useCallback } from "react";
import CustomerForm from "@/components/CustomerForm";
import AgentCard from "@/components/AgentCard";
import PromptModal from "@/components/PromptModal";
import LoginScreen, { isAuthenticated, logout } from "@/components/LoginScreen";
import { CustomerForm as CustomerFormType, agents, generatePrompt } from "@/lib/agents";

const STORAGE_KEY = "renobest-sales-hub-form";

const defaultForm: CustomerFormType = {
  customerName: "",
  customerType: "",
  propertyName: "",
  location: "",
  purpose: "",
  budget: "",
  interestPoints: "",
  concerns: "",
  sentContent: "",
  customerResponse: "",
  lastContactDate: "",
  nextAction: "",
  notes: "",
};

type ModalState = {
  agentId: string;
  agentName: string;
  prompt: string;
  agentUrl: string;
} | null;

function loadSavedForm(): CustomerFormType {
  if (typeof window === "undefined") return defaultForm;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultForm, ...JSON.parse(saved) };
  } catch {}
  return defaultForm;
}

export default function Home() {
  const [authed, setAuthed] = useState<boolean>(isAuthenticated);
  const [form, setForm] = useState<CustomerFormType>(loadSavedForm);
  const [modal, setModal] = useState<ModalState>(null);

  // Hooks must all be declared before any early return
  const handleChange = useCallback((field: keyof CustomerFormType, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const handleGenerate = useCallback(
    (agentId: string) => {
      const agent = agents.find((a) => a.id === agentId);
      if (!agent) return;
      setModal({
        agentId,
        agentName: agent.name,
        prompt: generatePrompt(agentId, form),
        agentUrl: agent.url,
      });
    },
    [form]
  );

  const handleReset = () => {
    if (!confirm("入力内容をすべてリセットしますか？")) return;
    setForm(defaultForm);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const handleLogout = () => {
    logout();
    setAuthed(false);
  };

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F0" }}>
      {/* Header */}
      <header
        style={{
          background: "#0A0A0A",
          borderBottom: "3px solid #C9A84C",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "6px",
              height: "32px",
              background: "linear-gradient(135deg, #9B7B2E 0%, #C9A84C 50%, #E8D08A 100%)",
              borderRadius: "3px",
            }}
          />
          <div>
            <p
              style={{
                fontSize: "10px",
                color: "#C9A84C",
                fontWeight: 600,
                letterSpacing: "0.15em",
                lineHeight: 1,
                marginBottom: "2px",
              }}
            >
              RENOBEST
            </p>
            <h1
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              営業支援Hub
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 400,
                  color: "#888",
                  marginLeft: "8px",
                  letterSpacing: "0.02em",
                }}
              >
                v1
              </span>
            </h1>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleReset}
            style={{
              height: "32px",
              padding: "0 14px",
              borderRadius: "6px",
              border: "1px solid #444",
              background: "transparent",
              color: "#888",
              fontSize: "12px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#888";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#444";
            }}
          >
            入力リセット
          </button>
          <button
            onClick={handleLogout}
            style={{
              height: "32px",
              padding: "0 14px",
              borderRadius: "6px",
              border: "1px solid #9B7B2E",
              background: "transparent",
              color: "#C9A84C",
              fontSize: "12px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
          >
            ログアウト
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        {/* 顧客・物件情報フォーム */}
        <CustomerForm form={form} onChange={handleChange} />

        {/* エージェント選択 */}
        <section>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#1A1A1A",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#C9A84C" }}>▍</span>
            AIエージェントを選ぶ
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} onGenerate={handleGenerate} />
            ))}
          </div>
        </section>

        {/* Footer note */}
        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "#AAAAAA",
            marginTop: "48px",
            letterSpacing: "0.05em",
          }}
        >
          入力内容はブラウザに自動保存されます。機密情報の取り扱いにご注意ください。
        </p>
      </main>

      {/* プロンプトモーダル */}
      {modal && (
        <PromptModal
          agentName={modal.agentName}
          prompt={modal.prompt}
          agentUrl={modal.agentUrl}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

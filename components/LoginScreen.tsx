"use client";

import { useState } from "react";

const SESSION_KEY = "renobest-hub-auth";
const FALLBACK_PASSWORD = "renobest2026";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function logout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

type Props = {
  onSuccess: () => void;
};

export default function LoginScreen({ onSuccess }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_HUB_PASSWORD || FALLBACK_PASSWORD;

    if (password === correct) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onSuccess();
    } else {
      setError(true);
      setShaking(true);
      setPassword("");
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div
          style={{
            display: "inline-block",
            width: "48px",
            height: "4px",
            background: "linear-gradient(135deg, #9B7B2E 0%, #C9A84C 50%, #E8D08A 100%)",
            borderRadius: "2px",
            marginBottom: "16px",
          }}
        />
        <p
          style={{
            fontSize: "11px",
            color: "#C9A84C",
            fontWeight: 600,
            letterSpacing: "0.2em",
            marginBottom: "8px",
          }}
        >
          RENOBEST
        </p>
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.06em" }}>
          営業支援Hub
        </h1>
        <p style={{ fontSize: "12px", color: "#666", marginTop: "4px" }}>社内専用ツール</p>
      </div>

      <div
        className={shaking ? "shake" : ""}
        style={{
          background: "#141414",
          border: "1px solid #2A2A2A",
          borderRadius: "16px",
          padding: "40px 36px",
          width: "100%",
          maxWidth: "360px",
        }}
      >
        <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginBottom: "28px" }}>
          パスワードを入力してください
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="パスワード"
            autoFocus
            className={`login-input${error ? " error" : ""}`}
          />

          {error && (
            <p style={{ fontSize: "12px", color: "#E05555", textAlign: "center", margin: "-4px 0" }}>
              パスワードが違います
            </p>
          )}

          <button
            type="submit"
            className="btn-gold"
            style={{ height: "48px", borderRadius: "8px", fontSize: "14px", letterSpacing: "0.05em" }}
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}

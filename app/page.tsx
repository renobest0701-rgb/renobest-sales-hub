"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import CustomerForm from "@/components/CustomerForm";
import AgentCard from "@/components/AgentCard";
import PromptModal from "@/components/PromptModal";
import LoginScreen, { isAuthenticated, logout } from "@/components/LoginScreen";
import CustomerSelector from "@/components/CustomerSelector";
import TodoPanel from "@/components/TodoPanel";
import { agents, generatePrompt } from "@/lib/agents";
import {
  CustomerRecord,
  loadRecords,
  saveRecords,
  loadActiveId,
  saveActiveId,
  createRecord,
  updateRecord,
  deleteRecord,
  addTodo,
  toggleTodo,
  deleteTodo,
} from "@/lib/storage";

type ModalState = {
  agentId: string;
  agentName: string;
  prompt: string;
  agentUrl: string;
} | null;

// 初期状態を1回のlocalStorage読み込みで取得
function initState(): { records: CustomerRecord[]; activeId: string } {
  const records = loadRecords();
  const activeId = loadActiveId(records);
  return { records, activeId };
}

// localStorage書き込みをデバウンス（300ms）
let saveTimer: ReturnType<typeof setTimeout> | null = null;
function debouncedSave(records: CustomerRecord[]) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveRecords(records), 300);
}

export default function Home() {
  const [authed, setAuthed] = useState<boolean>(isAuthenticated);
  const [{ records: initRec, activeId: initActiveId }] = useState<{ records: CustomerRecord[]; activeId: string }>(initState);
  const [records, setRecords] = useState<CustomerRecord[]>(initRec);
  const [activeId, setActiveId] = useState<string>(initActiveId);
  const [modal, setModal] = useState<ModalState>(null);

  // activeのrefを持つことでhandleGenerateを安定させる
  const activeRef = useRef<CustomerRecord | undefined>(undefined);
  const active = useMemo(
    () => records.find((r) => r.id === activeId) ?? records[0],
    [records, activeId]
  );
  // refをレンダー後に更新（render中の直接代入を避ける）
  useEffect(() => {
    activeRef.current = active;
  });

  // レコード更新 + デバウンス保存
  const patchActive = useCallback(
    (patch: Partial<Omit<CustomerRecord, "id">>) => {
      setRecords((prev) => {
        const next = updateRecord(prev, activeId, patch);
        debouncedSave(next);
        return next;
      });
    },
    [activeId]
  );

  // フォーム変更
  const handleChange = useCallback(
    (field: keyof CustomerRecord["form"], value: string) => {
      if (!activeRef.current) return;
      patchActive({ form: { ...activeRef.current.form, [field]: value } });
    },
    [patchActive]
  );

  // プロンプト生成（refを使うことでagents再レンダリングを防ぐ）
  const handleGenerate = useCallback((agentId: string) => {
    const agent = agents.find((a) => a.id === agentId);
    if (!agent || !activeRef.current) return;
    setModal({
      agentId,
      agentName: agent.name,
      prompt: generatePrompt(agentId, activeRef.current.form),
      agentUrl: agent.url,
    });
  }, []); // 依存なし → AgentCardが再レンダリングされない

  // 顧客切り替え
  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    saveActiveId(id);
  }, []);

  // 新規顧客作成
  const handleCreate = useCallback(() => {
    const rec = createRecord();
    setRecords((prev) => {
      const next = [...prev, rec];
      saveRecords(next);
      return next;
    });
    setActiveId(rec.id);
    saveActiveId(rec.id);
  }, []);

  // 顧客削除
  const handleDelete = useCallback((id: string) => {
    setRecords((prev) => {
      const next = deleteRecord(prev, id);
      saveRecords(next);
      const newActive = next[0]?.id ?? "";
      setActiveId(newActive);
      saveActiveId(newActive);
      return next;
    });
  }, []);

  // ToDo操作
  const handleAddTodo = useCallback(
    (text: string) => {
      if (!activeRef.current) return;
      patchActive({ todos: addTodo(activeRef.current.todos, text) });
    },
    [patchActive]
  );

  const handleToggleTodo = useCallback(
    (todoId: string) => {
      if (!activeRef.current) return;
      patchActive({ todos: toggleTodo(activeRef.current.todos, todoId) });
    },
    [patchActive]
  );

  const handleDeleteTodo = useCallback(
    (todoId: string) => {
      if (!activeRef.current) return;
      patchActive({ todos: deleteTodo(activeRef.current.todos, todoId) });
    },
    [patchActive]
  );

  const handleLogout = () => {
    logout();
    setAuthed(false);
  };

  if (!authed) {
    return <LoginScreen onSuccess={() => setAuthed(true)} />;
  }

  if (!active) return null;

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
      </header>

      {/* Main */}
      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px" }}>
        <CustomerSelector
          records={records}
          activeId={activeId}
          onSelect={handleSelect}
          onCreate={handleCreate}
          onDelete={handleDelete}
        />

        <CustomerForm form={active.form} onChange={handleChange} />

        <TodoPanel
          todos={active.todos}
          onAdd={handleAddTodo}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />

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

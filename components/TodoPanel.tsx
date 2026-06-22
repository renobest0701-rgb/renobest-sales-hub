"use client";

import { useState } from "react";
import { TodoItem } from "@/lib/storage";

type Props = {
  todos: TodoItem[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoPanel({ todos, onAdd, onToggle, onDelete }: Props) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const text = input.trim();
    if (!text) return;
    onAdd(text);
    setInput("");
  };

  const pending = todos.filter((t) => !t.done);
  const done    = todos.filter((t) => t.done);

  return (
    <section
      style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        padding: "28px 32px",
        marginBottom: "32px",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#1A1A1A",
          marginBottom: "20px",
          paddingBottom: "12px",
          borderBottom: "2px solid #C9A84C",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ color: "#C9A84C" }}>▍</span>
        ToDoメモ
        {pending.length > 0 && (
          <span
            style={{
              marginLeft: "6px",
              background: "#C9A84C",
              color: "#FFFFFF",
              fontSize: "11px",
              fontWeight: 700,
              borderRadius: "10px",
              padding: "1px 8px",
            }}
          >
            {pending.length}
          </span>
        )}
      </h2>

      {/* 入力エリア */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder="ToDoを入力してEnterまたは追加ボタン"
          style={{
            flex: 1,
            height: "40px",
            borderRadius: "8px",
            border: "1px solid #E0E0DC",
            background: "#FAFAF8",
            padding: "0 14px",
            fontSize: "14px",
            color: "#1A1A1A",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            height: "40px",
            padding: "0 18px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #9B7B2E 0%, #C9A84C 50%, #E8D08A 100%)",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          追加
        </button>
      </div>

      {/* 未完了リスト */}
      {todos.length === 0 && (
        <p style={{ fontSize: "13px", color: "#BBBBBB", textAlign: "center", padding: "20px 0" }}>
          ToDoはまだありません
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {pending.map((todo) => (
          <TodoRow key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </div>

      {/* 完了済みリスト */}
      {done.length > 0 && (
        <div style={{ marginTop: "16px" }}>
          <p style={{ fontSize: "11px", color: "#BBBBBB", marginBottom: "8px", letterSpacing: "0.05em" }}>
            完了済み ({done.length})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {done.map((todo) => (
              <TodoRow key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function TodoRow({
  todo,
  onToggle,
  onDelete,
}: {
  todo: TodoItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "8px",
        background: todo.done ? "#FAFAF8" : "#FFFFFF",
        border: `1px solid ${todo.done ? "#EBEBEB" : "#E8E8E4"}`,
        transition: "all 0.15s",
      }}
    >
      {/* チェックボックス */}
      <button
        onClick={() => onToggle(todo.id)}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: `2px solid ${todo.done ? "#C9A84C" : "#CCCCCC"}`,
          background: todo.done ? "#C9A84C" : "transparent",
          cursor: "pointer",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.15s",
        }}
      >
        {todo.done && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* テキスト */}
      <span
        style={{
          flex: 1,
          fontSize: "14px",
          color: todo.done ? "#AAAAAA" : "#1A1A1A",
          textDecoration: todo.done ? "line-through" : "none",
          lineHeight: 1.4,
        }}
      >
        {todo.text}
      </span>

      {/* 削除 */}
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "4px",
          border: "none",
          background: "transparent",
          color: "#CCCCCC",
          fontSize: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
          flexShrink: 0,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#E05555")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#CCCCCC")}
      >
        ×
      </button>
    </div>
  );
}

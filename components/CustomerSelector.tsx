"use client";

import { memo } from "react";
import { CustomerRecord } from "@/lib/storage";

type Props = {
  records: CustomerRecord[];
  activeId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
};

function CustomerSelector({ records, activeId, onSelect, onCreate, onDelete }: Props) {
  const active = records.find((r) => r.id === activeId);

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        padding: "16px 24px",
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <span style={{ fontSize: "12px", fontWeight: 600, color: "#888", whiteSpace: "nowrap" }}>
        顧客選択
      </span>

      <select
        value={activeId}
        onChange={(e) => onSelect(e.target.value)}
        style={{
          flex: 1,
          minWidth: "160px",
          maxWidth: "320px",
          height: "36px",
          borderRadius: "8px",
          border: "1px solid #E0E0DC",
          background: "#FAFAF8",
          color: "#1A1A1A",
          fontSize: "14px",
          fontWeight: 600,
          padding: "0 12px",
          cursor: "pointer",
        }}
      >
        {records.map((r) => (
          <option key={r.id} value={r.id}>
            {r.form.customerName || "（名前未入力）"}
            {r.form.propertyName ? `　${r.form.propertyName}` : ""}
          </option>
        ))}
      </select>

      <button
        onClick={onCreate}
        className="btn-gold"
        style={{ height: "36px", padding: "0 16px", borderRadius: "8px", fontSize: "13px", whiteSpace: "nowrap" }}
      >
        ＋ 新規顧客
      </button>

      {records.length > 1 && active && (
        <button
          onClick={() => {
            const name = active.form.customerName || "この顧客";
            if (!confirm(`「${name}」を削除しますか？`)) return;
            onDelete(activeId);
          }}
          className="btn-delete"
          style={{ height: "36px", padding: "0 14px", borderRadius: "8px" }}
        >
          削除
        </button>
      )}

      <span style={{ fontSize: "11px", color: "#BBBBBB", marginLeft: "auto", whiteSpace: "nowrap" }}>
        {records.length} 件保存中
      </span>
    </div>
  );
}

export default memo(CustomerSelector);

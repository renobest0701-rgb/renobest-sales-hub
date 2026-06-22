"use client";

import { CustomerRecord } from "@/lib/storage";

type Props = {
  records: CustomerRecord[];
  activeId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
};

export default function CustomerSelector({ records, activeId, onSelect, onCreate, onDelete }: Props) {
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

      {/* ドロップダウン */}
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

      {/* 新規作成 */}
      <button
        onClick={onCreate}
        style={{
          height: "36px",
          padding: "0 16px",
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
        ＋ 新規顧客
      </button>

      {/* 削除（1件以上のときだけ表示） */}
      {records.length > 1 && active && (
        <button
          onClick={() => {
            const name = active.form.customerName || "この顧客";
            if (!confirm(`「${name}」を削除しますか？`)) return;
            onDelete(activeId);
          }}
          style={{
            height: "36px",
            padding: "0 14px",
            borderRadius: "8px",
            border: "1px solid #E0E0DC",
            background: "transparent",
            color: "#AAAAAA",
            fontSize: "13px",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#E05555";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E05555";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#AAAAAA";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E0E0DC";
          }}
        >
          削除
        </button>
      )}

      {/* レコード数バッジ */}
      <span style={{ fontSize: "11px", color: "#BBBBBB", marginLeft: "auto", whiteSpace: "nowrap" }}>
        {records.length} 件保存中
      </span>
    </div>
  );
}

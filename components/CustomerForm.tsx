"use client";

import { CustomerForm as CustomerFormType } from "@/lib/agents";

type Props = {
  form: CustomerFormType;
  onChange: (field: keyof CustomerFormType, value: string) => void;
};

type FieldConfig = {
  key: keyof CustomerFormType;
  label: string;
  type?: "text" | "textarea" | "date";
  placeholder?: string;
};

const fields: FieldConfig[] = [
  { key: "customerName",     label: "顧客名",           placeholder: "例：田中 太郎" },
  { key: "customerType",     label: "顧客区分",          placeholder: "例：購入検討・売却検討・投資家" },
  { key: "propertyName",     label: "問い合わせ物件",     placeholder: "例：〇〇マンション101号室" },
  { key: "location",         label: "所在地",            placeholder: "例：東京都渋谷区..." },
  { key: "purpose",          label: "目的",              placeholder: "例：実需購入・投資・買い替え" },
  { key: "budget",           label: "予算",              placeholder: "例：5,000万円以内" },
  { key: "interestPoints",   label: "関心ポイント",       type: "textarea", placeholder: "例：駅近・日当たり・リフォーム済み" },
  { key: "concerns",         label: "不安点",            type: "textarea", placeholder: "例：価格が高い・ローンが通るか不安" },
  { key: "sentContent",      label: "これまで送った内容",  type: "textarea", placeholder: "例：物件資料・間取り図・周辺環境情報" },
  { key: "customerResponse", label: "顧客の反応",         type: "textarea", placeholder: "例：前向きだが価格で悩んでいる" },
  { key: "lastContactDate",  label: "最終接触日",         type: "date" },
  { key: "nextAction",       label: "次に狙いたい行動",    placeholder: "例：内覧予約・再度メール・電話" },
  { key: "notes",            label: "備考",              type: "textarea", placeholder: "例：家族構成・特記事項など" },
];

const inputBase =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 transition-colors placeholder:text-gray-400";

export default function CustomerForm({ form, onChange }: Props) {
  return (
    <section
      style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "32px",
        marginBottom: "32px",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "#1A1A1A",
          marginBottom: "24px",
          paddingBottom: "12px",
          borderBottom: "2px solid #C9A84C",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ color: "#C9A84C" }}>▍</span>
        顧客・物件情報
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {fields.map(({ key, label, type = "text", placeholder }) => (
          <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label
              htmlFor={key}
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#555",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                id={key}
                rows={3}
                value={form[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
                className={inputBase}
                style={{ resize: "vertical", minHeight: "72px" }}
              />
            ) : (
              <input
                id={key}
                type={type}
                value={form[key]}
                onChange={(e) => onChange(key, e.target.value)}
                placeholder={placeholder}
                className={inputBase}
                style={{ height: "40px" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

# RENOBEST営業支援Hub v1

RENOBESTの営業担当者が、顧客情報・物件情報を入力し、目的に応じたAIエージェント用プロンプトを自動生成して、各エージェントへ移動できる社内用営業支援ツール。

---

## 主な機能

- 顧客・物件情報入力（13項目）
- 入力内容のlocalStorage自動保存・復元
- エージェント別プロンプト自動生成
- プロンプトワンクリックコピー
- 各AIエージェントへのリンク（別タブで開く）
- URL未設定エージェントのボタン無効化

---

## 登録済みエージェント

| エージェント | 状態 |
|---|---|
| 顧客追客AI | ✅ URL設定済 |
| 物件提案AI | ✅ URL設定済 |
| 売却提案AI | ✅ URL設定済 |
| 反論処理AI | ✅ URL設定済 |

## 未設定エージェント

| エージェント | 状態 |
|---|---|
| SNS広告AI | 🔲 URL未設定 |
| LP制作AI | 🔲 URL未設定 |
| メール作成AI | 🔲 URL未設定 |
| 提案資料制作AI Ver2026.10 | 🔲 URL未設定 |

---

## エージェントURL設定方法

`lib/agents.ts` の `agentLinks` オブジェクトにURLを設定するだけで反映されます。

```ts
export const agentLinks: Record<string, string> = {
  followUp:  "https://...",  // 顧客追客AI
  property:  "https://...",  // 物件提案AI
  selling:   "https://...",  // 売却提案AI
  objection: "https://...",  // 反論処理AI
  sns:       "https://...",  // SNS広告AI
  lp:        "https://...",  // LP制作AI
  email:     "https://...",  // メール作成AI
  proposal:  "https://...",  // 提案資料制作AI Ver2026.10
};
```

---

## 今後の追加予定

- ToDoアプリ連携
- 顧客データ保存
- 物件データ保存
- 提案資料制作AI Ver2026.10 連携
- LINE・メール連携
- KASHIKA連携

---

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- localStorage（入力内容の自動保存）

---

## ローカル開発

```bash
cd renobest-sales-hub
npm install
npm run dev
# → http://localhost:3000
```

## Vercelデプロイ

```bash
# Vercel CLIがない場合
npm i -g vercel

# 初回デプロイ
vercel

# 本番デプロイ
vercel --prod
```

> 環境変数は不要です。agentLinks のURLはコード内で管理しています。

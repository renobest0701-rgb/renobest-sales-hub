import { promptTemplates } from "./prompts";

export type CustomerForm = {
  customerName: string;
  customerType: string;
  propertyName: string;
  location: string;
  purpose: string;
  budget: string;
  interestPoints: string;
  concerns: string;
  sentContent: string;
  customerResponse: string;
  lastContactDate: string;
  nextAction: string;
  notes: string;
};

export type Agent = {
  id: string;
  name: string;
  description: string;
  url: string;
};

// ── エージェントURL設定 ──────────────────────────────────────
// URLはここで一括管理。変更はこのオブジェクトだけ修正すればOK。
export const agentLinks: Record<string, string> = {
  followUp:  "https://chatgpt.com/g/g-6a388498a7a88191900ec299a2b13a6e-renobest-gu-ke-zhui-ke-sutoriai", // 顧客追客AI
  property:  "https://chatgpt.com/g/g-6a38abe384188191a7a62f119f59a3b9-renobest-wu-jian-ti-an-sutoriai", // 物件提案AI
  selling:   "https://chatgpt.com/g/g-6a38b4c212b881918754e15f48677467-renobest-mai-que-ti-an-ai",       // 売却提案AI
  objection: "https://chatgpt.com/g/g-6a38b168efb8819191cfb2a744af5dfe-renobest-fan-lun-chu-li-ai",     // 反論処理AI
  sns:       "https://chatgpt.com/g/g-6a391fd071f48191b1bb18a7734d732a-renobest-snsguang-gao-ai", // SNS広告AI
  lp:        "", // LP制作AI（未設定）
  email:     "", // メール作成AI（未設定）
  proposal:  "", // 提案資料制作AI Ver2026.10（未設定）
  overseas:  "https://chatgpt.com/g/g-6a3921e0fba48191bb6e0830a3841e66-renobest-hai-wai-gu-ke-dui-ying-ai", // 海外顧客対応AI
  contract:      "https://chatgpt.com/g/g-6a3923e52a908191ae66f3727334e177-renobest-qi-yue-bi-yao-shu-lei-an-nei-ai", // 契約・必要書類案内AI
  finance:       "https://chatgpt.com/g/g-6a3927ac4378819191885389590db053-renobest-zi-jin-ji-hua-zhu-fei-yong-an-nei-ai", // 資金計画・諸費用案内AI
  propertyStory: "https://chatgpt.com/g/g-6a38abe384188191a7a62f119f59a3b9-renobest-wu-jian-ti-an-sutoriai", // 物件提案ストーリーAI（物件提案AIと同URL）
};

export const agents: Agent[] = [
  {
    id: "followUp",
    name: "顧客追客ストーリーAI",
    description: "顧客情報・問い合わせ物件・顧客ランク・最終接触状況をもとにLINE・メール・電話トーク・7日間追客スケジュールを作成",
    url: agentLinks.followUp,
  },
  {
    id: "property",
    name: "物件提案AI",
    description: "顧客のニーズに合った物件提案文・比較資料の文面を生成",
    url: agentLinks.property,
  },
  {
    id: "propertyStory",
    name: "物件提案ストーリーAI",
    description: "物件情報・立地・眺望・価格・ターゲット顧客をもとに提案ストーリー・LINE・メール・電話トーク・LP・SNS訴求を作成",
    url: agentLinks.propertyStory,
  },
  {
    id: "selling",
    name: "売却提案AI",
    description: "売却相談・他社売却中・査定希望・既存顧客に対して売却提案・査定面談・媒介取得へつなぐLINE・メール・電話トークを作成",
    url: agentLinks.selling,
  },
  {
    id: "objection",
    name: "反論処理AI",
    description: "断り文句・不安・迷いに対して失注を防ぎ、内見・オンライン面談・再提案へつなぐLINE・メール・電話トークを作成",
    url: agentLinks.objection,
  },
  {
    id: "sns",
    name: "SNS広告AI",
    description: "物件情報・ターゲット・訴求ポイントをもとにInstagram・Facebook・LINE・LP誘導用の広告文・キャッチコピー・CTAを生成",
    url: agentLinks.sns,
  },
  {
    id: "overseas",
    name: "海外顧客対応AI",
    description: "購入・売却・法人購入・税金・登記・賃貸運用・民泊運用を日本語・繁体字・簡体字・英語でLINE・メール・電話トーク作成",
    url: agentLinks.overseas,
  },
  {
    id: "contract",
    name: "契約・必要書類案内AI",
    description: "売買・賃貸・法人購入・海外顧客・売却・媒介契約に関する必要書類・契約前確認事項・決済準備の案内文を作成",
    url: agentLinks.contract,
  },
  {
    id: "finance",
    name: "資金計画・諸費用案内AI",
    description: "購入諸費用・月々返済・投資収支・運営シミュレーション・顧客向け説明文を作成",
    url: agentLinks.finance,
  },
  {
    id: "lp",
    name: "LP制作AI",
    description: "物件・サービス訴求のランディングページ構成・コピーを生成",
    url: agentLinks.lp,
  },
  {
    id: "email",
    name: "メール作成AI",
    description: "追客・アポ取り・御礼・クロージングメールの文面を生成",
    url: agentLinks.email,
  },
  {
    id: "proposal",
    name: "提案資料制作AI Ver2026.10",
    description: "顧客向け提案資料のストーリー・構成・文章を生成",
    url: agentLinks.proposal,
  },
];

// ── プロンプト生成 ────────────────────────────────────────────
// テンプレートは lib/prompts.ts で管理
export function generatePrompt(agentId: string, form: CustomerForm): string {
  const template = promptTemplates[agentId];
  if (template) return template(form);
  return `顧客名：${form.customerName}\nこの顧客に対して最適な提案・対応を教えてください。`;
}

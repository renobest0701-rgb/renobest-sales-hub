import { CustomerForm } from "./agents";

// ── 型定義 ───────────────────────────────────────────────────

export type TodoItem = {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
};

export type CustomerRecord = {
  id: string;
  label: string; // ドロップダウン表示名（例：田中太郎）
  form: CustomerForm;
  todos: TodoItem[];
  updatedAt: string;
};

// ── ストレージキー ───────────────────────────────────────────

const RECORDS_KEY = "renobest-hub-records";
const ACTIVE_KEY  = "renobest-hub-active-id";

// ── デフォルト値 ─────────────────────────────────────────────

export const defaultForm: CustomerForm = {
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

function newRecord(id: string): CustomerRecord {
  return {
    id,
    label: "新規顧客",
    form: { ...defaultForm },
    todos: [],
    updatedAt: new Date().toISOString(),
  };
}

// ── localStorage 読み書き ────────────────────────────────────

export function loadRecords(): CustomerRecord[] {
  if (typeof window === "undefined") return [newRecord("default")];
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    if (raw) {
      const parsed: CustomerRecord[] = JSON.parse(raw);
      if (parsed.length > 0) return parsed;
    }
  } catch {}
  const initial = newRecord("default");
  saveRecords([initial]);
  return [initial];
}

export function saveRecords(records: CustomerRecord[]): void {
  try {
    localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  } catch {}
}

export function loadActiveId(records: CustomerRecord[]): string {
  if (typeof window === "undefined") return records[0]?.id ?? "default";
  try {
    const id = localStorage.getItem(ACTIVE_KEY);
    if (id && records.find((r) => r.id === id)) return id;
  } catch {}
  return records[0]?.id ?? "default";
}

export function saveActiveId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_KEY, id);
  } catch {}
}

// ── レコード操作ヘルパー ─────────────────────────────────────

export function createRecord(): CustomerRecord {
  return newRecord(Date.now().toString());
}

export function updateRecord(
  records: CustomerRecord[],
  id: string,
  patch: Partial<Omit<CustomerRecord, "id">>
): CustomerRecord[] {
  return records.map((r) =>
    r.id === id ? { ...r, ...patch, updatedAt: new Date().toISOString() } : r
  );
}

export function deleteRecord(
  records: CustomerRecord[],
  id: string
): CustomerRecord[] {
  return records.filter((r) => r.id !== id);
}

// ── ToDo ヘルパー ────────────────────────────────────────────

export function addTodo(todos: TodoItem[], text: string): TodoItem[] {
  return [
    ...todos,
    { id: Date.now().toString(), text, done: false, createdAt: new Date().toISOString() },
  ];
}

export function toggleTodo(todos: TodoItem[], todoId: string): TodoItem[] {
  return todos.map((t) => (t.id === todoId ? { ...t, done: !t.done } : t));
}

export function deleteTodo(todos: TodoItem[], todoId: string): TodoItem[] {
  return todos.filter((t) => t.id !== todoId);
}

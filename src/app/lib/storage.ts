export type RecordItem = { id: string; createdAt: string; [key: string]: any };
export function read<T>(key: string, fallback: T): T { try { const value = localStorage.getItem('eco:' + key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } }
export function write(key: string, value: unknown) { localStorage.setItem('eco:' + key, JSON.stringify(value)); }
export function add(key: string, value: object) { const item = { ...value, id: crypto.randomUUID(), createdAt: new Date().toISOString() }; write(key, [item, ...read<RecordItem[]>(key, [])]); return item; }

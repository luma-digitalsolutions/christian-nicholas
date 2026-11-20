import { getMode } from "../config";
import type { Store } from "../types";
import { createDemoStore } from "./demo";
import { createSheetsStore } from "./sheets";

const g = globalThis as unknown as { __store?: Store };

/** Nunca cai para demo se o modo 'sheets' falhar: erro explícito. */
export function getStore(): Store {
  if (!g.__store) g.__store = getMode() === "sheets" ? createSheetsStore() : createDemoStore();
  return g.__store;
}

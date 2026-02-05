// packages/db/index.ts
import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "./src/schema"; // packages/db/src/schema.ts を指す

const sqlite = new Database("../../packages/db/sqlite.db"); // パスに注意

export const db = drizzle(sqlite, { schema });
export * from "./src/schema";
// packages/db/drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./schema.ts",   // 先ほど作った設計図の場所
  out: "./drizzle",      // 履歴ファイルの保存先
  dialect: "sqlite",     // SQLiteを使うよ
  dbCredentials: {
    url: "sqlite.db",    // 実際のデータベースファイル名
  },
});
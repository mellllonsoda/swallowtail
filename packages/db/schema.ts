// packages/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const randomUUID = () => crypto.randomUUID();

export const clothes = sqliteTable("clothes", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  
  // 基本情報
  name: text("name").notNull(),
  brand: text("brand"),
  category: text("category"),
  
  // サイズ詳細
  shoulderWidth: integer("shoulder_width"),
  bust: integer("bust"),
  waist: integer("waist"),
  length: integer("length"),
  
  // 管理用
  imageUrl: text("image_url"),
  link: text("link"),
  price: integer("price"),
  memo: text("memo"),
  
  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date()),
});
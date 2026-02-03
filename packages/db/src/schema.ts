import { sqliteTable,text,integer } from "drizzle-orm/sqlite-core";

export const clothes = sqliteTable("clothes", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
  size: text("size").notNull(),
  price: integer("price").notNull(),
});
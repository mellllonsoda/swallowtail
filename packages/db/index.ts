import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { join } from "path";

// このファイルがある場所（packages/db）にある sqlite.db を指す
const dbPath = join(import.meta.dir, "sqlite.db");

const client = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle(client, { schema });
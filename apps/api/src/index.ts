import { Elysia } from "elysia";

const app = new Elysia()
  .get("/health", () => ({ ok: true }))
  .listen(3001);

console.log(
  `🦊 Elysia running at http://localhost:${app.server?.port}`
);

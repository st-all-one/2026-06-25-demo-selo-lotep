import { Hono } from "npm:hono";
import { getCachedSeloUrl } from "./src/cache.ts";

const app = new Hono();

// 1. Rota que serve a página inicial, injetando a URL do selo LOTEP calculada no backend
app.get("/", async (c) => {
  const seloUrl = await getCachedSeloUrl();
  // Agora lê da pasta public/
  const htmlTemplate = await Deno.readTextFile("./public/index.html");
  const finalHtml = htmlTemplate.replaceAll("{{SELO_URL}}", seloUrl);
  return c.html(finalHtml);
});

// 2. Rotas estáticas exclusivas para os assets da interface web na pasta public/
app.get("/style.css", async (c) => {
  const content = await Deno.readTextFile("./public/style.css");
  return c.text(content, 200, { "Content-Type": "text/css" });
});

app.get("/main.js", async (c) => {
  const content = await Deno.readTextFile("./public/main.js");
  return c.text(content, 200, { "Content-Type": "application/javascript" });
});

app.get("/iframe-control.js", async (c) => {
  const content = await Deno.readTextFile("./public/iframe-control.js");
  return c.text(content, 200, { "Content-Type": "application/javascript" });
});

console.info("🚀 Servidor Web LOTEP rodando limpo e desacoplado na porta 8000!");
Deno.serve({ port: 8000 }, app.fetch);

import { Hono } from "npm:hono";
import { getCachedSeloUrl } from "./src/cache.ts";

const app = new Hono();

// Servidor puramente dedicado ao roteamento HTTP e IO de rede.
app.get("/", async (c) => {
  // 1. Obtém a URL dinamicamente via módulo de Cache
  const seloUrl = await getCachedSeloUrl();

  // 2. Lê a view (HTML) estática do sistema de arquivos
  const htmlTemplate = await Deno.readTextFile("./src/index.html");

  // 3. Injeta a URL no template e serve ao cliente
  const finalHtml = htmlTemplate.replaceAll("{{SELO_URL}}", seloUrl);

  return c.html(finalHtml);
});

// Rota estática isolada para servir a lógica de UI do navegador
app.get("/main.js", async (c) => {
  const jsContent = await Deno.readTextFile("./src/main.js");
  return c.text(jsContent, 200, {
    "Content-Type": "application/javascript",
  });
});

console.info(
  "🚀 Servidor Web LOTEP rodando limpo e desacoplado na porta 8000!",
);

Deno.serve({ port: 8000 }, app.fetch);

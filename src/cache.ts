import { generateSeloUrl } from "./main.ts";

// Variáveis para o controle do cache de 5 minutos
const CACHE_TTL_MS = 5 * 60 * 1000;
let cachedSeloInfo: { url: string; expiresAt: number } | null = null;

/**
 * Módulo de orquestração do cache de geração da URL.
 * Extrai as variáveis de ambiente e decide se usa cache ou aciona o main.ts.
 */
export async function getCachedSeloUrl(): Promise<string> {
  const now = Date.now();

  // Retorna a URL salva se o cache ainda estiver válido
  if (cachedSeloInfo && now < cachedSeloInfo.expiresAt) {
    console.info("[CACHE] Hit: Retornando URL armazenada em memória.");
    return cachedSeloInfo.url;
  }

  console.info(
    "[CACHE] Miss: Cache vazio ou expirado. Delegando cálculo para main.ts...",
  );

  // Leitura segura do ambiente
  const baseUrl = Deno.env.get("SELO_OPERADOR_LOTEP_BASE_URL") ??
    "https://lotep.pb.gov.br";
  const cnpj = Deno.env.get("SELO_OPERADOR_LOTEP_CNPJ") ?? "00000000000000";
  const secret = Deno.env.get("SELO_OPERADOR_LOTEP_SECRET") ??
    "chave_padrao_invalida";
  const style = Deno.env.get("SELO_OPERADOR_LOTEP_STYLE") ?? "footer";
  const theme = Deno.env.get("SELO_OPERADOR_LOTEP_THEME") ?? "black";

  const timestamp = Math.floor(now / 1000);

  // Aciona a lógica de criptografia (main.ts)
  const url = await generateSeloUrl(
    baseUrl,
    cnpj,
    secret,
    style,
    theme,
    timestamp,
  );

  // Armazena no cache
  cachedSeloInfo = {
    url,
    expiresAt: now + CACHE_TTL_MS,
  };

  return url;
}

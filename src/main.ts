/**
 * Implementação exclusiva da regra de negócio e cálculo criptográfico.
 * Mantido puro e desacoplado, lidando apenas com a matemática.
 */
export async function generateSeloUrl(
  baseUrl: string,
  cnpj: string,
  secret: string,
  style: string,
  theme: string,
  timestamp: number,
): Promise<string> {
  const encoder = new TextEncoder();

  // Importação da chave usando a Web Crypto API
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  // Geração da assinatura HMAC-SHA256
  const data = encoder.encode(`${cnpj}|${timestamp}`);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);

  // Conversão do ArrayBuffer para string Hexadecimal
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const token = signatureArray.map((b) => b.toString(16).padStart(2, "0")).join(
    "",
  );

  return `${baseUrl}/api/v1/selo-operador?cnpj=${cnpj}&timestamp=${timestamp}&token=${token}&style=${style}&theme=${theme}`;
}

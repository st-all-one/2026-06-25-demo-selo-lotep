# Demo Selo LOTEP (Deno + Hono - Modular)

Exemplo didático e ultradesacoplado da implementação do Selo Dinâmico LOTEP utilizando Deno (2.0+).

## Estrutura do Projeto

O servidor web foi extraído e o núcleo da aplicação movido para a pasta `src/`:

- **`server.ts`**: (Raiz) Atua puramente como servidor HTTP Hono.
- **`src/cache.ts`**: Gerencia o estado da memória (cache de 5 min) e resolve variáveis de ambiente.
- **`src/main.ts`**: Mantém **exclusivamente** o algoritmo de criptografia HMAC Web Crypto API.
- **`src/index.html`**: Layout responsivo do frontend estático.
- **`.env`**: Suas credenciais de acesso (Client Secret, CNPJ).

*(Arquivos `main.ts` e `index.html` soltos na raiz de versões anteriores podem ser apagados).*

## Como testar localmente

1. Tenha o [Deno](https://deno.land/) (2.0+) instalado.
2. Acesse a pasta do projeto e configure o `.env`.
3. Inicie o servidor:

```bash
deno run --env --allow-net --allow-read server.ts
```

4. Acesse `http://localhost:8000` no seu navegador.

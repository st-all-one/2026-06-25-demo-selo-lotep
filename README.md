# Demo Selo LOTEP (Deno + Hono)

Integração oficial desenvolvida sob o mais alto padrão corporativo, isolando totalmente responsabilidades de Backend e Frontend.

## Estrutura do Projeto

### Servidor HTTP
- **`server.ts`**: (Raiz) Atua puramente como servidor web, injeta a URL dinâmica no HTML e serve arquivos estáticos.
- **`.env`**: Configurações de ambiente (Base URL, CNPJ, Client Secret).

### Backend Segregado (Criptografia) - `src/`
- **`src/main.ts`**: O algoritmo matemático isolado de criptografia HMAC Web Crypto API.
- **`src/cache.ts`**: Lógica de otimização de requisições e persistência em memória de 5 minutos.

### Frontend Estático - `public/`
- **`public/index.html`**: A casca visual do site com suporte total a leitores de tela e navegação por teclado.
- **`public/style.css`**: Todo o design CSS componentizado com suporte a modo Claro/Escuro por variáveis.
- **`public/main.js`**: Scripts de comportamento genérico do site (ex: Botão de Alto Contraste persistente).
- **`public/iframe-control.js`**: O maestro específico do Selo: gerencia a interceptação dos parâmetros (`theme`, `style`) e os repassa dinamicamente para o iframe sem ferir o cache.

## Como rodar e testar

1. Tenha o [Deno](https://deno.land/) (2.0+) instalado.
2. Acesse a pasta do projeto e certifique-se de configurar seu `.env`.
3. Inicie o servidor. Lembre-se de reiniciar caso o processo já estivesse rodando:

```bash
deno task start
```

4. Acesse `http://localhost:8000` no navegador.

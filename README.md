# Pizza Express - Fullstack

Este repositório contém o frontend (Next.js + Chakra UI) e está integrado ao backend (NestJS + Prisma + PostgreSQL) para gestão de pizzaria.

## Frontend
- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **UI:** Chakra UI (com ColorMode e Toaster customizados)
- **Gerenciamento de tema:** next-themes
- **Outros:** React 19, react-icons

### Estrutura
- `app/`: páginas, layout e estilos globais
- `components/ui/`: componentes utilitários (Provider, ColorMode, Toaster, Tooltip)
- `public/`: assets SVG

### Funcionalidades
- Suporte a tema claro/escuro
- Sistema de notificações (toaster)
- Tooltips customizados
- Pronto para deploy em Vercel

## Backend
- **Framework:** NestJS
- **ORM:** Prisma
- **Banco:** PostgreSQL
- **Validação:** class-validator
- **Autenticação:** JWT
- **Testes:** Jest + Supertest (e2e)
- **CI/CD:** GitHub Actions

### Estrutura
- `src/`: código principal (auth, clientes, entregadores, pizzas, pedidos)
- `prisma/`: migrations, schema e seed
- `test/`: testes e2e

### Funcionalidades
- CRUD de clientes, entregadores, pizzas e pedidos
- Autenticação JWT (login, registro, rotas protegidas)
- Documentação Swagger em `/api`
- Testes automatizados e2e

## Integração
- O frontend consome os endpoints REST do backend.
- Autenticação JWT para rotas protegidas.
- Fluxo de pedidos, cadastro de clientes, pizzas e entregadores via chamadas HTTP.

## Como rodar localmente
1. Clone este repositório e o backend.
2. Instale as dependências: `npm install`
3. Inicie o backend conforme instruções do repositório backend.
4. Inicie o frontend: `npm run dev`
5. Acesse [http://localhost:3000](http://localhost:3000)

## Observações
- Não utiliza Tailwind CSS
- Estrutura pronta para expansão modular
- Veja o arquivo `RESUMO_PROJETO.txt` para detalhes técnicos completos.

# Aplicação de Agendamentos

Sistema genérico de gerenciamento de agendamentos com área do cliente e área administrativa.

## Documentação

- [BUSINESS_RULES.md](./BUSINESS_RULES.md) — regras funcionais
- [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) — arquitetura técnica
- [IMPLEMENTATION_DECISIONS.md](./IMPLEMENTATION_DECISIONS.md) — decisões de implementação

## Estrutura

```text
aplicacao-de-agendamento/
├── frontend/          # React + Vite
├── backend/           # Node.js + Express
└── docs (*.md)
```

## Pré-requisitos

- Node.js 18+
- npm
- MongoDB Atlas (ou instância local)

## Configuração

### Backend

```bash
cd backend
cp .env.example .env
# Preencha MONGODB_URI, JWT_SECRET, ADMIN_USER e ADMIN_PASSWORD
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env
# Ajuste VITE_API_URL se necessário
npm install
npm run dev
```

### Monorepo (raiz)

```bash
npm install
npm run dev
```

## Stack

| Camada    | Tecnologias              |
| --------- | ------------------------ |
| Frontend  | React, Vite, React Router |
| Backend   | Node.js, Express, Mongoose, Zod, JWT |
| Banco     | MongoDB                  |

## Scripts (raiz)

| Script          | Descrição                          |
| --------------- | ---------------------------------- |
| `npm run dev`   | Inicia frontend e backend          |
| `npm run dev:frontend` | Apenas frontend             |
| `npm run dev:backend`  | Apenas backend              |
| `npm run build` | Build de produção do frontend      |
| `npm run start` | Inicia backend em produção         |

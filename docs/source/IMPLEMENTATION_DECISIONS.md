# IMPLEMENTATION_DECISIONS.md

Versão: 1.0

---

# Objetivo

Este documento registra decisões de implementação tomadas após a revisão dos documentos **BUSINESS_RULES.md** e **PROJECT_ARCHITECTURE.md**.

Seu objetivo é eliminar ambiguidades identificadas durante a fase de análise da documentação.

Estas decisões complementam a documentação existente e possuem prioridade apenas nos pontos explicitamente descritos abaixo.

Todas as demais regras continuam sendo definidas pelos documentos oficiais do projeto.

---

# ID-001 — Regra do telefone

## Referência

Dúvida 7.1

## Decisão

A implementação deve seguir exclusivamente a atualização descrita no **PROJECT_ARCHITECTURE.md**.

A regra antiga existente no **BUSINESS_RULES.md** deve ser desconsiderada.

Implementar:

- Um telefone pode possuir apenas um agendamento ativo por vez.
- São considerados ativos:
  - Agendado
  - Confirmado
- Após Cancelado ou Concluído, o mesmo telefone poderá criar um novo agendamento normalmente.

---

# ID-002 — Endpoint para consulta de horários disponíveis

## Referência

Dúvida 7.2

## Decisão

Será criado um endpoint específico para consulta de horários disponíveis.

Endpoint:

```http
GET /api/appointments/available?date=YYYY-MM-DD
```

Responsabilidades:

- Receber uma data.
- Retornar apenas horários disponíveis.
- Aplicar todas as regras de disponibilidade descritas na documentação.

Essa abordagem evita que o frontend precise consultar todos os agendamentos para calcular a disponibilidade.

---

# ID-003 — Padronização das respostas da API

## Referência

Dúvida 7.3

## Decisão

Todos os endpoints da API devem utilizar exclusivamente o padrão definido na Seção 40 do PROJECT_ARCHITECTURE.md.

Resposta de sucesso:

```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {}
}
```

Resposta de erro:

```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

Não utilizar formatos diferentes em endpoints distintos.

---

# ID-004 — Credenciais administrativas

## Referência

Dúvida 7.4

## Decisão

As credenciais administrativas continuarão sendo fixas, porém armazenadas em variáveis de ambiente.

Utilizar:

```env
ADMIN_USER=
ADMIN_PASSWORD=
```

Não implementar:

- cadastro de administradores;
- banco de usuários;
- recuperação de senha.

---

# ID-005 — Mensagem para telefone com agendamento ativo

## Referência

Dúvida 7.5

## Decisão

Quando um telefone já possuir um agendamento ativo, retornar a seguinte mensagem:

```text
Este telefone já possui um agendamento ativo.
Finalize ou cancele o agendamento atual antes de criar um novo.
```

---

# ID-006 — Normalização/comparação de telefone

## Referência

Dúvida 7.6

## Decisão

**Resposta:**

A aplicação deverá trabalhar exclusivamente com números de telefone nacionais brasileiros.

A regra anterior de aceitar números internacionais deve ser desconsiderada na implementação.

O telefone deverá ser tratado da seguinte forma:

- Aceitar somente números brasileiros.
- Remover máscaras e caracteres especiais antes do armazenamento e comparação.
- Armazenar o valor normalizado contendo apenas números.
- Exibir o telefone formatado na interface para melhorar a experiência do usuário.

Exemplo:

Entrada:
(11) 99999-9999

Armazenamento:
11999999999

Comparação:
11999999999 = 11999999999

Não será necessário suportar formatos internacionais como:
+55 11 99999-9999
5511999999999

A implementação deve seguir esta regra mesmo que existam referências anteriores permitindo números internacionais no BUSINESS_RULES ou PROJECT_ARCHITECTURE.

---

# ID-007 — Timezone

## Referência

Dúvida 7.7

## Decisão

Todas as validações relacionadas à data e horário deverão considerar o fuso horário:

```text
America/Sao_Paulo
```

Essa regra aplica-se principalmente para:

- validação da data atual;
- bloqueio de horários passados;
- cálculo de disponibilidade.

---

# ID-008 — Ordenação da listagem administrativa

## Referência

Dúvida 7.8

## Decisão

Ordenação inicial:

- Data em ordem decrescente.

Quando o administrador selecionar uma ordenação manual (Data, Horário ou Status), a aplicação deverá alternar automaticamente entre:

```text
ASC
↓

DESC
↓

ASC
```

---

# ID-009 — Cancelamento de agendamento

## Referência

Dúvida 7.9

## Decisão

O cancelamento não possuirá endpoint próprio.

Será tratado como uma alteração de status utilizando o endpoint:

```http
PATCH /api/appointments/:id/status
```

Enviando:

```json
{
  "status": "Cancelado"
}
```

As regras de transição de status continuam obrigatórias.

---

# ID-010 — Página de confirmação

## Referência

Dúvida 7.10

## Decisão

Após a criação bem-sucedida de um agendamento, o usuário será redirecionado para uma página dedicada de confirmação.

Fluxo:

```text
Formulário

↓

Confirmação de Agendamento
```

A rota sugerida é:

```text
/confirmation
```

---

# ID-011 — Proteção das rotas

## Referência

Dúvida 7.11

## Decisão

As rotas públicas serão:

```http
POST /api/auth/login

POST /api/appointments

GET /api/appointments/available
```

As rotas protegidas por JWT serão:

```http
GET /api/appointments

PATCH /api/appointments/:id/status

DELETE /api/appointments/:id
```

---

# ID-012 — Regras antigas substituídas

## Referência

Dúvida 7.12

## Decisão

Sempre que houver conflito entre regras antigas e decisões arquiteturais mais recentes, prevalece o PROJECT_ARCHITECTURE.md e este documento.

Em especial, devem ser ignoradas referências antigas relacionadas à possibilidade de múltiplos agendamentos ativos para um mesmo telefone.

---

# ID-013 — Nome da pasta raiz

## Referência

Dúvida 7.13

## Decisão

O projeto poderá utilizar o nome atual do repositório:

```text
aplicacao-de-agendamento
```

A nomenclatura "appointment-system" presente na documentação é apenas ilustrativa e não possui impacto funcional.

---

# ID-014 — Estrutura do Frontend

## Referência

Dúvida 7.14

## Decisão

A implementação deverá seguir a estrutura mais recente descrita na Seção 11 do PROJECT_ARCHITECTURE.md.

Estrutura:

```text
src/

├── components/
├── pages/
├── hooks/
├── services/
├── routes/
├── contexts/
├── App.jsx
└── main.jsx
```

Essa organização substitui representações anteriores presentes na documentação.

---

# Considerações Finais

Este documento complementa os arquivos:

- BUSINESS_RULES.md
- PROJECT_ARCHITECTURE.md

Durante a implementação, sempre que existir conflito entre versões anteriores e as decisões registradas neste documento, deverão prevalecer:

1. IMPLEMENTATION_DECISIONS.md
2. PROJECT_ARCHITECTURE.md
3. BUSINESS_RULES.md

Nenhuma funcionalidade adicional deve ser implementada além das especificadas nesses documentos.
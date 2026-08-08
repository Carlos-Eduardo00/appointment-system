# PROJECT_ARCHITECTURE.md

# Arquitetura da Aplicação de Agendamentos

Versão: 1.0

---

# 1. Objetivo do Documento

Este documento define a arquitetura técnica da Aplicação de Agendamentos.

Seu objetivo é servir como referência durante todo o desenvolvimento do projeto, documentando as decisões arquiteturais adotadas, a organização da aplicação, a estrutura do código, os componentes da solução e a forma como as regras de negócio serão implementadas.

Este documento complementa o arquivo **BUSINESS_RULES.md**, que permanece como a principal referência funcional da aplicação.

Enquanto o BUSINESS_RULES.md descreve **o que** o sistema deve fazer, este documento descreve **como** a solução será construída tecnicamente.

---

# 2. Atualização de Regra de Negócio

## Importante

Durante a definição da arquitetura da aplicação foi realizada uma revisão das regras de negócio e identificou-se a necessidade de ajustar a regra referente ao telefone do cliente.

O documento **BUSINESS_RULES.md** informa originalmente que um mesmo telefone pode possuir múltiplos agendamentos ativos em determinadas condições.

**Essa regra deve ser desconsiderada durante a implementação desta aplicação.**

Para fins de desenvolvimento, prevalece a seguinte regra arquitetural:

- Um número de telefone poderá possuir apenas um agendamento ativo por vez.
- São considerados agendamentos ativos aqueles com status:
  - Agendado
  - Confirmado
- Caso exista um agendamento ativo para determinado telefone, um novo agendamento deverá ser impedido.
- Após o agendamento ser Cancelado ou Concluído, o mesmo telefone poderá realizar um novo agendamento normalmente.

Esta decisão substitui exclusivamente essa regra específica do BUSINESS_RULES.md.

Todas as demais regras de negócio permanecem inalteradas e continuam sendo consideradas a fonte oficial de requisitos da aplicação.

---

# 3. Objetivos Arquiteturais

A arquitetura desta aplicação foi definida considerando principalmente o contexto do desafio técnico.

O objetivo não é construir uma solução de grande escala, mas sim desenvolver uma aplicação organizada, funcional e de fácil manutenção, priorizando simplicidade sem abrir mão de boas práticas de desenvolvimento.

As decisões arquiteturais foram tomadas considerando os seguintes princípios:

- Simplicidade na implementação.
- Clareza da organização do projeto.
- Separação de responsabilidades.
- Facilidade de manutenção.
- Baixo acoplamento entre frontend e backend.
- Facilidade de evolução futura.
- Aderência às regras de negócio.
- Código limpo e legível.
- Rapidez de desenvolvimento compatível com o prazo do desafio.

Sempre que existiu uma escolha entre uma solução mais sofisticada e outra mais simples, foi priorizada a alternativa que melhor atendesse aos requisitos do projeto sem adicionar complexidade desnecessária.

---

# 4. Escopo Arquitetural

A arquitetura contempla exclusivamente os recursos previstos no BUSINESS_RULES.md.

Não fazem parte desta arquitetura:

- Cadastro de clientes.
- Área do cliente autenticada.
- Recuperação de senha.
- Cadastro de administradores.
- Cadastro de serviços.
- Múltiplas empresas.
- Múltiplos profissionais.
- Integrações externas.
- Sistema de pagamentos.
- Sistema de notificações.
- Dashboard analítico.
- Controle de preços.
- Controle de duração individual dos serviços.

Esses recursos poderão ser adicionados futuramente sem comprometer a estrutura geral da aplicação.

---

# 5. Visão Geral da Solução

A aplicação será composta por dois módulos independentes.

## Área do Cliente

Responsável pelo processo de agendamento.

Permite:

- Consultar horários disponíveis.
- Selecionar um serviço.
- Informar nome e telefone.
- Escolher data.
- Escolher horário.
- Confirmar o agendamento.

O cliente não possui autenticação.

Toda comunicação será realizada diretamente com a API REST.

---

## Área Administrativa

Responsável pelo gerenciamento dos agendamentos.

Permite:

- Login.
- Listagem de agendamentos.
- Pesquisa.
- Ordenação.
- Filtro por data.
- Alteração de status.
- Cancelamento.
- Exclusão de registros permitidos.

A área administrativa será protegida por autenticação utilizando JSON Web Token (JWT).

---

# 6. Arquitetura Geral

A aplicação seguirá uma arquitetura cliente-servidor.

Fluxo geral da solução:

```text
                Usuário

                   │

                   ▼

        Frontend (React + Vite)

                   │

          HTTP / REST API (JSON)

                   │

                   ▼

      Backend (Node.js + Express)

                   │

             Camada Services

                   │

             Mongoose ODM

                   │

                   ▼

             MongoDB Atlas
```

Toda comunicação entre frontend e backend será realizada através de uma API REST utilizando requisições HTTP e respostas no formato JSON.

Não haverá comunicação direta entre o frontend e o banco de dados.

Toda regra de negócio será centralizada no backend.

---

# 7. Arquitetura em Camadas

O backend será organizado utilizando uma arquitetura em camadas simples.

Fluxo interno das requisições:

```text
Cliente

↓

Routes

↓

Controllers

↓

Services

↓

Models (Mongoose)

↓

MongoDB
```

Cada camada possuirá responsabilidades bem definidas.

### Routes

Responsável pelo mapeamento das rotas da API.

Não contém regra de negócio.

Sua função é encaminhar as requisições para o controller correspondente.

---

### Controllers

Responsáveis por:

- Receber requisições.
- Validar entrada utilizando Zod.
- Chamar os Services.
- Retornar respostas HTTP.

Controllers não devem implementar regras de negócio.

---

### Services

Camada responsável pelas regras da aplicação.

Exemplos:

- validar disponibilidade;
- verificar conflitos de horário;
- impedir duplicidade de telefone em agendamentos ativos;
- controlar alterações de status;
- aplicar regras de cancelamento;
- validar exclusão;
- consultar horários disponíveis.

Toda lógica de negócio ficará centralizada nesta camada.

---

### Models

Responsáveis pela modelagem das coleções MongoDB utilizando Mongoose.

Devem conter apenas:

- Schema;
- Validações estruturais;
- Métodos relacionados ao modelo quando necessário.

Não devem conter regras de negócio da aplicação.

---

# 8. Arquitetura Monorepo

O projeto será desenvolvido utilizando uma arquitetura Monorepo simples.

Estrutura principal:

```text
appointment-system/

├── frontend/
├── backend/
│
├── BUSINESS_RULES.md
├── PROJECT_ARCHITECTURE.md
└── README.md
```

Essa organização foi escolhida por oferecer uma estrutura simples, organizada e adequada ao escopo do desafio técnico.

Ela facilita a navegação do projeto, reduz a complexidade da configuração inicial e mantém frontend, backend e documentação centralizados em um único repositório.

---

# 9. Estrutura de Diretórios

## Frontend

```text
frontend/

├── src/
│
├── components/
├── pages/
├── hooks/
├── services/
├── routes/
│
├── App.jsx
└── main.jsx
```

### Responsabilidades

**components**

Componentes reutilizáveis da interface.

Exemplos:

- Button
- Input
- Modal
- Header
- AppointmentCard

---

**pages**

Representam as páginas da aplicação.

Exemplos:

- Home
- Login
- Admin
- NotFound

---

**hooks**

Hooks personalizados da aplicação.

Exemplos:

- useAuth
- useAppointments

---

**services**

Responsáveis pela comunicação com a API.

Nenhuma regra de negócio deverá existir nesta camada.

---

**routes**

Configuração das rotas React.

Separação entre:

- Área pública
- Área administrativa

---

## Backend

```text
backend/

├── src/
│
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
│
└── server.js
```

### Responsabilidades

**routes**

Define os endpoints da API.

---

**controllers**

Recebem as requisições HTTP e retornam as respostas.

---

**services**

Implementam todas as regras de negócio.

---

**models**

Representam a estrutura dos documentos MongoDB utilizando Mongoose.

---

**middlewares**

Responsáveis por funcionalidades compartilhadas.

Exemplos:

- autenticação JWT;
- tratamento de erros;
- validação de acesso às rotas administrativas.

---

Com essa organização, cada responsabilidade permanece isolada, facilitando manutenção, testes futuros e evolução da aplicação sem aumentar a complexidade da arquitetura.


# 10. Arquitetura do Frontend

O frontend será desenvolvido utilizando:

- React
- Vite

A aplicação será responsável pela interface do usuário, interação com o cliente e gerenciamento da área administrativa.

O frontend não terá acesso direto ao banco de dados.

Toda comunicação com os dados da aplicação será realizada através da API REST disponibilizada pelo backend.

---

# 11. Organização do Frontend

A estrutura seguirá uma organização por tipo de responsabilidade.

Estrutura:

```text
frontend/

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

---

# 12. Responsabilidade das Camadas do Frontend

## Components

Responsáveis por componentes reutilizáveis da interface.

Exemplos:

- Botões.
- Inputs.
- Cards.
- Modais.
- Tabelas.
- Elementos de formulário.

Os componentes devem ser independentes das regras de negócio sempre que possível.

Exemplo:

Um componente de botão deve apenas representar um botão.

A lógica de agendamento deve permanecer em páginas, hooks ou services.

---

## Pages

Representam as telas completas da aplicação.

Principais páginas previstas:

### Área Pública

```text
Home

↓

Formulário de Agendamento

↓

Confirmação de Agendamento
```

---

### Área Administrativa

```text
Login Administrativo

↓

Painel de Agendamentos
```

---

Responsabilidades:

- Compor componentes.
- Controlar fluxo da página.
- Consumir hooks.
- Interagir com services.

---

## Services

Camada responsável pela comunicação com a API.

Exemplo:

```text
frontend

services

      |

      ↓

API REST

      |

      ↓

backend
```

Responsabilidades:

- Realizar requisições HTTP.
- Centralizar chamadas externas.
- Padronizar comunicação com backend.

Não deve conter:

- regras de negócio;
- validações de domínio;
- manipulação direta de componentes.

---

## Hooks

Responsáveis por encapsular lógicas reutilizáveis.

Exemplos:

```text
useAuth

useAppointments

useAvailableTimes
```

Responsabilidades:

- Reutilização de lógica.
- Organização de estados.
- Integração entre componentes e services.

---

## Routes

Responsável pelo controle de navegação da aplicação.

Separação prevista:

```text
Rotas Públicas

/

/

agendamento


Rotas Privadas

/admin

/admin/dashboard
```

As rotas administrativas deverão verificar autenticação antes de permitir acesso.

---

# 13. Gerenciamento de Estado

A aplicação utilizará:

- React Hooks.
- Context API.

Não será utilizado Redux ou bibliotecas externas de gerenciamento global.

---

## Justificativa

O projeto possui baixa complexidade de estado.

Os principais estados globais são:

- usuário administrador autenticado;
- token JWT.

Esses estados podem ser facilmente gerenciados utilizando Context API.

Estados específicos de páginas permanecerão utilizando:

- useState;
- useEffect;
- hooks personalizados.

---

# 14. Context API

Será utilizado um contexto de autenticação.

Responsabilidades:

- armazenar usuário autenticado;
- armazenar token JWT;
- controlar login;
- controlar logout;
- proteger rotas administrativas.

Fluxo:

```text
Login

↓

Backend valida usuário

↓

Backend retorna JWT

↓

Frontend armazena token

↓

Context atualiza autenticação

↓

Usuário acessa área administrativa
```

---

# 15. Comunicação Frontend e Backend

A comunicação será realizada através de uma API REST.

Formato das mensagens:

```text
HTTP Request

+

JSON

↓

Express API

↓

JSON Response
```

---

Exemplo:

Requisição de criação de agendamento:

```json
POST /api/appointments

{
  "name": "Carlos Eduardo",
  "phone": "+5511999999999",
  "service": "Consultoria",
  "date": "2026-08-10",
  "time": "10:00"
}
```

Resposta:

```json
{
  "message": "Agendamento realizado com sucesso",
  "appointment": {
    "id": "123",
    "status": "Agendado"
  }
}
```

---

# 16. Arquitetura do Backend

O backend será desenvolvido utilizando:

- Node.js
- Express

Responsabilidades principais:

- Expor API REST.
- Aplicar regras de negócio.
- Validar dados.
- Controlar autenticação.
- Gerenciar comunicação com MongoDB.

---

# 17. Organização do Backend

Estrutura:

```text
backend/

src/

├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
└── server.js
```

---

# 18. Camada de Routes

Responsável por definir os endpoints da aplicação.

Não contém:

- regras de negócio;
- acesso ao banco;
- validações complexas.

Sua responsabilidade é direcionar requisições.

Exemplo:

```text
POST /api/auth/login

        ↓

authController.login()
```

---

# 19. Camada de Controllers

Responsável pela comunicação HTTP.

Responsabilidades:

- receber dados da requisição;
- validar entrada;
- chamar serviços;
- retornar resposta HTTP.

Exemplo:

```text
Request

↓

Controller

↓

Service

↓

Response
```

---

Os controllers devem permanecer pequenos.

Toda regra relacionada ao funcionamento da aplicação deve ser delegada para Services.

---

# 20. Camada de Services

A camada Services concentra as regras de negócio.

Principais responsabilidades:

## Agendamentos

- Criar agendamento.
- Consultar disponibilidade.
- Verificar conflitos.
- Validar telefone ativo.
- Alterar status.
- Cancelar agendamento.
- Excluir registros permitidos.

---

## Autenticação

- Validar credenciais administrativas.
- Gerar token JWT.

---

## Exemplo de fluxo:

```text
Controller

↓

appointmentService.create()

↓

Verifica regras

↓

Salva no MongoDB

↓

Retorna resultado
```

---

# 21. Camada de Models

Responsável pela comunicação com o MongoDB utilizando Mongoose.

Responsabilidades:

- Definir schemas.
- Definir tipos de dados.
- Criar validações estruturais.
- Representar documentos do banco.

---

Não será utilizada uma camada Repository.

Motivo:

O projeto possui baixa complexidade de persistência e o uso de uma abstração adicional aumentaria a quantidade de código sem benefício real para o escopo atual.

---

# 22. Middlewares

Os middlewares serão utilizados para funcionalidades compartilhadas.

Principais middlewares:

## Autenticação JWT

Responsável por:

- verificar existência do token;
- validar token;
- permitir acesso administrativo.

---

## Tratamento de Erros

Responsável por:

- capturar erros;
- padronizar respostas;
- evitar respostas inconsistentes.

---

Fluxo:

```text
Request

↓

Middleware

↓

Controller

↓

Service

↓

Response
```

---

# 23. Fluxo Geral de uma Requisição

Exemplo: criação de agendamento.

```text
Cliente

↓

Frontend React

↓

POST /api/appointments

↓

Express Route

↓

Appointment Controller

↓

Appointment Service

↓

Validação das regras

↓

Mongoose Model

↓

MongoDB

↓

Resposta JSON

↓

Frontend atualiza interface
```

---

# 24. Princípios de Organização do Código

O projeto seguirá os seguintes princípios:

- Controllers não possuem regras de negócio.
- Services concentram regras da aplicação.
- Models representam dados.
- Components representam interface.
- Services frontend representam comunicação externa.
- Código deve priorizar clareza sobre abstrações complexas.

Essa organização permite evolução futura mantendo uma arquitetura simples e adequada ao tamanho da aplicação.

# 25. Arquitetura de Persistência

A aplicação utilizará MongoDB como banco de dados principal.

A comunicação entre a aplicação backend e o banco será realizada utilizando Mongoose como ODM (Object Data Modeling).

A escolha do MongoDB considera:

- Estrutura flexível de documentos.
- Facilidade de implementação.
- Boa integração com Node.js.
- Adequação ao modelo simples de dados da aplicação.

---

# 26. Modelo de Dados

A aplicação utilizará uma única entidade principal:

```text
Appointment
```

Não será criada uma entidade separada para clientes.

---

## Justificativa

O sistema não possui:

- cadastro de clientes;
- login de clientes;
- perfil de usuário;
- histórico independente de clientes.

O cliente existe apenas dentro do contexto de um agendamento.

Por esse motivo, os dados do cliente serão armazenados diretamente no documento de agendamento.

---

# 27. Coleção Appointment

Estrutura esperada:

```javascript
Appointment {
  name: String,
  phone: String,
  service: String,
  date: Date,
  time: String,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

# 28. Campos do Documento

## name

Nome do cliente.

Regras:

- Obrigatório.
- Mínimo de 3 caracteres.
- Máximo de 100 caracteres.
- Espaços extras devem ser removidos.

---

## phone

Telefone do cliente.

Regras:

- Obrigatório.
- Aceita números internacionais.
- Não deve possuir mais de um agendamento ativo.

Estados considerados ativos:

- Agendado.
- Confirmado.

---

## service

Serviço escolhido pelo cliente.

Valores permitidos:

```text
Consultoria
Atendimento
Manutenção
Instalação
Reunião
```

Não haverá cadastro dinâmico de serviços.

---

## date

Data do agendamento.

Regras:

- Não permite datas anteriores ao dia atual.
- Permite datas futuras.
- Limite máximo de 60 dias.

---

## time

Horário selecionado.

Regras:

- Deve estar dentro do expediente.
- Deve respeitar intervalos de 30 minutos.

Horários válidos:

```text
08:00
08:30
09:00
09:30
...
17:30
```

---

## status

Representa o estado atual do agendamento.

Valores possíveis:

```text
Agendado
Confirmado
Concluído
Cancelado
```

---

# 29. Máquina de Estados do Agendamento

Os status seguem um fluxo controlado.

Fluxo permitido:

```text
Agendado

    ↓

Confirmado

    ↓

Concluído
```

---

Fluxo alternativo:

```text
Agendado

    ↓

Cancelado
```

---

Fluxo alternativo:

```text
Confirmado

    ↓

Cancelado
```

---

Estados finais:

## Concluído

Não pode sofrer alterações.

## Cancelado

Não pode retornar para outro status.

---

# 30. Regras de Persistência

A aplicação deve garantir:

- Não criar agendamentos sem dados obrigatórios.
- Não criar agendamentos em horários inválidos.
- Não permitir conflitos de horário.
- Não permitir transições inválidas de status.
- Não permitir exclusão de registros ativos.

---

# 31. Validação de Agendamento

Antes de salvar um novo agendamento, o backend deverá executar as seguintes validações:

Fluxo:

```text
Receber dados

↓

Validar formato

↓

Validar regras de negócio

↓

Verificar disponibilidade

↓

Salvar no banco

↓

Retornar confirmação
```

---

# 32. Controle de Disponibilidade

Um horário será considerado indisponível quando existir um agendamento ativo com:

Mesmo:

- dia;
- horário;

e status:

- Agendado;
- Confirmado.

---

Exemplo:

Banco:

```text
10/08/2026
10:00

Status:
Agendado
```

Novo cliente:

```text
10/08/2026
10:00
```

Resultado:

```text
Horário indisponível
```

---

Agendamentos:

- Cancelados.
- Concluídos.

Não bloqueiam novos horários.

---

# 33. Regra de Telefone Ativo

Antes da criação de um novo agendamento, o sistema deverá verificar:

```text
Existe algum agendamento

com o mesmo telefone

e status:

Agendado ou Confirmado?
```

Caso exista:

```text
Novo agendamento bloqueado.
```

---

Caso não exista:

```text
Novo agendamento permitido.
```

---

Quando um agendamento for:

- Cancelado.
- Concluído.

O telefone poderá realizar um novo agendamento.

---

# 34. Controle de Concorrência

A aplicação utilizará uma estratégia simples de controle de concorrência.

Objetivo:

Evitar que dois clientes reservem o mesmo horário simultaneamente.

---

Fluxo:

```text
Cliente A solicita horário

           |

           ↓

Sistema verifica disponibilidade

           |

           ↓

Salva agendamento


----------------------------


Cliente B solicita mesmo horário

           |

           ↓

Sistema verifica disponibilidade

           |

           ↓

Horário já ocupado

           |

           ↓

Retorna erro
```

---

Mensagem de erro:

```text
Este horário já foi reservado por outro cliente. Escolha outro horário.
```

---

A solução utiliza uma verificação de disponibilidade antes da persistência.

Não serão utilizadas estratégias avançadas de concorrência como:

- Transactions complexas.
- Locks distribuídos.
- Arquiteturas event-driven.

Essas soluções não são necessárias para o escopo atual.

---

# 35. API REST

A comunicação entre frontend e backend será realizada através de uma API REST.

Padrão:

```text
HTTP Request

↓

Express API

↓

JSON Response
```

---

# 36. Organização dos Endpoints

## Autenticação

### Login Administrativo

```http
POST /api/auth/login
```

Responsabilidade:

- Receber usuário e senha.
- Validar credenciais.
- Gerar JWT.

---

## Agendamentos

### Listar Agendamentos

```http
GET /api/appointments
```

Responsabilidade:

- Retornar agendamentos.
- Permitir filtros.
- Permitir ordenação.

---

### Criar Agendamento

```http
POST /api/appointments
```

Responsabilidade:

- Criar novo agendamento.
- Aplicar validações.
- Verificar disponibilidade.

---

### Alterar Status

```http
PATCH /api/appointments/:id/status
```

Responsabilidade:

- Alterar status conforme máquina de estados.
- Impedir transições inválidas.

---

### Excluir Agendamento

```http
DELETE /api/appointments/:id
```

Responsabilidade:

- Excluir definitivamente registros permitidos.

Permitido:

- Cancelado.
- Concluído.

Bloqueado:

- Agendado.
- Confirmado.

---

# 37. Autenticação Administrativa

A autenticação utilizará JWT.

Fluxo:

```text
Administrador

↓

POST /api/auth/login

↓

Backend valida credenciais

↓

Gera JWT

↓

Frontend armazena token

↓

Token enviado nas próximas requisições

↓

Middleware valida acesso
```

---

# 38. Usuário Administrativo

Para o escopo do desafio:

- Existirá apenas um administrador.
- Não haverá cadastro de usuários.
- Credenciais serão definidas no código.
- Não haverá recuperação de senha.

---

# 39. Validação de Dados com Zod

A aplicação utilizará Zod para validação dos dados recebidos.

A validação ocorrerá principalmente no backend.

---

## Motivo

Mesmo que o frontend valide informações para melhorar a experiência do usuário, o backend precisa garantir a integridade dos dados.

---

Validações principais:

## Agendamento

- Nome obrigatório.
- Telefone obrigatório.
- Serviço válido.
- Data válida.
- Horário válido.

---

## Login

- Usuário obrigatório.
- Senha obrigatória.

---

# 40. Tratamento de Respostas da API

A API deverá retornar respostas padronizadas.

Exemplo de sucesso:

```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": {}
}
```

---

Exemplo de erro:

```json
{
  "success": false,
  "message": "Horário indisponível"
}
```

---

Objetivo:

- Facilitar consumo pelo frontend.
- Manter consistência entre endpoints.
- Facilitar manutenção futura.

---

# 41. Fluxo Completo de Criação de Agendamento

```text
Cliente acessa formulário

↓

Seleciona serviço

↓

Seleciona data e horário

↓

Informa nome e telefone

↓

Frontend envia dados

↓

Backend recebe requisição

↓

Zod valida dados

↓

Service verifica regras

↓

Verifica telefone ativo

↓

Verifica disponibilidade

↓

Cria Appointment

↓

MongoDB salva documento

↓

API retorna confirmação

↓

Frontend exibe sucesso
```

---

Esta arquitetura garante que as regras críticas da aplicação sejam centralizadas no backend, mantendo a integridade dos dados e evitando que o frontend seja responsável por decisões de negócio.


# 42. Requisitos Não Funcionais

Além das funcionalidades previstas, a aplicação deve atender aos seguintes requisitos técnicos.

---

# 43. Responsividade

A aplicação deve funcionar corretamente em diferentes tamanhos de tela.

Dispositivos considerados:

- Desktop.
- Tablet.
- Smartphone.

---

O desenvolvimento da interface deve considerar:

- Layout adaptável.
- Componentes reutilizáveis.
- Boa experiência de navegação.
- Formulários acessíveis.
- Tabelas administrativas adaptadas para telas menores.

---

# 44. Organização e Manutenção do Código

O código deve priorizar:

- Clareza.
- Organização.
- Separação de responsabilidades.
- Facilidade de manutenção.

---

Princípios adotados:

## Baixo acoplamento

Frontend e backend devem funcionar de forma independente.

A comunicação deve acontecer exclusivamente através da API REST.

---

## Responsabilidade única

Cada camada deve possuir uma responsabilidade específica.

Exemplo:

```text
Componentes

Responsáveis pela interface.


Services

Responsáveis pelas regras de negócio.


Models

Responsáveis pelos dados.
```

---

## Evitar complexidade desnecessária

Não serão implementados padrões arquiteturais avançados que não tragam benefícios reais para o escopo atual.

Não utilizar:

- Clean Architecture.
- Domain Driven Design.
- Repository Pattern.
- Event Driven Architecture.
- Microservices.

---

# 45. Segurança

Mesmo sendo uma aplicação de pequeno porte, alguns cuidados básicos serão implementados.

---

## Backend

Responsabilidades:

- Validar dados recebidos.
- Proteger rotas administrativas.
- Validar JWT.
- Evitar operações inválidas.
- Controlar permissões administrativas.

---

## Frontend

Responsabilidades:

- Não armazenar informações sensíveis.
- Controlar acesso visual às áreas administrativas.
- Enviar token JWT nas requisições protegidas.

---

# 46. Tratamento de Erros

A aplicação deverá possuir respostas de erro claras e previsíveis.

Principais cenários:

## Dados inválidos

Exemplo:

```text
Nome com menos de 3 caracteres.
```

Resposta:

```text
Dados inválidos.
Verifique as informações enviadas.
```

---

## Horário ocupado

Resposta:

```text
Este horário já foi reservado por outro cliente. Escolha outro horário.
```

---

## Acesso não autorizado

Resposta:

```text
Usuário não autenticado.
```

---

## Operação não permitida

Exemplo:

Tentar excluir um agendamento ativo.

Resposta:

```text
Não é permitido excluir um agendamento ativo.
```

---

# 47. Estratégia de Deploy

A aplicação será distribuída utilizando serviços independentes.

---

## Frontend

Hospedagem:

```text
Vercel
```

Responsabilidade:

- Hospedar aplicação React.
- Gerenciar build.
- Disponibilizar interface pública.

---

## Backend

Hospedagem:

```text
Render ou Railway
```

Responsabilidade:

- Executar API Node.js.
- Disponibilizar endpoints REST.
- Processar regras de negócio.

---

## Banco de Dados

Hospedagem:

```text
MongoDB Atlas
```

Responsabilidade:

- Persistência dos agendamentos.
- Gerenciamento dos dados da aplicação.

---

Fluxo de produção:

```text
Usuário

↓

Vercel

↓

API Node.js

↓

Render/Railway

↓

MongoDB Atlas
```

---

# 48. Variáveis de Ambiente

Informações sensíveis não devem ser armazenadas diretamente no código.

Devem utilizar variáveis de ambiente.

Exemplos:

Backend:

```env
MONGODB_URI=
JWT_SECRET=
ADMIN_USER=
ADMIN_PASSWORD=
PORT=
```

Frontend:

```env
VITE_API_URL=
```

---

# 49. Controle de Escopo

Para evitar aumento desnecessário de complexidade, as seguintes funcionalidades não devem ser adicionadas durante a implementação inicial.

---

## Não implementar:

### Cadastro de clientes

Motivo:

O cliente não possui conta ou perfil.

---

### Login de clientes

Motivo:

Apenas administradores possuem autenticação.

---

### Cadastro de serviços

Motivo:

Os serviços são fixos.

Lista:

- Consultoria.
- Atendimento.
- Manutenção.
- Instalação.
- Reunião.

---

### Sistema de notificações

Não implementar:

- E-mail.
- WhatsApp.
- SMS.

---

### Integrações externas

Não implementar:

- Google Calendar.
- Sistemas externos.
- Webhooks.

---

### Recursos administrativos adicionais

Não implementar:

- Dashboard.
- Relatórios.
- Métricas.
- Gestão de usuários.

---

# 50. Decisões Arquiteturais Consolidadas

Esta seção resume as principais decisões tomadas durante o planejamento.

---

## Arquitetura

Decisão:

Utilizar Monorepo simples.

Estrutura:

```text
frontend/

backend/
```

Motivo:

Simplicidade e facilidade de manutenção.

---

## Frontend

Decisão:

React + Vite.

Organização:

Pastas por tipo.

Motivo:

Adequado ao tamanho da aplicação e rápido desenvolvimento.

---

## Backend

Decisão:

Node.js + Express.

Arquitetura:

```text
Routes

↓

Controllers

↓

Services

↓

Models
```

Motivo:

Separação clara de responsabilidades sem excesso de abstração.

---

## Banco

Decisão:

MongoDB + Mongoose.

Modelo:

Uma única coleção:

```text
appointments
```

Motivo:

O cliente existe somente no contexto do agendamento.

---

## Autenticação

Decisão:

JWT.

Motivo:

Proteger a área administrativa utilizando uma solução simples e conhecida.

---

## Validação

Decisão:

Zod.

Motivo:

Centralizar validações e garantir integridade dos dados.

---

## Estado Frontend

Decisão:

React Hooks + Context API.

Motivo:

Complexidade de estado reduzida.

---

## Testes

Decisão:

Não implementar testes automatizados inicialmente.

Motivo:

Prioridade no prazo de entrega.

Testes ficam como melhoria futura.

---

## Concorrência

Decisão:

Validação simples antes da criação do agendamento.

Motivo:

Atende ao escopo do desafio sem adicionar complexidade.

---

# 51. Melhorias Futuras

As seguintes melhorias podem ser adicionadas em versões futuras.

---

## Testes Automatizados

Adicionar:

- Testes unitários.
- Testes de integração.
- Testes de componentes.

---

## Melhorias de Autenticação

Adicionar:

- Banco de usuários administrativos.
- Recuperação de senha.
- Controle de permissões.

---

## Gestão de Clientes

Adicionar:

- Cadastro de clientes.
- Histórico de atendimentos.
- Perfil do cliente.

---

## Evolução da Agenda

Adicionar:

- Feriados.
- Diferentes durações de serviço.
- Múltiplos profissionais.
- Múltiplas empresas.

---

## Notificações

Adicionar:

- Confirmação por WhatsApp.
- E-mails automáticos.
- Lembretes.

---

# 52. Resumo Final da Arquitetura

A aplicação será construída utilizando uma arquitetura simples, organizada e adequada ao contexto de um desafio técnico.

A solução será composta por:

```text
Frontend

React + Vite


Backend

Node.js + Express


Banco

MongoDB + Mongoose


Autenticação

JWT


Validação

Zod
```

---

O projeto seguirá uma arquitetura em camadas:

```text
Routes

↓

Controllers

↓

Services

↓

Models

↓

MongoDB
```

---

As principais prioridades arquiteturais são:

- Funcionalidade.
- Clareza.
- Organização.
- Facilidade de manutenção.
- Cumprimento das regras de negócio.
- Entrega dentro do prazo.

A arquitetura foi definida evitando complexidade desnecessária e mantendo espaço para evolução futura caso novos requisitos sejam adicionados.
# BUSINESS_RULES.md

# Especificação Funcional da Aplicação de Agendamentos

## 1. Informações do Documento

| Campo           | Valor                                                                              |
| --------------- | ---------------------------------------------------------------------------------- |
| Documento       | Especificação Funcional                                                            |
| Nome do Arquivo | BUSINESS_RULES.md                                                                  |
| Versão          | 1.0                                                                                |
| Status          | Aprovado para implementação                                                        |
| Idioma          | Português (Brasil)                                                                 |
| Objetivo        | Definir regras de negócio, funcionalidades e comportamentos esperados da aplicação |

---

# 2. Objetivo do Sistema

A aplicação tem como objetivo disponibilizar um sistema genérico de gerenciamento de agendamentos, permitindo que clientes realizem reservas de serviços disponíveis e que administradores acompanhem e gerenciem os atendimentos cadastrados.

O sistema deve fornecer uma experiência simples e objetiva para o cliente, permitindo a consulta de horários disponíveis, criação de novos agendamentos e visualização da confirmação da reserva.

Para o administrador, a aplicação deve disponibilizar uma área restrita para gerenciamento dos agendamentos, permitindo acompanhamento dos clientes, filtragem de informações, controle de status e manutenção dos registros.

Este documento representa a fonte oficial das regras funcionais da aplicação, reduzindo ambiguidades durante o desenvolvimento, testes e validação do produto.

---

# 3. Escopo do Sistema

## 3.1 Funcionalidades incluídas

A aplicação contempla dois principais módulos:

## Área do Cliente

O cliente poderá:

* Consultar horários disponíveis para agendamento.
* Selecionar um serviço.
* Informar seus dados pessoais.
* Escolher uma data e horário disponível.
* Confirmar a criação do agendamento.
* Visualizar uma confirmação após o cadastro.

## Área Administrativa

O administrador poderá:

* Realizar autenticação na área administrativa.
* Visualizar todos os agendamentos cadastrados.
* Visualizar informações dos clientes.
* Pesquisar agendamentos.
* Filtrar agendamentos por data.
* Ordenar registros.
* Alterar status dos atendimentos.
* Cancelar agendamentos.
* Excluir definitivamente agendamentos permitidos.

---

# 4. Fora do Escopo

As funcionalidades abaixo não fazem parte desta versão da aplicação:

* Cadastro de clientes.
* Login ou autenticação de clientes.
* Recuperação de senha.
* Edição de agendamentos pelo cliente.
* Edição de informações de agendamentos pelo administrador.
* Criação manual de agendamentos pelo administrador.
* Cadastro dinâmico de serviços.
* Remoção ou alteração dos serviços disponíveis.
* Controle individual de duração dos serviços.
* Controle de preço dos serviços.
* Pagamentos online.
* Integração com WhatsApp.
* Envio de notificações por WhatsApp.
* Envio de e-mails.
* Integração com Google Calendar.
* Controle de múltiplas empresas.
* Controle de múltiplas unidades.
* Controle de múltiplos profissionais.
* Dashboard com indicadores e gráficos.
* Integração automática com feriados.

---

# 5. Visão Geral do Sistema

A aplicação funciona como uma agenda digital simplificada.

O fluxo principal consiste em:

1. O cliente acessa a aplicação.
2. Consulta os horários disponíveis.
3. Escolhe um serviço.
4. Informa seus dados.
5. Seleciona uma data e horário disponível.
6. Finaliza o agendamento.
7. O sistema registra o atendimento com status inicial "Agendado".
8. O administrador acompanha e gerencia o atendimento através da área administrativa.

O sistema deve garantir que um mesmo horário não seja reservado por mais de um agendamento ativo, independentemente do cliente ou serviço escolhido.

---

# 6. Perfis de Usuário (Personas)

## 6.1 Cliente

### Descrição

Usuário externo que deseja realizar o agendamento de um serviço.

### Objetivos

* Encontrar um horário disponível.
* Solicitar atendimento.
* Receber confirmação da reserva.

### Permissões

O cliente pode:

* Criar novos agendamentos.
* Informar seus dados.
* Consultar disponibilidade.

O cliente não pode:

* Visualizar histórico de agendamentos.
* Alterar agendamentos existentes.
* Cancelar agendamentos.
* Acessar a área administrativa.

---

## 6.2 Administrador

### Descrição

Usuário responsável pelo gerenciamento dos agendamentos.

### Objetivos

* Acompanhar os atendimentos.
* Atualizar o andamento dos agendamentos.
* Administrar registros existentes.

### Permissões

O administrador pode:

* Acessar a área administrativa.
* Visualizar agendamentos.
* Consultar dados dos clientes.
* Pesquisar registros.
* Filtrar informações.
* Alterar status permitidos.
* Cancelar agendamentos.
* Excluir registros permitidos.

O administrador não pode:

* Criar agendamentos manualmente.
* Editar dados de um agendamento existente.

---

# 7. Serviços Disponíveis

Os serviços disponíveis são fixos nesta versão da aplicação.

A lista de serviços é:

| Serviço     |
| ----------- |
| Consultoria |
| Atendimento |
| Manutenção  |
| Instalação  |
| Reunião     |

## Regras

* O cliente deve selecionar obrigatoriamente um serviço.
* Cada agendamento permite apenas um serviço.
* Os serviços não possuem valores associados.
* Os serviços não possuem regras individuais de duração.
* Todos os serviços seguem a mesma lógica de disponibilidade de horários.

---

# 8. Decisões de Projeto

Esta seção registra decisões tomadas durante o levantamento de requisitos para evitar interpretações diferentes durante a implementação.

## 8.1 Modelo da aplicação

A aplicação será genérica e não representa uma empresa específica.

---

## 8.2 Estrutura de usuários

O sistema possui dois perfis:

* Cliente.
* Administrador.

Clientes não possuem autenticação.

---

## 8.3 Autenticação administrativa

A autenticação administrativa será simplificada para fins do desafio técnico.

Características:

* Existe apenas um administrador.
* O usuário e senha serão valores fixos definidos no código.
* Não será implementado sistema completo de usuários e permissões.

---

## 8.4 Serviços

Os serviços serão definidos previamente no sistema.

Não será implementado:

* Cadastro de novos serviços.
* Alteração de serviços.
* Exclusão de serviços.

---

## 8.5 Duração dos serviços

Apesar de serviços reais possuírem durações diferentes, esta versão não implementará controle individual de duração.

O sistema considera apenas:

* Serviço escolhido.
* Data.
* Horário.

Não serão criadas regras para:

* Bloqueio de múltiplos horários consecutivos.
* Cálculo de duração.
* Disponibilidade baseada em duração.

---

## 8.6 Precificação

A aplicação não possui controle financeiro.

Não serão implementados:

* Valores de serviços.
* Cálculo de preço.
* Pagamento.

---

## 8.7 Comunicação

A aplicação não realizará comunicação externa.

Não serão enviados:

* E-mails.
* Mensagens via WhatsApp.
* Notificações automáticas.

---

## 8.8 Feriados

O sistema não realizará integração com calendários de feriados.

Dias considerados feriados serão tratados normalmente conforme as regras padrão de funcionamento.

---

## 8.9 Persistência de dados

A tecnologia utilizada para armazenamento dos dados será definida no documento de arquitetura da aplicação.

Este documento concentra apenas regras funcionais e comportamentais.

---

# 9. Glossário Inicial

| Termo              | Definição                                                             |
| ------------------ | --------------------------------------------------------------------- |
| Cliente            | Usuário responsável por solicitar um agendamento                      |
| Administrador      | Usuário responsável pelo gerenciamento dos registros                  |
| Agendamento        | Registro contendo dados do cliente, serviço, data e horário escolhido |
| Serviço            | Tipo de atendimento selecionado pelo cliente                          |
| Horário disponível | Intervalo permitido para criação de novos agendamentos                |
| Horário ocupado    | Horário que já possui um agendamento ativo                            |
| Status             | Estado atual do ciclo de vida de um agendamento                       |
| Cancelamento       | Alteração do status para Cancelado mantendo histórico                 |
| Exclusão           | Remoção definitiva do registro do sistema                             |

---

# Fim da Parte 1


# 10. Área do Cliente

## 10.1 Objetivo

A Área do Cliente permite que usuários externos realizem agendamentos de serviços disponíveis através de um fluxo simples e objetivo.

O cliente deve conseguir consultar horários disponíveis, preencher seus dados, selecionar um serviço e finalizar uma solicitação de atendimento.

A aplicação deve garantir que apenas horários válidos sejam disponibilizados e que não existam conflitos de agenda.

---

# 10.2 Fluxo Principal de Agendamento

O fluxo esperado para criação de um agendamento é:

1. O cliente acessa a área de agendamento.
2. O sistema apresenta os serviços disponíveis.
3. O cliente seleciona um serviço.
4. O cliente informa seus dados pessoais.
5. O cliente seleciona uma data válida.
6. O sistema apresenta os horários disponíveis.
7. O cliente seleciona um horário disponível.
8. O cliente confirma o agendamento.
9. O sistema valida as informações.
10. O sistema cria o agendamento.
11. O sistema atribui automaticamente o status inicial "Agendado".
12. O sistema exibe uma confirmação de sucesso.

---

# 10.3 Funcionalidade: Criar Agendamento

## Descrição

Permitir que o cliente registre um novo agendamento informando seus dados pessoais, serviço desejado, data e horário.

---

## Dados necessários

Para criar um agendamento, o cliente deve informar:

| Campo    | Obrigatório |
| -------- | ----------- |
| Nome     | Sim         |
| Telefone | Sim         |
| Serviço  | Sim         |
| Data     | Sim         |
| Horário  | Sim         |

---

# 10.4 Regras de Negócio - Criação de Agendamento

## RN-CLI-001 - Obrigatoriedade dos dados

Todos os campos necessários para criação do agendamento devem ser preenchidos.

Caso algum campo obrigatório não seja informado, o sistema deve impedir o envio do formulário.

---

## RN-CLI-002 - Status inicial

Todo novo agendamento criado pelo cliente deve possuir automaticamente o status:

```
Agendado
```

O cliente não pode definir ou alterar o status manualmente.

---

## RN-CLI-003 - Seleção de serviço

O cliente deve selecionar exatamente um serviço disponível.

Serviços disponíveis:

* Consultoria
* Atendimento
* Manutenção
* Instalação
* Reunião

---

## RN-CLI-004 - Apenas horários disponíveis podem ser selecionados

O sistema deve apresentar ao cliente somente horários livres.

Horários que possuem agendamentos ativos não podem ser selecionados.

---

## RN-CLI-005 - Bloqueio de conflito de horário

Caso dois clientes tentem reservar o mesmo horário simultaneamente:

* O primeiro agendamento salvo será mantido.
* O segundo cliente receberá uma mensagem informando que o horário já foi reservado.

Mensagem padrão:

```
Este horário já foi reservado por outro cliente. Escolha outro horário.
```

---

# 10.5 Validações dos Dados do Cliente

## Nome

Regras:

* Campo obrigatório.
* Deve possuir no mínimo 3 caracteres.
* Deve possuir no máximo 100 caracteres.
* Espaços extras devem ser removidos automaticamente.

Exemplo:

Entrada:

```
Carlos     Eduardo
```

Resultado esperado:

```
Carlos Eduardo
```

Não devem ser aplicadas outras regras de validação.

---

## Telefone

Regras:

* Campo obrigatório.
* Aceita números de qualquer país.
* Será utilizado para identificar agendamentos existentes do cliente.

---

## Serviço

Regras:

* Campo obrigatório.
* Deve pertencer à lista fixa de serviços disponíveis.

---

## Data

Regras:

* Campo obrigatório.
* Permite agendamento para a data atual.
* Permite agendamento para datas futuras.
* Não permite datas anteriores ao dia atual.
* Permite agendamentos somente até 60 dias a partir da data atual.

---

## Horário

Regras:

* Campo obrigatório.
* Deve estar dentro do horário de funcionamento.
* Deve respeitar os intervalos definidos.
* Não pode estar ocupado.

---

# 10.6 Regras de Disponibilidade de Horários

## Horário de funcionamento

A agenda funciona:

```
Segunda-feira a Sexta-feira

08:00 às 18:00
```

O último horário disponível para agendamento é:

```
17:30
```

O horário:

```
18:00
```

representa apenas o encerramento do expediente e não pode ser selecionado.

---

## Intervalo dos horários

Os horários disponíveis possuem intervalo fixo de:

```
30 minutos
```

Exemplo:

```
08:00
08:30
09:00
09:30
...
17:00
17:30
```

---

## Dias disponíveis

O sistema permite agendamento somente nos dias:

* Segunda-feira
* Terça-feira
* Quarta-feira
* Quinta-feira
* Sexta-feira

Sábados e domingos não possuem horários disponíveis.

---

## Feriados

O sistema não realiza validação de feriados.

Caso uma data de funcionamento coincida com um feriado, ela seguirá as mesmas regras de disponibilidade.

---

# 10.7 Regra de Agendamentos por Cliente

## Descrição

O sistema deve permitir que um mesmo cliente realize múltiplos agendamentos, desde que não existam duplicidades de atendimento ou conflitos de horário.

O telefone informado será utilizado como identificador do cliente para verificar agendamentos existentes.

---

## RN-CLI-006 - Permitir múltiplos agendamentos

Um mesmo cliente poderá possuir mais de um agendamento ativo, desde que sejam respeitadas as regras abaixo:

* O novo agendamento não pode possuir o mesmo serviço de outro agendamento ativo do cliente.
* O novo agendamento não pode possuir a mesma data e horário de outro agendamento ativo do cliente.

São considerados agendamentos ativos:

* Agendado.
* Confirmado.

---

## RN-CLI-007 - Bloqueio de duplicidade do mesmo serviço

O sistema deve impedir que um cliente crie um novo agendamento para o mesmo serviço enquanto existir outro agendamento ativo desse mesmo serviço.

Exemplo:

Agendamento existente:

```
Cliente: Carlos
Serviço: Consultoria
Data: 10/08/2026
Horário: 10:00
Status: Agendado
```

Tentativa:

```
Cliente: Carlos
Serviço: Consultoria
Data: 15/08/2026
Horário: 14:00
```

Resultado:

```
Agendamento bloqueado.
```

---

## RN-CLI-008 - Permitir serviços diferentes

O sistema deve permitir que o mesmo cliente possua agendamentos ativos para serviços diferentes.

Exemplo:

Agendamento existente:

```
Serviço: Consultoria
Data: 10/08/2026
Horário: 10:00
```

Novo agendamento:

```
Serviço: Manutenção
Data: 15/08/2026
Horário: 14:00
```

Resultado:

```
Agendamento permitido.
```

---

## RN-CLI-009 - Bloqueio de conflito de horário do mesmo cliente

Independentemente do serviço escolhido, um cliente não pode possuir dois agendamentos ativos para a mesma data e horário.

Exemplo:

Agendamento existente:

```
Serviço: Consultoria
Data: 10/08/2026
Horário: 10:00
```

Tentativa:

```
Serviço: Manutenção
Data: 10/08/2026
Horário: 10:00
```

Resultado:

```
Agendamento bloqueado.
```

---

## RN-CLI-010 - Cancelamento e conclusão liberam novos agendamentos

Agendamentos com status:

* Cancelado.
* Concluído.

Não devem impedir novos agendamentos do mesmo cliente.

---

# 10.8 Confirmação do Agendamento

Após a criação bem-sucedida:

O sistema deve:

* Salvar o agendamento.
* Definir o status como "Agendado".
* Exibir uma mensagem de sucesso.

Não será enviado:

* WhatsApp.
* E-mail.
* Notificação externa.

---

# 10.9 Caso de Uso - Realizar Agendamento

## UC-CLI-001 - Criar novo agendamento

### Ator principal

Cliente.

### Pré-condições

* Cliente acessa a página de agendamento.
* Existem horários disponíveis.

### Fluxo principal

1. Cliente seleciona um serviço.
2. Cliente informa nome.
3. Cliente informa telefone.
4. Cliente escolhe uma data.
5. Sistema apresenta horários disponíveis.
6. Cliente seleciona um horário.
7. Cliente confirma o formulário.
8. Sistema valida os dados.
9. Sistema cria o agendamento.
10. Sistema apresenta confirmação.

### Pós-condições

* Novo registro criado.
* Status definido como "Agendado".
* Horário reservado.

---

# 10.10 Critérios de Aceitação - Área do Cliente

## CA-CLI-001 - Criar agendamento válido

```gherkin
Dado que existem horários disponíveis

Quando o cliente preencher nome, telefone, serviço, data e horário válidos

Então o sistema deve criar um novo agendamento

E o status inicial deve ser "Agendado"
```

---

## CA-CLI-002 - Impedir campos obrigatórios vazios

```gherkin
Dado que o cliente está preenchendo o formulário

Quando algum campo obrigatório não for informado

Então o sistema deve impedir o envio

E informar que existem campos obrigatórios pendentes
```

---

## CA-CLI-003 - Impedir horário ocupado

```gherkin
Dado que existe um agendamento ativo para determinado horário

Quando outro cliente tentar selecionar o mesmo horário

Então o horário não deve estar disponível para seleção
```

---

## CA-CLI-004 - Conflito durante salvamento

```gherkin
Dado que dois clientes tentam reservar o mesmo horário simultaneamente

Quando um deles salvar primeiro

Então o segundo cliente deve receber a mensagem:

"Este horário já foi reservado por outro cliente. Escolha outro horário."
```

---

## CA-CLI-005 - Bloquear data anterior

```gherkin
Dado que o cliente está escolhendo uma data

Quando selecionar uma data anterior ao dia atual

Então o sistema deve impedir o agendamento
```

---

## CA-CLI-006 - Permitir reutilização de horário cancelado

```gherkin
Dado que existe um agendamento cancelado

Quando o cliente consultar os horários disponíveis

Então o horário cancelado deve estar disponível novamente
```

---

# Fim da Parte 2


# 11. Área Administrativa

## 11.1 Objetivo

A Área Administrativa permite que o administrador acompanhe e gerencie os agendamentos realizados pelos clientes.

O administrador possui acesso a uma visão geral dos atendimentos cadastrados, podendo consultar informações dos clientes, acompanhar o andamento dos agendamentos e atualizar os respectivos status conforme as regras definidas.

---

# 11.2 Acesso Administrativo

## Descrição

A aplicação possui uma área administrativa protegida por autenticação.

Para fins deste desafio técnico, será utilizada uma autenticação simplificada.

---

## Regras de Negócio

### RN-ADM-001 - Existência de administrador único

O sistema possui apenas um administrador.

Não será implementado:

* Cadastro de administradores.
* Múltiplos usuários administrativos.
* Controle de permissões.

---

### RN-ADM-002 - Autenticação simplificada

O acesso administrativo será realizado através de:

* Usuário fixo.
* Senha fixa.

As credenciais serão definidas diretamente no código da aplicação.

---

### RN-ADM-003 - Área administrativa protegida

Usuários não autenticados não devem acessar funcionalidades administrativas.

---

# 11.3 Visualização de Agendamentos

## Descrição

O administrador deve conseguir visualizar todos os agendamentos registrados no sistema.

---

## Informações exibidas

Cada agendamento deve apresentar:

* Nome do cliente.
* Telefone do cliente.
* Serviço escolhido.
* Data do agendamento.
* Horário do agendamento.
* Status atual.

---

## Regras de Negócio

### RN-ADM-004 - Listagem completa

O administrador deve visualizar todos os registros existentes, independentemente do status.

Devem aparecer agendamentos:

* Agendados.
* Confirmados.
* Concluídos.
* Cancelados.

---

### RN-ADM-005 - Ordenação padrão

Ao acessar a listagem de agendamentos, os registros devem ser apresentados inicialmente por:

```text
Data decrescente
```

Ou seja:

* Agendamentos mais recentes aparecem primeiro.
* Agendamentos antigos aparecem posteriormente.

---

# 11.4 Pesquisa de Agendamentos

## Descrição

O administrador pode localizar agendamentos utilizando informações do cliente.

---

## Pesquisa por nome

Regras:

* A pesquisa deve aceitar correspondência parcial.
* A pesquisa não deve diferenciar letras maiúsculas e minúsculas.

Exemplo:

Busca:

```text
carl
```

Deve encontrar:

```text
Carlos
CARLOS
Carlos Eduardo
```

---

## Pesquisa por telefone

Regras:

* A pesquisa deve aceitar correspondência parcial.
* A pesquisa não deve diferenciar formatos de entrada.

---

## RN-ADM-006 - Pesquisa combinada

Caso sejam informados filtros de pesquisa, o sistema deve retornar apenas registros compatíveis com os critérios informados.

---

# 11.5 Filtros e Ordenação

## Filtro por data

O administrador deve conseguir filtrar agendamentos por data.

---

## Ordenações disponíveis

O administrador poderá ordenar os registros por:

* Data.
* Horário.
* Status.

---

## Regras

### RN-ADM-007 - Atualização da listagem

Após aplicar filtros ou ordenação, a listagem deve refletir imediatamente os critérios selecionados.

---

# 11.6 Alteração de Status do Agendamento

## Descrição

O administrador é responsável por atualizar o andamento dos atendimentos através dos status disponíveis.

---

## Status disponíveis

O sistema possui quatro estados:

| Status     | Descrição                                                |
| ---------- | -------------------------------------------------------- |
| Agendado   | Atendimento criado pelo cliente e aguardando confirmação |
| Confirmado | Atendimento validado pelo administrador                  |
| Concluído  | Atendimento realizado                                    |
| Cancelado  | Atendimento cancelado                                    |

---

# 11.7 Regras de Transição de Status

As alterações de status devem seguir obrigatoriamente o fluxo definido.

## Fluxo permitido

```text
Agendado
    ↓
Confirmado
    ↓
Concluído
```

Fluxos alternativos:

```text
Agendado
    ↓
Cancelado
```

```text
Confirmado
    ↓
Cancelado
```

---

## Matriz de permissões

| Status Atual | Status Permitidos     |
| ------------ | --------------------- |
| Agendado     | Confirmado, Cancelado |
| Confirmado   | Concluído, Cancelado  |
| Concluído    | Nenhum                |
| Cancelado    | Nenhum                |

---

# 11.8 Regras de Status

## RN-ADM-008 - Status inicial

Todo novo agendamento criado pelo cliente inicia como:

```text
Agendado
```

---

## RN-ADM-009 - Bloqueio de transições inválidas

O sistema não deve permitir alterações de status fora das regras definidas.

Exemplos proibidos:

* Agendado → Concluído.
* Confirmado → Agendado.
* Cancelado → Agendado.
* Concluído → Confirmado.

---

## RN-ADM-010 - Estado final concluído

O status:

```text
Concluído
```

é considerado definitivo.

Após concluído, o agendamento não pode ter seu status alterado.

---

## RN-ADM-011 - Estado final cancelado

O status:

```text
Cancelado
```

é considerado definitivo.

Após cancelado, o agendamento não pode retornar para outro status.

---

# 11.9 Cancelamento de Agendamentos

## Descrição

O administrador pode cancelar agendamentos ativos.

---

## Regras

O cancelamento:

* Altera o status para "Cancelado".
* Mantém o registro no sistema.
* Mantém o histórico do atendimento.
* Libera novamente o horário para novos agendamentos.

---

## RN-ADM-012 - Cancelamento permitido

Podem ser cancelados:

* Agendamentos com status Agendado.
* Agendamentos com status Confirmado.

---

## RN-ADM-013 - Cancelamento proibido

Não podem ser cancelados:

* Agendamentos Concluídos.
* Agendamentos já Cancelados.

---

# 11.10 Exclusão Definitiva de Agendamentos

## Descrição

A exclusão remove permanentemente um agendamento do banco de dados.

---

## Regras

A exclusão definitiva é permitida somente para:

* Agendamentos Cancelados.
* Agendamentos Concluídos.

---

## RN-ADM-014 - Restrição de exclusão

O sistema não deve permitir exclusão definitiva de agendamentos com status:

* Agendado.
* Confirmado.

---

## RN-ADM-015 - Comportamento da exclusão

Quando um agendamento é excluído:

* O registro desaparece imediatamente da listagem.
* Não pode ser recuperado.
* O horário volta a ficar disponível caso ainda esteja dentro das regras de disponibilidade.

---

# 11.11 Caso de Uso - Gerenciar Agendamentos

## UC-ADM-001 - Administrar agendamentos

### Ator principal

Administrador.

### Pré-condições

* Administrador autenticado.

### Fluxo principal

1. Administrador acessa a área administrativa.
2. Sistema apresenta os agendamentos.
3. Administrador consulta informações.
4. Administrador aplica filtros ou pesquisas.
5. Administrador altera status quando permitido.
6. Administrador pode cancelar ou excluir registros conforme regras.

### Pós-condições

* Informações atualizadas.
* Histórico preservado quando aplicável.

---

# 11.12 Critérios de Aceitação - Área Administrativa

## CA-ADM-001 - Login administrativo válido

```gherkin
Dado que o administrador possui credenciais válidas

Quando informar usuário e senha corretos

Então o sistema deve permitir acesso à área administrativa
```

---

## CA-ADM-002 - Visualizar agendamentos

```gherkin
Dado que existem agendamentos cadastrados

Quando o administrador acessar a listagem

Então o sistema deve apresentar todos os registros existentes
```

---

## CA-ADM-003 - Alterar status permitido

```gherkin
Dado que existe um agendamento com status "Agendado"

Quando o administrador alterar o status para "Confirmado"

Então o sistema deve permitir a alteração
```

---

## CA-ADM-004 - Bloquear alteração inválida

```gherkin
Dado que existe um agendamento com status "Concluído"

Quando o administrador tentar alterar o status

Então o sistema deve impedir a alteração
```

---

## CA-ADM-005 - Cancelar agendamento

```gherkin
Dado que existe um agendamento com status "Confirmado"

Quando o administrador cancelar o atendimento

Então o status deve ser alterado para "Cancelado"

E o registro deve permanecer salvo
```

---

## CA-ADM-006 - Excluir agendamento permitido

```gherkin
Dado que existe um agendamento com status "Cancelado"

Quando o administrador excluir o registro

Então o agendamento deve ser removido definitivamente
```

---

## CA-ADM-007 - Impedir exclusão de agendamento ativo

```gherkin
Dado que existe um agendamento com status "Agendado"

Quando o administrador tentar excluir o registro

Então o sistema deve impedir a exclusão
```

---

# Fim da Parte 3



# 12. Regras Gerais do Sistema

## 12.1 Objetivo

Esta seção define regras que possuem impacto geral na aplicação, independentemente do perfil de usuário.

Estas regras garantem consistência dos dados, integridade dos agendamentos e comportamento previsível do sistema.

---

# 12.2 Regras de Disponibilidade

## RN-GEN-001 - Controle único de agenda

A aplicação possui uma única agenda compartilhada.

Todos os serviços utilizam a mesma disponibilidade de horários.

Não existe separação de agenda por:

* Serviço.
* Cliente.
* Profissional.
* Unidade.

---

## RN-GEN-002 - Horários disponíveis

Os horários disponíveis devem respeitar:

* Dias úteis.
* Horário de funcionamento.
* Intervalo definido.
* Ausência de agendamentos ativos.

---

## RN-GEN-003 - Expediente

O funcionamento da agenda ocorre:

```text
Segunda-feira a Sexta-feira

08:00 até 18:00
```

O último horário permitido para agendamento é:

```text
17:30
```

O horário 18:00 representa apenas o encerramento do expediente.

---

## RN-GEN-004 - Intervalos

Os horários devem possuir intervalos fixos de:

```text
30 minutos
```

Exemplo:

```text
08:00
08:30
09:00
09:30
10:00
```

---

## RN-GEN-005 - Datas permitidas

O sistema permite:

* Agendamento na data atual.
* Agendamento em datas futuras.

O sistema não permite:

* Datas anteriores ao dia atual.
* Datas superiores a 60 dias a partir da data atual.

---

## RN-GEN-006 - Horários passados

Horários que já passaram no dia atual não devem ser apresentados como disponíveis.

---

# 12.3 Regras de Disponibilidade e Conflito

## RN-GEN-007 - Reserva única de horário

Um horário não pode possuir mais de um agendamento ativo simultaneamente.

São considerados ativos:

* Agendado.
* Confirmado.

Agendamentos com status:

* Cancelado.
* Concluído.

não bloqueiam novos agendamentos.

---

## RN-GEN-008 - Controle de disputa

Quando dois clientes tentarem reservar o mesmo horário simultaneamente:

* O primeiro salvamento válido deve permanecer.
* O segundo salvamento deve ser recusado.

Mensagem apresentada:

```text
Este horário já foi reservado por outro cliente. Escolha outro horário.
```

---

# 12.4 Regras de Cliente e Agendamento

## RN-GEN-009 - Identificação do cliente

O telefone informado pelo cliente será utilizado como identificador para localizar seus agendamentos existentes.

O telefone não representa uma restrição de cadastro único.

Um mesmo cliente pode possuir múltiplos agendamentos ativos, desde que respeite as regras definidas na Área do Cliente.

---

## RN-GEN-010 - Controle de duplicidade por cliente

O sistema deve impedir apenas situações de duplicidade relacionadas ao mesmo cliente.

Não são permitidos:

* Dois agendamentos ativos para o mesmo serviço do mesmo cliente.
* Dois agendamentos ativos do mesmo cliente para a mesma data e horário.

São permitidos:

* Agendamentos de serviços diferentes em horários diferentes.
* Novos agendamentos após cancelamento ou conclusão de atendimentos anteriores.

---

# 12.5 Regras de Histórico

## RN-GEN-011 - Preservação de registros

Cancelamentos não removem informações do sistema.

Um agendamento cancelado deve permanecer disponível para consulta administrativa.

---

## RN-GEN-012 - Exclusão definitiva

A exclusão remove permanentemente o registro.

Após a exclusão:

* O registro não pode ser recuperado.
* O histórico é perdido.
* O horário pode voltar a ficar disponível caso ainda esteja dentro do período permitido para agendamento.

---

# 13. Regras de Exceção

## 13.1 Tentativa de agendamento em horário ocupado

### Situação

O cliente tenta reservar um horário que foi ocupado por outro usuário.

### Comportamento esperado

O sistema deve:

* Impedir a criação do agendamento.
* Informar que o horário não está mais disponível.
* Solicitar escolha de outro horário.

---

## 13.2 Dados obrigatórios ausentes

### Situação

O cliente tenta finalizar o formulário sem preencher informações obrigatórias.

### Comportamento esperado

O sistema deve:

* Impedir o envio.
* Informar os campos pendentes.

---

## 13.3 Data inválida

### Situação

O cliente seleciona uma data anterior ao dia atual.

### Comportamento esperado

O sistema deve:

* Impedir o agendamento.
* Solicitar uma nova data válida.

---

## 13.4 Tentativa de duplicidade de agendamento do cliente

### Situação

O cliente tenta criar um novo agendamento que viola as regras de duplicidade.

Exemplos:

* Mesmo serviço de um agendamento ativo existente.
* Mesmo dia e horário de outro agendamento ativo.

### Comportamento esperado

O sistema deve:

* Bloquear o novo agendamento.
* Informar o motivo do bloqueio.
* Solicitar escolha de outra opção.

---

## 13.5 Alteração inválida de status

### Situação

O administrador tenta alterar um status fora das regras permitidas.

### Comportamento esperado

O sistema deve:

* Bloquear a alteração.
* Manter o status atual.

---

# 14. Requisitos Funcionais (RF)

Os requisitos funcionais representam comportamentos que o sistema deve obrigatoriamente possuir.

---

## RF-001 - Criar agendamento

O sistema deve permitir que clientes criem novos agendamentos informando:

* Nome.
* Telefone.
* Serviço.
* Data.
* Horário.

---

## RF-002 - Consultar disponibilidade

O sistema deve apresentar horários disponíveis conforme as regras definidas.

---

## RF-003 - Bloquear horários ocupados

O sistema deve impedir seleção de horários que possuem agendamentos ativos.

---

## RF-004 - Confirmar criação

O sistema deve apresentar uma confirmação após o cadastro bem-sucedido.

---

## RF-005 - Autenticar administrador

O sistema deve permitir acesso administrativo através de credenciais válidas.

---

## RF-006 - Listar agendamentos

O administrador deve visualizar todos os agendamentos cadastrados.

---

## RF-007 - Visualizar dados do cliente

O administrador deve visualizar informações relacionadas ao cliente.

---

## RF-008 - Pesquisar agendamentos

O administrador deve conseguir pesquisar por:

* Nome.
* Telefone.

---

## RF-009 - Filtrar agendamentos

O administrador deve conseguir filtrar registros por data.

---

## RF-010 - Ordenar agendamentos

O administrador deve conseguir ordenar registros por:

* Data.
* Horário.
* Status.

---

## RF-011 - Alterar status

O administrador deve conseguir alterar o status respeitando as regras de transição.

---

## RF-012 - Cancelar agendamento

O administrador deve conseguir cancelar atendimentos permitidos.

---

## RF-013 - Excluir agendamento

O administrador deve conseguir excluir definitivamente registros permitidos.

---

# 15. Requisitos Não Funcionais (RNF)

## RNF-001 - Responsividade

A aplicação deve possuir interface responsiva.

O sistema deve funcionar adequadamente em:

* Computadores.
* Tablets.
* Smartphones.

---

## RNF-002 - Organização do código

O projeto deve possuir estrutura organizada, facilitando:

* Manutenção.
* Evolução.
* Leitura do código.

---

## RNF-003 - Validação de dados

As informações fornecidas pelos usuários devem possuir validações antes de serem armazenadas.

---

## RNF-004 - Integridade dos dados

O sistema deve impedir inconsistências relacionadas a:

* Horários duplicados.
* Status inválidos.
* Dados obrigatórios ausentes.
* Regras de duplicidade por cliente.

---

## RNF-005 - Experiência do usuário

A aplicação deve apresentar mensagens claras para orientar o usuário durante suas ações.

---

## RNF-006 - Persistência

Os dados devem permanecer armazenados após encerramento da aplicação.

A tecnologia utilizada será definida no documento de arquitetura.

---

# 16. Glossário Consolidado

| Termo                 | Definição                                                                            |
| --------------------- | ------------------------------------------------------------------------------------ |
| Agendamento           | Registro de uma solicitação de atendimento contendo cliente, serviço, data e horário |
| Cliente               | Usuário que realiza um pedido de agendamento                                         |
| Administrador         | Usuário responsável pelo gerenciamento dos atendimentos                              |
| Serviço               | Tipo de atendimento escolhido pelo cliente                                           |
| Status                | Estado atual de um agendamento                                                       |
| Agendado              | Status inicial atribuído automaticamente após criação                                |
| Confirmado            | Status utilizado quando o administrador valida o atendimento                         |
| Concluído             | Estado final indicando que o atendimento foi realizado                               |
| Cancelado             | Estado final indicando que o atendimento foi cancelado                               |
| Horário disponível    | Horário permitido para criação de novos agendamentos                                 |
| Horário ocupado       | Horário vinculado a um agendamento ativo                                             |
| Cancelamento          | Alteração de status mantendo o histórico                                             |
| Exclusão              | Remoção permanente do registro                                                       |
| Agendamento ativo     | Agendamento com status Agendado ou Confirmado                                        |
| Critério de aceitação | Condição utilizada para validar se uma funcionalidade atende ao esperado             |

---

# 17. Considerações Finais

Este documento representa a especificação funcional oficial da aplicação de agendamentos.

Todas as regras descritas devem ser consideradas como referência durante:

* Desenvolvimento.
* Implementação das funcionalidades.
* Criação de testes.
* Validação do produto.
* Revisão do projeto.

Qualquer alteração futura de comportamento deve ser avaliada e registrada para manter a consistência da documentação.

---

# Fim do Documento

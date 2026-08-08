export const TIMEZONE = 'America/Sao_Paulo';

export const SERVICES = [
  'Consultoria',
  'Atendimento',
  'Manutenção',
  'Instalação',
  'Reunião',
];

export const STATUSES = ['Agendado', 'Confirmado', 'Concluído', 'Cancelado'];

export const ACTIVE_STATUSES = ['Agendado', 'Confirmado'];

export const STATUS_TRANSITIONS = {
  Agendado: ['Confirmado', 'Cancelado'],
  Confirmado: ['Concluído', 'Cancelado'],
  Concluído: [],
  Cancelado: [],
};

export const WORK_START = '08:00';
export const WORK_END = '18:00';
export const LAST_SLOT = '17:30';
export const SLOT_INTERVAL_MINUTES = 30;
export const MAX_BOOKING_DAYS = 60;

export const SORT_FIELDS = ['date', 'time', 'status'];

export const MESSAGES = {
  SLOT_TAKEN:
    'Este horário já foi reservado por outro cliente. Escolha outro horário.',
  PHONE_ACTIVE:
    'Este telefone já possui um agendamento ativo.\nFinalize ou cancele o agendamento atual antes de criar um novo.',
  UNAUTHORIZED: 'Usuário não autenticado.',
  DELETE_ACTIVE: 'Não é permitido excluir um agendamento ativo.',
  INVALID_STATUS: 'Transição de status não permitida.',
  NOT_FOUND: 'Agendamento não encontrado.',
  INVALID_DATA: 'Dados inválidos. Verifique as informações enviadas.',
  APPOINTMENT_CREATED: 'Agendamento realizado com sucesso',
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  STATUS_UPDATED: 'Status atualizado com sucesso',
  APPOINTMENT_DELETED: 'Agendamento excluído com sucesso',
  INVALID_DATE: 'Data inválida para agendamento.',
  INVALID_TIME: 'Horário inválido para agendamento.',
  WEEKEND: 'Agendamentos disponíveis apenas de segunda a sexta-feira.',
};

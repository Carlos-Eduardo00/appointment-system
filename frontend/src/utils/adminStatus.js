export const STATUS_TRANSITIONS = {
  Agendado: ['Confirmado', 'Cancelado'],
  Confirmado: ['Concluído', 'Cancelado'],
  Concluído: [],
  Cancelado: [],
};

export const STATUS_LABELS = {
  Agendado: 'Agendado',
  Confirmado: 'Confirmado',
  Concluído: 'Concluído',
  Cancelado: 'Cancelado',
};

export const STATUS_ACTIONS = {
  Confirmado: { label: 'Confirmar', className: 'btn-success' },
  Concluído: { label: 'Concluir', className: 'btn-success' },
  Cancelado: { label: 'Cancelar', className: 'btn-danger' },
};

export function getAllowedStatusActions(status) {
  return (STATUS_TRANSITIONS[status] || []).map((nextStatus) => ({
    status: nextStatus,
    ...STATUS_ACTIONS[nextStatus],
  }));
}

export function canDeleteAppointment(status) {
  return status === 'Cancelado' || status === 'Concluído';
}

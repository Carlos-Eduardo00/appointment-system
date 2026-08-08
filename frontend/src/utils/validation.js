import { SERVICES } from '../constants/appointment.js';
import { isWeekendDate } from './date.js';
import { normalizeName, validateBrazilianPhone } from './phone.js';

export function validateBookingForm(form) {
  const errors = {};
  const name = normalizeName(form.name || '');

  if (!name) {
    errors.name = 'Nome é obrigatório.';
  } else if (name.length < 3) {
    errors.name = 'Nome deve ter no mínimo 3 caracteres.';
  } else if (name.length > 100) {
    errors.name = 'Nome deve ter no máximo 100 caracteres.';
  }

  if (!form.phone?.trim()) {
    errors.phone = 'Telefone é obrigatório.';
  } else {
    const phoneError = validateBrazilianPhone(form.phone);
    if (phoneError) {
      errors.phone = phoneError;
    }
  }

  if (!form.service) {
    errors.service = 'Selecione um serviço.';
  } else if (!SERVICES.includes(form.service)) {
    errors.service = 'Serviço inválido.';
  }

  if (!form.date) {
    errors.date = 'Data é obrigatória.';
  } else if (isWeekendDate(form.date)) {
    errors.date = 'Agendamentos disponíveis apenas de segunda a sexta-feira.';
  }

  if (!form.time) {
    errors.time = 'Selecione um horário disponível.';
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}

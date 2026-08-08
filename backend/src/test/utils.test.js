import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  addDaysToDateString,
  generateTimeSlots,
  getTodayString,
  isDateWithinBookingWindow,
  isValidTimeSlot,
  isWeekday,
} from '../utils/dateTime.js';
import { normalizeName, normalizePhone } from '../utils/phone.js';

describe('Utilitários de telefone', () => {
  it('normaliza telefone brasileiro com máscara', () => {
    const result = normalizePhone('(11) 99999-9999');
    assert.equal(result.value, '11999999999');
  });

  it('rejeita formato internacional', () => {
    const result = normalizePhone('+55 11 99999-9999');
    assert.ok(result.error);
  });
});

describe('Utilitários de data e horário', () => {
  it('gera slots de 30 minutos até 17:30', () => {
    const slots = generateTimeSlots();
    assert.equal(slots[0], '08:00');
    assert.equal(slots.at(-1), '17:30');
    assert.equal(slots.length, 20);
  });

  it('valida horário dentro do expediente', () => {
    assert.equal(isValidTimeSlot('10:00'), true);
    assert.equal(isValidTimeSlot('18:00'), false);
  });

  it('valida janela de agendamento de 60 dias', () => {
    const today = getTodayString();
    assert.equal(isDateWithinBookingWindow(today), true);
    assert.equal(isDateWithinBookingWindow(addDaysToDateString(today, 61)), false);
  });

  it('identifica dias úteis', () => {
    assert.equal(typeof isWeekday(getTodayString()), 'boolean');
  });
});

describe('Utilitários de nome', () => {
  it('remove espaços extras do nome', () => {
    assert.equal(normalizeName('Carlos     Eduardo'), 'Carlos Eduardo');
  });
});

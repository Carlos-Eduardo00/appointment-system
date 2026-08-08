import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, describe, it } from 'node:test';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createApp } from '../app.js';
import { Appointment } from '../models/Appointment.js';
import {
  addDaysToDateString,
  getTodayString,
  isWeekday,
} from '../utils/dateTime.js';

const envPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../.env',
);

dotenv.config({ path: envPath });

function hasDatabaseConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

function findNextWeekday(startDate = getTodayString()) {
  let date = startDate;

  for (let index = 0; index < 14; index += 1) {
    if (isWeekday(date)) {
      return date;
    }
    date = addDaysToDateString(date, 1);
  }

  throw new Error('Não foi possível encontrar um dia útil para teste.');
}

describe('API de agendamentos (integração)', () => {
  let server;
  let baseUrl;
  let token;
  let weekdayDate;
  let primaryTime;
  let secondaryTime;
  let tertiaryTime;
  let testPhonePrimary;
  let testPhoneSecondary;
  let createdAppointmentIds = [];

  async function findWeekdayWithAvailability() {
    let date = getTodayString();

    for (let index = 0; index < 14; index += 1) {
      if (isWeekday(date)) {
        const response = await fetch(
          `${baseUrl}/api/appointments/available?date=${date}`,
        );
        const body = await response.json();

        if (body.data?.times?.length >= 3) {
          return {
            date,
            times: body.data.times,
          };
        }
      }

      date = addDaysToDateString(date, 1);
    }

    throw new Error('Não foi possível encontrar horários disponíveis para teste.');
  }

  before(async () => {
    if (!hasDatabaseConfigured()) {
      throw new Error('MONGODB_URI não configurada em backend/.env');
    }

    if (!process.env.JWT_SECRET) {
      process.env.JWT_SECRET = 'test-secret';
    }
    if (!process.env.ADMIN_USER) {
      process.env.ADMIN_USER = 'admin';
    }
    if (!process.env.ADMIN_PASSWORD) {
      process.env.ADMIN_PASSWORD = 'admin123';
    }

    await mongoose.connect(process.env.MONGODB_URI);

    const app = createApp();
    server = app.listen(0);
    const address = server.address();
    const port = typeof address === 'object' ? address.port : 3000;
    baseUrl = `http://127.0.0.1:${port}`;

    const suffix = String(Date.now()).slice(-8);
    testPhonePrimary = `119${suffix}`;
    testPhoneSecondary = `213${suffix.slice(1)}`;

    const availability = await findWeekdayWithAvailability();
    weekdayDate = availability.date;
    [primaryTime, secondaryTime, tertiaryTime] = availability.times;
  });

  after(async () => {
    if (createdAppointmentIds.length > 0) {
      await Appointment.deleteMany({ _id: { $in: createdAppointmentIds } });
    }

    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  async function api(method, path, options = {}) {
    const headers = { 'Content-Type': 'application/json' };

    if (options.auth) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}${path}`, {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const body = await response.json();
    return { status: response.status, body };
  }

  it('realiza login administrativo', async () => {
    const response = await api('POST', '/api/auth/login', {
      body: { username: process.env.ADMIN_USER, password: process.env.ADMIN_PASSWORD },
    });

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(response.body.data.token);
    token = response.body.data.token;
  });

  it('consulta horários disponíveis', async () => {
    const response = await api(
      'GET',
      `/api/appointments/available?date=${weekdayDate}`,
    );

    assert.equal(response.status, 200);
    assert.ok(Array.isArray(response.body.data.times));
    assert.ok(response.body.data.times.length > 0);
  });

  it('cria agendamento válido', async () => {
    const response = await api('POST', '/api/appointments', {
      body: {
        name: 'Carlos Eduardo',
        phone: testPhonePrimary,
        service: 'Consultoria',
        date: weekdayDate,
        time: primaryTime,
      },
    });

    assert.equal(response.status, 201);
    assert.equal(response.body.data.appointment.status, 'Agendado');
    assert.equal(response.body.data.appointment.phone, testPhonePrimary);
    createdAppointmentIds.push(response.body.data.appointment.id);
  });

  it('bloqueia telefone com agendamento ativo', async () => {
    const response = await api('POST', '/api/appointments', {
      body: {
        name: 'Carlos Eduardo',
        phone: testPhonePrimary,
        service: 'Manutenção',
        date: weekdayDate,
        time: secondaryTime,
      },
    });

    assert.equal(response.status, 400);
    assert.match(response.body.message, /agendamento ativo/i);
  });

  it('bloqueia horário ocupado', async () => {
    const response = await api('POST', '/api/appointments', {
      body: {
        name: 'Maria Silva',
        phone: testPhoneSecondary,
        service: 'Atendimento',
        date: weekdayDate,
        time: primaryTime,
      },
    });

    assert.equal(response.status, 400);
    assert.match(response.body.message, /horário já foi reservado/i);
  });

  it('lista agendamentos com autenticação', async () => {
    const response = await api('GET', '/api/appointments', { auth: true });

    assert.equal(response.status, 200);
    assert.ok(response.body.data.appointments.length >= 1);
  });

  it('atualiza status para Confirmado', async () => {
    const appointmentId = createdAppointmentIds[0];
    const response = await api(
      'PATCH',
      `/api/appointments/${appointmentId}/status`,
      {
        auth: true,
        body: { status: 'Confirmado' },
      },
    );

    assert.equal(response.status, 200);
    assert.equal(response.body.data.appointment.status, 'Confirmado');
  });

  it('cancela agendamento via alteração de status', async () => {
    const appointmentId = createdAppointmentIds[0];
    const response = await api(
      'PATCH',
      `/api/appointments/${appointmentId}/status`,
      {
        auth: true,
        body: { status: 'Cancelado' },
      },
    );

    assert.equal(response.status, 200);
    assert.equal(response.body.data.appointment.status, 'Cancelado');
  });

  it('permite novo agendamento após cancelamento', async () => {
    const response = await api('POST', '/api/appointments', {
      body: {
        name: 'Carlos Eduardo',
        phone: testPhonePrimary,
        service: 'Reunião',
        date: weekdayDate,
        time: tertiaryTime,
      },
    });

    assert.equal(response.status, 201);
    createdAppointmentIds.push(response.body.data.appointment.id);
  });

  it('impede exclusão de agendamento ativo', async () => {
    const activeAppointment = createdAppointmentIds.at(-1);
    const response = await api(
      'DELETE',
      `/api/appointments/${activeAppointment}`,
      { auth: true },
    );

    assert.equal(response.status, 400);
    assert.match(response.body.message, /não é permitido excluir/i);
  });

  it('exclui agendamento cancelado', async () => {
    const canceledId = createdAppointmentIds[0];
    const response = await api('DELETE', `/api/appointments/${canceledId}`, {
      auth: true,
    });

    assert.equal(response.status, 200);
    createdAppointmentIds = createdAppointmentIds.filter(
      (id) => id !== canceledId,
    );
  });

  it('bloqueia rota administrativa sem token', async () => {
    const response = await api('GET', '/api/appointments');
    assert.equal(response.status, 401);
    assert.equal(response.body.message, 'Usuário não autenticado.');
  });
});

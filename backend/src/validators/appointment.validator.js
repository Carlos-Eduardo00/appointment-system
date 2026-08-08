import { z } from 'zod';
import { SERVICES, STATUSES } from '../constants/appointment.constants.js';
import { isValidDateString } from '../utils/dateTime.js';

export const loginSchema = z.object({
  username: z.string().min(1, 'Usuário é obrigatório.'),
  password: z.string().min(1, 'Senha é obrigatória.'),
});

export const createAppointmentSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório.')
    .transform((value) => value.trim()),
  phone: z.string().min(1, 'Telefone é obrigatório.'),
  service: z.enum(SERVICES, {
    errorMap: () => ({ message: 'Serviço inválido.' }),
  }),
  date: z
    .string()
    .min(1, 'Data é obrigatória.')
    .refine(isValidDateString, { message: 'Data inválida.' }),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Horário inválido.'),
});

export const availableTimesQuerySchema = z.object({
  date: z
    .string()
    .min(1, 'Data é obrigatória.')
    .refine(isValidDateString, { message: 'Data inválida.' }),
});

export const listAppointmentsQuerySchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  date: z
    .string()
    .optional()
    .refine((value) => !value || isValidDateString(value), {
      message: 'Data inválida.',
    }),
  sortBy: z.enum(['date', 'time', 'status']).optional().default('date'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const updateStatusSchema = z.object({
  status: z.enum(STATUSES, {
    errorMap: () => ({ message: 'Status inválido.' }),
  }),
});

export const appointmentIdSchema = z.object({
  id: z.string().regex(/^[a-f\d]{24}$/i, 'Identificador inválido.'),
});

export function formatZodError(error) {
  return error.errors[0]?.message || 'Dados inválidos. Verifique as informações enviadas.';
}

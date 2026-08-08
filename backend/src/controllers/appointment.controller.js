import { MESSAGES } from '../constants/appointment.constants.js';
import * as appointmentService from '../services/appointment.service.js';
import {
  appointmentIdSchema,
  availableTimesQuerySchema,
  createAppointmentSchema,
  formatZodError,
  listAppointmentsQuerySchema,
  updateStatusSchema,
} from '../validators/appointment.validator.js';

export async function getAvailableTimes(req, res, next) {
  try {
    const parsed = availableTimesQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: formatZodError(parsed.error),
      });
    }

    const times = await appointmentService.getAvailableTimes(parsed.data.date);

    return res.status(200).json({
      success: true,
      message: 'Horários disponíveis consultados com sucesso.',
      data: { date: parsed.data.date, times },
    });
  } catch (error) {
    next(error);
  }
}

export async function createAppointment(req, res, next) {
  try {
    const parsed = createAppointmentSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: formatZodError(parsed.error),
      });
    }

    const appointment = await appointmentService.createAppointment(parsed.data);

    return res.status(201).json({
      success: true,
      message: MESSAGES.APPOINTMENT_CREATED,
      data: { appointment },
    });
  } catch (error) {
    next(error);
  }
}

export async function listAppointments(req, res, next) {
  try {
    const parsed = listAppointmentsQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: formatZodError(parsed.error),
      });
    }

    const appointments = await appointmentService.listAppointments(parsed.data);

    return res.status(200).json({
      success: true,
      message: 'Agendamentos listados com sucesso.',
      data: { appointments },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const params = appointmentIdSchema.safeParse(req.params);
    const body = updateStatusSchema.safeParse(req.body);

    if (!params.success || !body.success) {
      return res.status(400).json({
        success: false,
        message: formatZodError(params.error || body.error),
      });
    }

    const appointment = await appointmentService.updateAppointmentStatus(
      params.data.id,
      body.data.status,
    );

    return res.status(200).json({
      success: true,
      message: MESSAGES.STATUS_UPDATED,
      data: { appointment },
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAppointment(req, res, next) {
  try {
    const parsed = appointmentIdSchema.safeParse(req.params);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: formatZodError(parsed.error),
      });
    }

    await appointmentService.deleteAppointment(parsed.data.id);

    return res.status(200).json({
      success: true,
      message: MESSAGES.APPOINTMENT_DELETED,
      data: null,
    });
  } catch (error) {
    next(error);
  }
}

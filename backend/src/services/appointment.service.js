import {
  ACTIVE_STATUSES,
  MESSAGES,
  STATUS_TRANSITIONS,
} from '../constants/appointment.constants.js';
import { Appointment } from '../models/Appointment.js';
import { AppError } from '../utils/AppError.js';
import {
  filterPastTimesForToday,
  generateTimeSlots,
  isDateWithinBookingWindow,
  isValidDateString,
  isValidTimeSlot,
  isWeekday,
} from '../utils/dateTime.js';
import { normalizeName, normalizePhone } from '../utils/phone.js';

function validateAppointmentDate(date) {
  if (!isValidDateString(date)) {
    throw new AppError(MESSAGES.INVALID_DATE);
  }

  if (!isWeekday(date)) {
    throw new AppError(MESSAGES.WEEKEND);
  }

  if (!isDateWithinBookingWindow(date)) {
    throw new AppError(MESSAGES.INVALID_DATE);
  }
}

function validateTimeSlotFormat(time) {
  if (!isValidTimeSlot(time)) {
    throw new AppError(MESSAGES.INVALID_TIME);
  }
}

async function findActiveByPhone(phone) {
  return Appointment.findOne({
    phone,
    status: { $in: ACTIVE_STATUSES },
  });
}

async function findActiveByDateTime(date, time) {
  return Appointment.findOne({
    date,
    time,
    status: { $in: ACTIVE_STATUSES },
  });
}

export async function getAvailableTimes(date) {
  validateAppointmentDate(date);

  const allSlots = generateTimeSlots();
  const eligibleSlots = filterPastTimesForToday(date, allSlots);

  const occupiedAppointments = await Appointment.find({
    date,
    time: { $in: eligibleSlots },
    status: { $in: ACTIVE_STATUSES },
  }).select('time');

  const occupiedTimes = new Set(occupiedAppointments.map((item) => item.time));

  return eligibleSlots.filter((slot) => !occupiedTimes.has(slot));
}

export async function createAppointment(payload) {
  const name = normalizeName(payload.name);

  if (name.length < 3 || name.length > 100) {
    throw new AppError(MESSAGES.INVALID_DATA);
  }

  const phoneResult = normalizePhone(payload.phone);
  if (phoneResult.error) {
    throw new AppError(phoneResult.error);
  }

  const { date, time, service } = payload;
  validateAppointmentDate(date);
  validateTimeSlotFormat(time);

  const availableTimes = await getAvailableTimes(date);
  if (!availableTimes.includes(time)) {
    throw new AppError(MESSAGES.SLOT_TAKEN);
  }

  const activeByPhone = await findActiveByPhone(phoneResult.value);
  if (activeByPhone) {
    throw new AppError(MESSAGES.PHONE_ACTIVE);
  }

  const activeBySlot = await findActiveByDateTime(date, time);
  if (activeBySlot) {
    throw new AppError(MESSAGES.SLOT_TAKEN);
  }

  const appointment = await Appointment.create({
    name,
    phone: phoneResult.value,
    service,
    date,
    time,
    status: 'Agendado',
  });

  return appointment;
}

export async function listAppointments(filters) {
  const query = {};

  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' };
  }

  if (filters.phone) {
    const digits = filters.phone.replace(/\D/g, '');
    if (digits) {
      query.phone = { $regex: digits };
    }
  }

  if (filters.date) {
    query.date = filters.date;
  }

  const sortField = filters.sortBy || 'date';
  const sortDirection = filters.sortOrder === 'asc' ? 1 : -1;
  const sort = { [sortField]: sortDirection };

  if (sortField === 'date') {
    sort.time = sortDirection;
  }

  return Appointment.find(query).sort(sort);
}

export async function updateAppointmentStatus(id, newStatus) {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    throw new AppError(MESSAGES.NOT_FOUND, 404);
  }

  const allowedTransitions = STATUS_TRANSITIONS[appointment.status] || [];

  if (!allowedTransitions.includes(newStatus)) {
    throw new AppError(MESSAGES.INVALID_STATUS);
  }

  appointment.status = newStatus;
  await appointment.save();

  return appointment;
}

export async function deleteAppointment(id) {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    throw new AppError(MESSAGES.NOT_FOUND, 404);
  }

  if (ACTIVE_STATUSES.includes(appointment.status)) {
    throw new AppError(MESSAGES.DELETE_ACTIVE);
  }

  await appointment.deleteOne();
}

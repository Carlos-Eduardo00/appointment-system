import {
  LAST_SLOT,
  MAX_BOOKING_DAYS,
  SLOT_INTERVAL_MINUTES,
  TIMEZONE,
  WORK_START,
} from '../constants/appointment.constants.js';

function getPartsInTimezone(date, timeZone = TIMEZONE) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: map.year,
    month: map.month,
    day: map.day,
    weekday: map.weekday,
    hour: map.hour === '24' ? '00' : map.hour,
    minute: map.minute,
  };
}

export function getTodayString() {
  const { year, month, day } = getPartsInTimezone(new Date());
  return `${year}-${month}-${day}`;
}

export function getCurrentTimeString() {
  const { hour, minute } = getPartsInTimezone(new Date());
  return `${hour}:${minute}`;
}

export function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export function getWeekdayForDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'short',
  }).format(utcDate);

  return weekday;
}

export function isWeekday(dateString) {
  const weekday = getWeekdayForDate(dateString);
  return !['Sat', 'Sun'].includes(weekday);
}

export function compareDateStrings(a, b) {
  return a.localeCompare(b);
}

export function addDaysToDateString(dateString, days) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);

  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');

  return `${y}-${m}-${d}`;
}

export function isDateWithinBookingWindow(dateString) {
  const today = getTodayString();

  if (compareDateStrings(dateString, today) < 0) {
    return false;
  }

  const maxDate = addDaysToDateString(today, MAX_BOOKING_DAYS);
  return compareDateStrings(dateString, maxDate) <= 0;
}

export function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function generateTimeSlots() {
  const slots = [];
  let current = timeToMinutes(WORK_START);
  const last = timeToMinutes(LAST_SLOT);

  while (current <= last) {
    const hours = String(Math.floor(current / 60)).padStart(2, '0');
    const minutes = String(current % 60).padStart(2, '0');
    slots.push(`${hours}:${minutes}`);
    current += SLOT_INTERVAL_MINUTES;
  }

  return slots;
}

export function isValidTimeSlot(time) {
  return generateTimeSlots().includes(time);
}

export function filterPastTimesForToday(dateString, times) {
  const today = getTodayString();

  if (dateString !== today) {
    return times;
  }

  const nowMinutes = timeToMinutes(getCurrentTimeString());
  return times.filter((time) => timeToMinutes(time) > nowMinutes);
}

export function dateStringToUTCDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

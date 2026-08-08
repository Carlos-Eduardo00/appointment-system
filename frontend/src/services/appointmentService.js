import { apiRequest } from './api.js';

export function fetchAvailableTimes(date) {
  const params = new URLSearchParams({ date });
  return apiRequest(`/api/appointments/available?${params.toString()}`);
}

export function createAppointment(payload) {
  return apiRequest('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function listAppointments(token, filters = {}) {
  const params = new URLSearchParams();

  if (filters.date) {
    params.set('date', filters.date);
  }

  if (filters.sortBy) {
    params.set('sortBy', filters.sortBy);
  }

  if (filters.sortOrder) {
    params.set('sortOrder', filters.sortOrder);
  }

  const query = params.toString();
  const path = query ? `/api/appointments?${query}` : '/api/appointments';

  return apiRequest(path, { token });
}

export function updateAppointmentStatus(token, id, status) {
  return apiRequest(`/api/appointments/${id}/status`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ status }),
  });
}

export function deleteAppointment(token, id) {
  return apiRequest(`/api/appointments/${id}`, {
    method: 'DELETE',
    token,
  });
}

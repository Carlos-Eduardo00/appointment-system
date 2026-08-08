import { apiRequest } from './api.js';

export function loginAdmin(credentials) {
  return apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

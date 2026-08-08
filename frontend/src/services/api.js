const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function apiRequest(path, options = {}) {
  const { token, headers: customHeaders, ...fetchOptions } = options;

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error('Não foi possível processar a resposta do servidor.');
  }

  if (!data.success) {
    throw new Error(data.message || 'Erro na requisição.');
  }

  return data;
}

export { API_URL };

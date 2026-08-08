export function normalizeName(name) {
  return name.trim().replace(/\s+/g, ' ');
}

export function getPhoneDigits(value) {
  return value.replace(/\D/g, '');
}

export function formatPhoneDisplay(value) {
  const digits = getPhoneDigits(value);

  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return value;
}

export function formatPhoneInput(value) {
  const digits = getPhoneDigits(value).slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function validateBrazilianPhone(value) {
  const digits = getPhoneDigits(value);

  if (digits.length < 10 || digits.length > 11) {
    return 'Informe um telefone brasileiro válido.';
  }

  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) {
    return 'DDD inválido.';
  }

  if (digits.length === 11 && digits[2] !== '9') {
    return 'Celular deve iniciar com 9 após o DDD.';
  }

  if (digits.length === 10 && !/[2-9]/.test(digits[2])) {
    return 'Número fixo inválido.';
  }

  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    return 'Formato internacional não suportado.';
  }

  return null;
}

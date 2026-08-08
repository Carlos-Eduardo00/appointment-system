export function normalizePhone(input) {
  const digits = input.replace(/\D/g, '');

  if (digits.length === 12 || digits.length === 13) {
    if (digits.startsWith('55')) {
      return {
        error:
          'Formato internacional não suportado. Informe um telefone brasileiro.',
      };
    }
  }

  if (digits.length < 10 || digits.length > 11) {
    return { error: 'Telefone inválido. Informe um número brasileiro válido.' };
  }

  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) {
    return { error: 'Telefone inválido. DDD brasileiro inválido.' };
  }

  if (digits.length === 11 && digits[2] !== '9') {
    return {
      error: 'Telefone inválido. Celular deve iniciar com 9 após o DDD.',
    };
  }

  if (digits.length === 10 && !/[2-9]/.test(digits[2])) {
    return { error: 'Telefone inválido. Número fixo inválido.' };
  }

  return { value: digits };
}

export function normalizeName(name) {
  return name.trim().replace(/\s+/g, ' ');
}

// Validação de email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validação de senha
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Validação de telefone brasileiro
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(?:\+55\s?)?(?:\(?[1-9]{2}\)?\s?)?9?[0-9]{4}-?[0-9]{4}$/;
  return phoneRegex.test(phone);
};

// Validação de CPF
export const isValidCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/[^\d]/g, "");

  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit1 = ((sum * 10) % 11) % 10;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  let digit2 = ((sum * 10) % 11) % 10;

  return (
    cleanCPF.charAt(9) === digit1.toString() &&
    cleanCPF.charAt(10) === digit2.toString()
  );
};

// Validação de preço
export const isValidPrice = (price: number): boolean => {
  return price > 0 && Number.isFinite(price);
};

// Validação de campos obrigatórios
export const isRequired = (value: unknown): boolean => {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Validação de comprimento mínimo
export const hasMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

// Validação de comprimento máximo
export const hasMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

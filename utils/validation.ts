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
  const digit1 = ((sum * 10) % 11) % 10;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  const digit2 = ((sum * 10) % 11) % 10;

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

// Validação de arquivo de imagem
export const validateImageFile = (
  file: File
): { isValid: boolean; error?: string } => {
  // Tipos de arquivo permitidos (conforme backend)
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  // Tamanho máximo: 5MB (conforme backend)
  const maxSize = 5 * 1024 * 1024; // 5MB em bytes

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Tipo de arquivo não permitido. Use apenas: JPG, PNG ou WEBP",
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "Arquivo muito grande. Tamanho máximo: 5MB",
    };
  }

  return { isValid: true };
};

// Validação de dados da pizza
export const validatePizzaData = (data: {
  nome: string;
  descricao: string;
  preco: number;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!isRequired(data.nome)) {
    errors.push("Nome é obrigatório");
  }

  if (!hasMinLength(data.nome, 2)) {
    errors.push("Nome deve ter pelo menos 2 caracteres");
  }

  if (!hasMaxLength(data.nome, 100)) {
    errors.push("Nome deve ter no máximo 100 caracteres");
  }

  if (!isRequired(data.descricao)) {
    errors.push("Descrição é obrigatória");
  }

  if (!hasMinLength(data.descricao, 10)) {
    errors.push("Descrição deve ter pelo menos 10 caracteres");
  }

  if (!hasMaxLength(data.descricao, 500)) {
    errors.push("Descrição deve ter no máximo 500 caracteres");
  }

  if (!isValidPrice(data.preco)) {
    errors.push("Preço deve ser um número positivo");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

import { z } from "zod";

// ... (suas validações existentes)

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

// // Validação de arquivo de imagem
// export const validateImageFile = (
//   file: File
// ): { isValid: boolean; error?: string } => {
//   // Tipos de arquivo permitidos (conforme backend)
//   const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

//   // Tamanho máximo: 5MB (conforme backend)
//   const maxSize = 5 * 1024 * 1024; // 5MB em bytes

//   if (!allowedTypes.includes(file.type)) {
//     return {
//       isValid: false,
//       error: "Tipo de arquivo não permitido. Use apenas: JPG, PNG ou WEBP",
//     };
//   }

//   if (file.size > maxSize) {
//     return {
//       isValid: false,
//       error: "Arquivo muito grande. Tamanho máximo: 5MB",
//     };
//   }

//   return { isValid: true };
// };

// Schema de validação para a pizza
const PizzaSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome da pizza deve ter no mínimo 3 caracteres." })
    .max(50, {
      message: "O nome da pizza não pode ter mais de 50 caracteres.",
    }),

  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter no mínimo 10 caracteres." })
    .max(200, { message: "A descrição não pode ter mais de 200 caracteres." }),

  preco: z
    .number({
      // Mensagem para quando o valor não é um número
      invalid_type_error: "O preço deve ser um número válido.",
    })
    .positive({ message: "O preço deve ser um valor positivo." }),
});

// Interface para garantir a tipagem correta do array de erros
interface ValidationError {
  path: string | number;
  message: string;
}

// Função para validar os dados da pizza
export const validatePizzaData = (data: {
  nome: string;
  descricao: string;
  preco: number;
}) => {
  const result = PizzaSchema.safeParse(data);
  return {
    isValid: result.success,
    errors: result.success
      ? []
      : (result.error.issues.map((e) => ({
          path: e.path[0],
          message: e.message,
        })) as ValidationError[]),
  };
};

// Função para validar o arquivo de imagem
export const validateImageFile = (file: File) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: "A imagem não pode ter mais de 5MB." };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: "Formato de imagem inválido. Use JPG, PNG ou WebP.",
    };
  }
  return { isValid: true, error: null };
};

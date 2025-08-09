// src/utils/validation.ts

import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Tipo para validação de arquivos
type FileListLike = FileList | File[] | null | undefined;

// REATORADO: A validação do formulário agora usa a abordagem moderna e declarativa.
export const pizzaFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter no mínimo 10 caracteres." }),

  // Usando z.number() direto - o frontend deve enviar number
  preco: z
    .number({ message: "Deve ser um número válido." })
    .min(0.01, { message: "O preço deve ser maior que zero." }),
  image: z
    .custom<FileListLike>()
    .optional()
    .refine((files) => {
      if (!files) return true;
      const file = files instanceof FileList ? files[0] : files[0];
      return !file || file.size <= MAX_FILE_SIZE;
    }, `Tamanho máximo de 5MB.`)
    .refine((files) => {
      if (!files) return true;
      const file = files instanceof FileList ? files[0] : files[0];
      return !file || ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, "Formatos suportados: .jpg, .jpeg, .png, .webp"),
});

// TIPO PARA OS DADOS DO FORMULÁRIO
// Com z.coerce.number(), o tipo tanto de entrada quanto saída é number
export type PizzaFormData = z.infer<typeof pizzaFormSchema>;

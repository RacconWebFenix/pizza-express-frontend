import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const pizzaFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter no mínimo 10 caracteres." }),

  // --- CORREÇÃO FINAL AQUI ---
  preco: z.coerce
    .number() // 1. Tenta converter a entrada para número (ex: "abc" vira NaN)
    .refine((val) => !isNaN(val), {
      // 2. Valida se a conversão resultou em um número válido (não NaN)
      message: "O preço deve ser um número válido.",
    })
    .min(0.01, {
      // 3. Aplica a regra de negócio apenas se for um número
      message: "O preço deve ser maior que R$ 0,00.",
    }),
  // -------------------------

  image: z
    .any()
    .optional()
    .refine(
      (files) => !files || !files[0] || files[0].size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (files) =>
        !files || !files[0] || ACCEPTED_IMAGE_TYPES.includes(files[0].type),
      "Apenas formatos .jpg, .jpeg, .png e .webp são suportados."
    ),
});

export type PizzaFormOutputData = z.output<typeof pizzaFormSchema>;
export type PizzaFormInputData = z.input<typeof pizzaFormSchema>;

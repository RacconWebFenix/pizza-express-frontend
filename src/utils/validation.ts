import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Este é o schema que o Zod usa para validar e transformar os dados.
export const pizzaFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres." }),
  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter no mínimo 10 caracteres." }),

  // O campo 'preco' entra como string, é validado e sai como número.
  preco: z
    .string()
    .min(1, { message: "O preço é obrigatório." })
    .transform((val, ctx) => {
      const parsed = parseFloat(val.replace(",", "."));
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Deve ser um número válido.",
        });
        return z.NEVER;
      }
      if (parsed <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "O preço deve ser maior que zero.",
        });
        return z.NEVER;
      }
      return parsed;
    }),

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
      "Formatos suportados."
    ),
});

// TIPO PARA OS DADOS DE SAÍDA (DEPOIS DA VALIDAÇÃO) -> preco é 'number'
export type PizzaFormOutputData = z.output<typeof pizzaFormSchema>;

// TIPO PARA OS DADOS DE ENTRADA (NO FORMULÁRIO) -> preco é 'string'
export type PizzaFormInputData = z.input<typeof pizzaFormSchema>;

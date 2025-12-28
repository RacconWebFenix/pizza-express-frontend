/**
 * Schemas de validação com Zod
 * @version 1.0.0
 * @since 28/12/2025
 */

import { z } from 'zod';
import { FILE_SIZE_LIMITS, ACCEPTED_IMAGE_TYPES, VALIDATION_RULES } from '@/constants/validation';

/**
 * Schema para validação de imagem
 */
const imageSchema = z
  .instanceof(File, { message: 'Arquivo inválido' })
  .refine(
    (file) => file.size <= FILE_SIZE_LIMITS.IMAGE,
    `Tamanho máximo de 5MB.`
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type as typeof ACCEPTED_IMAGE_TYPES[number]),
    'Apenas formatos .jpg, .jpeg, .png e .webp são suportados.'
  );

/**
 * Schema para formulário de produto
 */
export const productFormSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_RULES.PRODUCT_NAME.MIN_LENGTH, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    .max(VALIDATION_RULES.PRODUCT_NAME.MAX_LENGTH, { message: 'O nome deve ter no máximo 100 caracteres.' }),
  description: z
    .string()
    .min(VALIDATION_RULES.PRODUCT_DESCRIPTION.MIN_LENGTH, { message: 'A descrição deve ter no mínimo 10 caracteres.' })
    .max(VALIDATION_RULES.PRODUCT_DESCRIPTION.MAX_LENGTH, { message: 'A descrição deve ter no máximo 500 caracteres.' }),
  price: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: 'O preço deve ser um número válido.',
    })
    .min(VALIDATION_RULES.PRODUCT_PRICE.MIN, {
      message: 'O preço deve ser maior que R$ 0,00.',
    })
    .max(VALIDATION_RULES.PRODUCT_PRICE.MAX, {
      message: 'O preço deve ser menor que R$ 999.999,99.',
    }),
  categoryId: z
    .string()
    .min(1, { message: 'Categoria é obrigatória.' }),
  image: imageSchema.optional(),
});

/**
 * Tipo inferido do schema de produto
 */
export type ProductFormData = z.infer<typeof productFormSchema>;

/**
 * Schema para formulário de pedido
 */
export const orderFormSchema = z.object({
  type: z.enum(['DELIVERY', 'DINE_IN']),
  addressId: z.number().optional(),
  sessionId: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Produto é obrigatório'),
      quantity: z.number().min(1, 'Quantidade deve ser maior que 0'),
      notes: z.string().optional(),
    })
  ).min(1, 'Pedido deve ter pelo menos um item'),
  observations: z.string().max(500, 'Máximo de 500 caracteres').optional(),
});

/**
 * Tipo inferido do schema de pedido
 */
export type OrderFormData = z.infer<typeof orderFormSchema>;

/**
 * Schema legado para compatibilidade (remover após migração)
 */
export const pizzaFormSchema = z.object({
  nome: z
    .string()
    .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' }),
  descricao: z
    .string()
    .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),
  preco: z.coerce
    .number()
    .refine((val) => !isNaN(val), {
      message: 'O preço deve ser um número válido.',
    })
    .min(0.01, {
      message: 'O preço deve ser maior que R$ 0,00.',
    }),
  image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= FILE_SIZE_LIMITS.IMAGE,
      `Tamanho máximo de 5MB.`
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type as typeof ACCEPTED_IMAGE_TYPES[number]),
      'Apenas formatos .jpg, .jpeg, .png e .webp são suportados.'
    ),
});

export type PizzaFormOutputData = z.output<typeof pizzaFormSchema>;
export type PizzaFormInputData = z.input<typeof pizzaFormSchema>;

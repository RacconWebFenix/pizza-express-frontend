import { Product } from "./product";

/**
 * @interface CartItem
 * @description Interface para um item dentro do carrinho de compras.
 * @property {Product} product - O objeto completo do produto.
 * @property {number} quantity - A quantidade deste produto no carrinho.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * @interface Cart
 * @description Interface para o estado geral do carrinho de compras.
 * @property {CartItem[]} items - Uma lista de itens no carrinho.
 * @property {number} totalItems - O número total de pizzas no carrinho (soma das quantidades).
 * @property {number} totalPrice - O preço total de todos os itens no carrinho.
 */
export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

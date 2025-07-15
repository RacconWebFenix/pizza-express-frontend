import { Pizza } from ".";


/**
 * @interface CartItem
 * @description Interface para um item dentro do carrinho de compras.
 * @property {Pizza} pizza - O objeto completo da pizza.
 * @property {number} quantity - A quantidade desta pizza no carrinho.
 */
export interface CartItem {
  pizza: Pizza;
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

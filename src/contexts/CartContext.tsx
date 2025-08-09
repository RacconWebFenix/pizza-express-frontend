'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { Cart, CartItem, Pizza } from '@/types';

// Define o tipo para o valor do nosso contexto
interface CartContextType {
  cart: Cart;
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, newQuantity: number) => void;
  clearCart: () => void;
}

// Cria o Context com um valor inicial indefinido
const CartContext = createContext<CartContextType | undefined>(undefined);

// Estado inicial para o carrinho
const initialCartState: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

/**
 * @function CartProvider
 * @description Provedor que envolve a aplicação e fornece o estado e as funções do carrinho.
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(initialCartState);

  // Carrega o carrinho do localStorage ao iniciar
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('pizza-express-cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Falha ao carregar o carrinho do localStorage:', error);
      setCart(initialCartState);
    }
  }, []);

  // Salva o carrinho no localStorage sempre que ele for alterado
  useEffect(() => {
    try {
      localStorage.setItem('pizza-express-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Falha ao salvar o carrinho no localStorage:', error);
    }
  }, [cart]);

  // Recalcula os totais sempre que os itens mudam
  useEffect(() => {
    const totalItems = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.pizza.preco * item.quantity,
      0
    );
    // Apenas atualiza se os valores calculados forem diferentes para evitar loops
    if (
      totalItems !== cart.totalItems ||
      totalPrice !== cart.totalPrice
    ) {
      setCart((prevCart) => ({ ...prevCart, totalItems, totalPrice }));
    }
  }, [cart.items, cart.totalItems, cart.totalPrice]);

  const addToCart = useCallback((pizza: Pizza) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.pizza.id === pizza.id
      );
      if (existingItem) {
        // Se a pizza já existe, aumenta a quantidade
        const updatedItems = prevCart.items.map((item) =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...prevCart, items: updatedItems };
      } else {
        // Se a pizza não existe, adiciona ao carrinho
        const newItem: CartItem = { pizza, quantity: 1 };
        return { ...prevCart, items: [...prevCart.items, newItem] };
      }
    });
  }, []);

  const removeFromCart = useCallback((pizzaId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.pizza.id !== pizzaId),
    }));
  }, []);

  const updateQuantity = useCallback((pizzaId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Se a quantidade for 0 ou menos, remove o item
      removeFromCart(pizzaId);
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.pizza.id === pizzaId
            ? { ...item, quantity: newQuantity }
            : item
        ),
      }));
    }
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart(initialCartState);
  }, []);

  // useMemo para evitar recriar o objeto de valor em cada renderização
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [cart, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * @function useCart
 * @description Hook customizado para consumir o CartContext de forma segura.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

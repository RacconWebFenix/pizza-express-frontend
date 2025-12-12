"use client";

import { Pizza } from "@/types/pizzas";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// --- TIPAGEM ---
interface CartItem {
  pizza: Pizza;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  cart: CartState;
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (pizzaId: number) => void;
  updateQuantity: (pizzaId: number, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const calculateCartTotals = (
  items: CartItem[]
): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.pizza.preco * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartState>(initialCartState);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("pizza-express-cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Falha ao carregar o carrinho:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pizza-express-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((pizzaToAdd: Pizza) => {
    setCart((prevState) => {
      const existingItem = prevState.items.find(
        (item) => item.pizza.id === pizzaToAdd.id
      );
      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = prevState.items.map((item) =>
          item.pizza.id === pizzaToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...prevState.items, { pizza: pizzaToAdd, quantity: 1 }];
      }

      console.log(`Pizza ${pizzaToAdd.id} adicionada ao carrinho!`);
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    });
  }, []);

  const removeFromCart = useCallback((pizzaId: number) => {
    setCart((prevState) => {
      const updatedItems = prevState.items.filter(
        (item) => item.pizza.id !== pizzaId
      );
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    });
  }, []);

  const updateQuantity = useCallback(
    (pizzaId: number, newQuantity: number) => {
      if (newQuantity <= 0) {
        removeFromCart(pizzaId);
        return;
      }
      setCart((prevState) => {
        const updatedItems = prevState.items.map((item) =>
          item.pizza.id === pizzaId ? { ...item, quantity: newQuantity } : item
        );
        const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
        return { items: updatedItems, totalItems, totalPrice };
      });
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart(initialCartState);
  }, []);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};

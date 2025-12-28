"use client";

import { Product } from "@/types/product";
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
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
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
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao carregar carrinho";
      console.error("Falha ao carregar o carrinho:", errorMessage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pizza-express-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((productToAdd: Product) => {
    setCart((prevState) => {
      const existingItem = prevState.items.find(
        (item) => item.product.id === productToAdd.id
      );
      let updatedItems: CartItem[];

      if (existingItem) {
        updatedItems = prevState.items.map((item) =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...prevState.items,
          { product: productToAdd, quantity: 1 },
        ];
      }

      console.log(`Produto ${productToAdd.id} adicionado ao carrinho!`);
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevState) => {
      const updatedItems = prevState.items.filter(
        (item) => item.product.id !== productId
      );
      const { totalItems, totalPrice } = calculateCartTotals(updatedItems);
      return { items: updatedItems, totalItems, totalPrice };
    });
  }, []);

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prevState) => {
        const updatedItems = prevState.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
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

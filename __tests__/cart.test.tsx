import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  CartProvider,
  useCart,
} from "../src/features/cart/context/CartContext";
import { Product } from "../src/types/product";

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

const mockProduct: Product = {
  id: "1",
  name: "Pizza Margherita",
  description: "Pizza clássica com molho de tomate e queijo",
  price: "25.99",
  imageUrl: "/pizza-margherita.jpg",
  categoryId: "1",
  category: {
    id: "1",
    name: "Pizzas",
    slug: "pizzas",
  },
  active: true,
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

const TestComponent = () => {
  const { cart, addToCart } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(mockProduct)}>Add Product</button>
      <div data-testid="total-items">{cart.totalItems}</div>
      <div data-testid="total-price">{cart.totalPrice}</div>
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  it("should add item to cart", async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Product");
    await act(async () => {
      addButton.click();
    });

    expect(screen.getByTestId("total-items")).toHaveTextContent("1");
    expect(screen.getByTestId("total-price")).toHaveTextContent("25.99");
  });

  it("should persist cart to localStorage", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    const addButton = screen.getByText("Add Product");
    addButton.click();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "pizza-express-cart",
      expect.any(String)
    );
  });
});

import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { CartProvider, useCart } from "../src/features/cart/context/CartContext";
import { Pizza } from "../src/types/pizzas";

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockPizza: Pizza = {
  id: 1,
  nome: "Pizza Margherita",
  descricao: "Pizza clássica com molho de tomate e queijo",
  preco: 25.99,
  image: "/pizza-margherita.jpg",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-01-01T00:00:00Z",
};

const TestComponent = () => {
  const { cart, addToCart } = useCart();

  return (
    <div>
      <button onClick={() => addToCart(mockPizza)}>Add Pizza</button>
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

    const addButton = screen.getByText("Add Pizza");
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

    const addButton = screen.getByText("Add Pizza");
    addButton.click();

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "pizza-express-cart",
      expect.any(String)
    );
  });
});

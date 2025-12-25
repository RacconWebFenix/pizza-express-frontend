import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page";

// Mock para o Next.js useRouter
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock para o AuthContext - usando caminho relativo
jest.mock("../src/features/auth/contexts/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: false,
    isLoading: false,
  }),
}));

// Mock para o Chakra UI
jest.mock("@chakra-ui/react", () => {
  const originalModule = jest.requireActual("@chakra-ui/react");
  return {
    __esModule: true,
    ...originalModule,
    // Mocks simples para os componentes Chakra usados na Home
    Box: ({ children, ...props }) => (
      <div data-testid="box" {...props}>
        {children}
      </div>
    ),
    Flex: ({ children, ...props }) => (
      <div data-testid="flex" {...props}>
        {children}
      </div>
    ),
    Heading: ({ children, ...props }) => (
      <h1 data-testid="heading" {...props}>
        {children}
      </h1>
    ),
    Text: ({ children, ...props }) => (
      <p data-testid="text" {...props}>
        {children}
      </p>
    ),
    Button: ({ children, ...props }) => (
      <button data-testid="button" {...props}>
        {children}
      </button>
    ),
    VStack: ({ children, ...props }) => (
      <div data-testid="vstack" {...props}>
        {children}
      </div>
    ),
    Icon: ({ as: Component, ...props }) => (
      <span data-testid="icon" {...props}>
        {Component && <Component />}
      </span>
    ),
    Image: ({ src, alt, ...props }) => (
      <img data-testid="image" src={src} alt={alt} {...props} />
    ),
  };
});

// Mock para react-icons
jest.mock("react-icons/fa", () => ({
  FaPizzaSlice: () => <span data-testid="fa-pizza-slice" />,
  FaLeaf: () => <span data-testid="fa-leaf" />,
  FaFire: () => <span data-testid="fa-fire" />,
}));

// Mock para componentes UI - usando caminho relativo
jest.mock("../src/components/ui", () => ({
  PizzaBadge: ({ children, ...props }) => (
    <span data-testid="pizza-badge" {...props}>
      {children}
    </span>
  ),
  PizzaText: ({ children, ...props }) => (
    <span data-testid="pizza-text" {...props}>
      {children}
    </span>
  ),
}));

describe("Home Page", () => {
  // Silencia erros do console durante os testes
  let consoleError;
  beforeAll(() => {
    consoleError = console.error;
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = consoleError;
  });

  it("renders the page title", () => {
    render(<Home />);
    // O título está em um PizzaText com variant="heading"
    const pizzaTexts = screen.getAllByTestId("pizza-text");
    const pageTitle = pizzaTexts.find(text => 
      text.textContent && text.textContent.includes("Bem-vindo à Pizzaria Express")
    );
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle?.textContent).toContain("Bem-vindo à Pizzaria Express");
  });

  it("renders the menu button", () => {
    render(<Home />);
    const menuButton = screen.getByTestId("button");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.textContent).toContain("Explorar Cardápio");
  });
});

describe("Basic Test", () => {
  it("renders a div", () => {
    const { container } = render(<div>Test</div>);
    expect(container.firstChild).toHaveTextContent("Test");
  });
});

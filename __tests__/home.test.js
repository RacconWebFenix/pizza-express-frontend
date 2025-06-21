import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

// Mock para o Chakra UI e Next.js
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
  };
});

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
    const pageTitle = screen.getByTestId("heading");
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toContain("Bem-vindo à Pizzaria Express!");
  });

  it("renders the menu button", () => {
    render(<Home />);
    const menuButton = screen.getByTestId("button");
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.textContent).toContain("Ver Cardápio");
  });
});

describe("Basic Test", () => {
  it("renders a div", () => {
    const { container } = render(<div>Test</div>);
    expect(container.firstChild).toHaveTextContent("Test");
  });
});

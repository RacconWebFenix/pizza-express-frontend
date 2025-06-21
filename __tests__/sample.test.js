import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders a sample test", () => {
  render(<div>Hello, Jest!</div>);
  const element = screen.getByText("Hello, Jest!");
  expect(element).toBeInTheDocument();
});

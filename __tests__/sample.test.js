const React = require("react");
const { render, screen } = require("@testing-library/react");

test("renders a sample test", () => {
  render(React.createElement("div", null, "Hello, Jest!"));
  const element = screen.getByText("Hello, Jest!");
  expect(element).toBeInTheDocument();
});

const React = require("react");
const { render, screen } = require("@testing-library/react");
const { act } = require("react");

test("renders a sample test", () => {
  act(() => {
    render(React.createElement("div", null, "Hello, Jest!"));
  });
  const element = screen.getByText("Hello, Jest!");
  expect(element).toBeInTheDocument();
});

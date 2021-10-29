import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Products from "../components/Products";


test("On initial state the Next button is disabled", () => {
  render(<Products />);

  expect(screen.getByRole("button", { name: /Next/i })).toBeDisabled();
});
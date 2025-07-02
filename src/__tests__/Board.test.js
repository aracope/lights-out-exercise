import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "../Board";
import '@testing-library/jest-dom';

// override Math.random to always return < 0.25 (always on). Ensure predictable randomization in other tests
beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.1);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

test("renders the board with expected number of cells", () => {
  const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1.0} />);
  const cells = container.querySelectorAll("td");
  expect(cells.length).toBe(9);
});

test("clicking a cell flips correct cells", () => {
  const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1.0} />);

  const allCells = container.querySelectorAll("td");
  const centerCell = allCells[4]; // cell at row 1, col 1 in 3x3

  fireEvent.click(centerCell);

  // Some lights should have toggled off
  const litCells = container.querySelectorAll(".Cell-lit");
  expect(litCells.length).toBeLessThan(9); // must be fewer than originally lit cells
});

test("shows 'YOU WIN!' message when board is cleared", () => {
  const { getByText } = render(<Board nrows={1} ncols={1} chanceLightStartsOn={true} />);
  fireEvent.click(document.querySelector("td"));
  expect(getByText("YOU WIN!")).toBeInTheDocument();
});


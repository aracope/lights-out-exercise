import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Cell from "../Cell";
import '@testing-library/jest-dom';

function renderCell(isLit = false, flipCellsAroundMe = () => {}) {
  return render(
    <table>
      <tbody>
        <tr>
          <Cell isLit={isLit} flipCellsAroundMe={flipCellsAroundMe} />
        </tr>
      </tbody>
    </table>
  );
}

test("renders a lit Cell correctly", () => {
  const { container } = renderCell(true);
  expect(container.querySelector("td")).toHaveClass("Cell-lit");
});

test("renders an unlit Cell correctly", () => {
  const { container } = renderCell(false);
  expect(container.querySelector("td")).not.toHaveClass("Cell-lit");
});

test("calls flipCellsAroundMe on click", () => {
  const flipMock = jest.fn();
  const { container } = renderCell(false, flipMock);
  fireEvent.click(container.querySelector("td"));
  expect(flipMock).toHaveBeenCalledTimes(1);
});

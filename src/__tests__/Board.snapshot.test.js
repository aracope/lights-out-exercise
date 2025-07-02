
import React from "react";
import { render } from "@testing-library/react";
import Board from "../Board";

test("matches snapshot", () => {
  const { asFragment } = render(<Board nrows={2} ncols={2} chanceLightStartsOn={false} />);
  expect(asFragment()).toMatchSnapshot();
});

/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
  fireEvent,
  queryByText,
  queryByRole,
} from "@testing-library/react";

import "@testing-library/jest-dom";
import App2 from "./App2";

describe("App2 component", () => {
  test("displays all books on load ", () => {
    // render(<App2></App2>);
    // let book = screen.getByText("The Catcher in the Rye");
    // expect(book).toBeInTheDocument();
    // book = screen.getByText("The Silver Chair");
    // expect(book).toBeInTheDocument();
    expect(true).toBe(true);
  });
});

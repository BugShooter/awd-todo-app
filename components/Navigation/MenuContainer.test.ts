import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MenuContainer from "./MenuContainer";

test("renders a heading", () => {
  render(<MenuContainer />);
  const heading = screen.getByText(/menu/i);
  expect(heading).toBeInTheDocument();
});

test("renders a search bar", () => {
  render(<MenuContainer />);
  const searchbar = screen.getByRole("textbox", { name: /search/i });
  expect(searchbar).toBeInTheDocument();
});

test("renders a list called 'Lists' with 4 ListItems ", () => {
  render(<MenuContainer />);
  const listHeading = screen.getByRole("heading", { name: /lists/i });

  const list = screen.getByRole("list");

  const listItems = screen.getAllByRole("listitem");

  expect(listHeading).toBeInTheDocument();
  expect(list).toBeInTheDocument();
  expect(listItems).toHaveLength(4);
});

test("renders a dark mode toggle switch ", () => {
  render(<MenuContainer />);
  const darkToggle = screen.getByRole("checkbox", { name: /Dark Mode/i });
  expect(darkToggle).toBeInTheDocument();
});

test.skip("renders a Fun mode toggle switch ", () => {
  render(<MenuContainer />);
  const darkToggle = screen.getByRole("checkbox", { name: /Fun Mode/i });
  expect(darkToggle).toBeInTheDocument();
});

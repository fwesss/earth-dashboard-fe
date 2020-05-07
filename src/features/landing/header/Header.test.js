import React from "react";
import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("should render a header with a logo, title, globe, welcome message, and call to action", () => {
    const { getByTitle, getByText, getByAltText } = render(<Header />);

    expect(getByTitle(/logo/i)).toBeInTheDocument();
    expect(getByText(/welcome to/i)).toBeInTheDocument();
    expect(getByAltText(/earth/i)).toBeInTheDocument();
    expect(getByText(/learn more/i)).toBeInTheDocument();
  });
});

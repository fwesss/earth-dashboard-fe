import React from "react";
import { render } from "@testing-library/react";
import BlurbSection from "./BlurbSection";

describe("BlurbSection", () => {
  it("should render 2 headers and 6 blurbs", () => {
    const { getByText, getByTestId } = render(<BlurbSection />);

    expect(getByText(/what is earth dashboard/i)).toBeInTheDocument();
    expect(getByText(/a look at what is happening/i)).toBeInTheDocument();
    expect(getByText(/some visuals/i)).toBeInTheDocument();

    expect(getByTestId("blurb1")).toBeInTheDocument();
    expect(getByTestId("blurb2")).toBeInTheDocument();
    expect(getByTestId("blurb3")).toBeInTheDocument();
    expect(getByTestId("blurb4")).toBeInTheDocument();
    expect(getByTestId("blurb5")).toBeInTheDocument();
    expect(getByTestId("blurb6")).toBeInTheDocument();
  });
});

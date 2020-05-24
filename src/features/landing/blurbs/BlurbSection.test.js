import React from "react";
import { waitFor } from "@testing-library/react";
import BlurbSection from "./BlurbSection";
import renderWithRedux from "../../../utils/testingUtils";

describe("BlurbSection", () => {
  it("should render 2 headers and 6 blurbs", async () => {
    const { getByText, getByTestId } = renderWithRedux(<BlurbSection />, {
      initialState: {
        bubblesReducer: {
          summary: [
            {
              country: "Algeria",
              totalconfirmed: 7019,
            },
            {
              country: "Andorra",
              totalconfirmed: 761,
            },
          ],
        },
      },
    });

    expect(getByText(/what is planet data/i)).toBeInTheDocument();
    expect(getByText(/a look at what is happening/i)).toBeInTheDocument();
    expect(getByText(/some visuals/i)).toBeInTheDocument();

    expect(getByTestId("blurb1")).toBeInTheDocument();
    expect(getByTestId("blurb2")).toBeInTheDocument();
    expect(getByTestId("blurb3")).toBeInTheDocument();
    expect(getByTestId("blurb4")).toBeInTheDocument();
    expect(getByTestId("blurb5")).toBeInTheDocument();
    expect(getByTestId("blurb6")).toBeInTheDocument();

    await waitFor(() =>
      expect(getByTestId("blurb5")).toHaveTextContent("7,780")
    );
  });
});

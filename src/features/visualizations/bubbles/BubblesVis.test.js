import React from "react";
import { waitFor } from "@testing-library/react";
import BubblesVis from "./BubblesVis";
import renderWithRedux from "../../../utils/testingUtils";

describe("BubblesVis", () => {
  it("should render a loading spinner then the title, bubbles, info card, and description text", async () => {
    // render the CasesVis component with a preloaded state. This allows us to get
    const { getByLabelText, getByTestId, getByText } = renderWithRedux(
      <BubblesVis />,
      {
        initialState: {
          bubblesReducer: {
            summary: [
              {
                country: "United States",
                totalConfirmed: 1234567,
              },
              {
                country: "Spain",
                totalConfirmed: 65768,
              },
            ],
          },
        },
      }
    );

    // Loading spinner appears on the screen while map is loading
    expect(getByTestId("progressbar")).toBeInTheDocument();

    // Once loaded, the title appears
    await waitFor(() => getByLabelText(/bubbles-title/i));

    // Check that our elements have loaded
    expect(getByLabelText(/bubbles-title/i)).toBeInTheDocument();
    expect(getByTestId("bubbles")).toBeInTheDocument();
    expect(getByText(/confirmed cases to date/i)).toBeInTheDocument();
    expect(getByText(/one goal/i)).toBeInTheDocument();
  });
});

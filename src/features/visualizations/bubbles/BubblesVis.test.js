import React from "react";
import { waitFor } from "@testing-library/react";
import BubblesVis from "./BubblesVis";
import renderWithRedux from "../../../utils/testingUtils";

describe("BubblesVis", () => {
  it("should render a loading spinner then the title, bubbles, info card, and description text", async () => {
    // render the BubblesVis component with a preloaded state. This allows us to get
    const { getByTestId, getByText } = renderWithRedux(<BubblesVis />, {
      initialState: {
        bubblesReducer: {
          summary: [
            {
              country: "United States",
              totalconfirmed: 1234567,
            },
            {
              country: "Spain",
              totalconfirmed: 65768,
            },
          ],
        },
      },
    });

    // Once loaded, the title appears
    await waitFor(() => getByText(/the spread of covid-19/i));

    expect(getByTestId("bubbles")).toBeInTheDocument();
    expect(getByText(/confirmed cases to date/i)).toBeInTheDocument();
    expect(getByText(/one goal/i)).toBeInTheDocument();
  });
});

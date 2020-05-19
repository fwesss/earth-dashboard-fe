import React from "react";
import { waitFor } from "@testing-library/react";
import renderWithRedux from "../../../utils/testingUtils";
import AirVis from "./AirVis";

describe("AirVis", () => {
  it("should render a loading spinner then the title, and air quality visualization", async () => {
    // render the CasesVis component with a preloaded state. This allows us to get
    const { getByTestId, getByText } = renderWithRedux(<AirVis />, {
      initialState: {
        airReducer: {
          dates: ["4/26/2020", "4/27/2020"],
          airQuality: [
            {
              x: "4/26/2020",
              y: 13.5,
            },
            {
              x: "4/27/2020",
              y: 15.7,
            },
          ],
          cases: [
            {
              x: "4/26/2020",
              y: 19567,
            },
            {
              x: "4/27/2020",
              y: 20460,
            },
          ],
        },
      },
    });

    // Loading spinner appears on the screen while map is loading
    expect(getByTestId("progressbar")).toBeInTheDocument();

    // Once loaded, the title appears
    await waitFor(() => getByText(/mean particulate matter/i));

    expect(getByTestId("airQuality")).toBeInTheDocument();
    expect(getByText(/the term “pm 2.5”/i)).toBeInTheDocument();
  });
});

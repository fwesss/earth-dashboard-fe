import React from "react";
import { waitFor, fireEvent } from "@testing-library/react";
import { Map } from "mapbox-gl";
import CasesVis from "./CasesVis";
import renderWithRedux from "../../../utils/testingUtils";

jest.mock("../../../api/cases");

describe("CasesVis", () => {
  it("should render a loading spinner then the title, map, filter slider, and play and pause buttons", async () => {
    const { getByLabelText, getByTestId, container } = renderWithRedux(
      <CasesVis />,
      {
        initialState: {
          casesReducer: {
            dates: [
              "2020-01-22",
              "2020-01-23",
              "2020-01-24",
              "2020-01-25",
              "2020-01-26",
            ],
            cases: {
              features: [
                {
                  geometry: {
                    coordinates: [-121.83, 47.49],
                    type: "Point",
                  },
                  properties: {
                    cases: 1,
                    date: "2020-01-22",
                  },
                  type: "Feature",
                },
                {
                  geometry: {
                    coordinates: [-121.83, 47.49],
                    type: "Point",
                  },
                  properties: {
                    cases: 1,
                    date: "2020-01-23",
                  },
                  type: "Feature",
                },
                {
                  geometry: {
                    coordinates: [-121.83, 47.49],
                    type: "Point",
                  },
                  properties: {
                    cases: 3,
                    date: "2020-01-24",
                  },
                  type: "Feature",
                },
                {
                  geometry: {
                    coordinates: [-121.83, 47.49],
                    type: "Point",
                  },
                  properties: {
                    cases: 1,
                    date: "2020-01-25",
                  },
                  type: "Feature",
                },
                {
                  geometry: {
                    coordinates: [-121.83, 47.49],
                    type: "Point",
                  },
                  properties: {
                    cases: 3,
                    date: "2020-01-26",
                  },
                  type: "Feature",
                },
              ],
              type: "FeatureCollection",
            },
          },
        },
      }
    );

    expect(getByTestId("progressbar")).toBeInTheDocument();

    await waitFor(() => getByLabelText(/title/i));

    const sliderValue = container.getElementsByTagName("input")[0];

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByTestId("map")).toBeInTheDocument();
    expect(getByLabelText(/filter/i)).toBeInTheDocument();
    expect(getByLabelText("play")).toBeInTheDocument();
    expect(getByLabelText("pause")).toBeInTheDocument();

    expect(sliderValue.value).toBe("3");
    fireEvent.change(sliderValue, { target: { value: "0" } });
    expect(sliderValue.value).toBe("0");
    fireEvent.click(getByLabelText("play"));
    await waitFor(() => expect(sliderValue.value).toBe("3"));
    fireEvent.click(getByLabelText("pause"));
    expect(sliderValue.value).toBe("3");

    const map = new Map();
    map.on.mockResolvedValueOnce();
    map.addSource.mockResolvedValueOnce();
    map.addLayer.mockResolvedValueOnce();

    expect(map.on).toHaveBeenCalled();
    expect(map.on).toHaveBeenLastCalledWith("load", expect.any(Function));
  });
});

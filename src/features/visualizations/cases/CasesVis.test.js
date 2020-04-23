import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import CasesVis from "./CasesVis";
import store from "../../../app/store";
import api from "../../../api/cases";

jest.mock("../../../api/cases");

describe("CasesVis", () => {
  it("should render a loading spinner then the title, map, filter slider, and play and pause buttons", async () => {
    const { getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <CasesVis />
      </Provider>
    );

    expect(getByTestId("progressbar")).toBeInTheDocument();

    api.requestCases.mockResolvedValueOnce({
      rest: 1,
      data: {
        cases: [
          {
            lat: 47.49,
            lon: -121.83,
            cases: 1,
            date: "2020-01-23",
          },
        ],
        dates: ["2020-01-23"],
      },
    });

    await waitFor(() => getByLabelText(/title/i));

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByTestId("map")).toBeInTheDocument();
    expect(getByLabelText(/filter/i)).toBeInTheDocument();
    expect(getByLabelText("play")).toBeInTheDocument();
    expect(getByLabelText("pause")).toBeInTheDocument();
  });
});

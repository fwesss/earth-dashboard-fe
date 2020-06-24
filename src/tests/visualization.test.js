import React from "react";
import { waitFor } from "@testing-library/react";
import renderWithRedux from "../utils/testingUtils";
import { visualizations } from "../features/visualizations/visConstructor";
import BubblesVis from "../features/visualizations/covid/bubbles/BubblesVis";
import RacingData from "../features/visualizations/covid/racing/RacingData";
import AirVis from "../features/visualizations/covid/air/AirVis";
import CasesVis from "../features/visualizations/covid/cases/CasesVis";
import CountryVis from "../features/visualizations/deforestation/country/CountryVis";
import CountryIncomeVis from "../features/visualizations/deforestation/income/CountryIncomeVis";
import Migration from "../features/visualizations/migration/pattern/Migration";
import Temperature from "../features/visualizations/climate/temperature/Temperature";
import CarbonDioxide from "../features/visualizations/climate/carbonDioxide/CarbonDioxide";

const components = [
  <BubblesVis />,
  <RacingData />,
  <AirVis />,
  <CasesVis />,
  <CountryVis />,
  <CountryIncomeVis />,
  <Migration />,
  <Temperature />,
  <CarbonDioxide />,
];

describe("Visualizations", () => {
  visualizations.forEach((vis, index) => {
    // jsdom does not support getBBox which is required for the legend in Symbiosis. We need to exlude it from the visualization test.
    if (vis.name !== "symbiosis") {
      describe(`${vis.name} visualization`, () => {
        it("should render a visualization container, title, visualization, explanation, and quiz", async () => {
          const { container, getAllByTestId } = renderWithRedux(
            components[index],
            {
              initialState: {
                [`${vis.name}Reducer`]: {
                  data: {
                    ...vis.minTestData,
                  },
                },
              },
            }
          );

          await waitFor(() => getAllByTestId("vis-container"));
          expect(getAllByTestId("vis-title")[0]).toBeInTheDocument();
          expect(
            container.querySelector("svg") || container.querySelector("canvas")
          ).toBeInTheDocument();
          expect(getAllByTestId("vis-explanation")[0]).toBeInTheDocument();
          expect(getAllByTestId("vis-quiz")[0]).toBeInTheDocument();
        });
      });
    }
  });
});

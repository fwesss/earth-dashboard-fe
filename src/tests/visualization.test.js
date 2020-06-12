import React from "react";
import { waitFor } from "@testing-library/react";
import renderWithRedux from "../utils/testingUtils";
import BubblesVis from "../features/visualizations/covid/bubbles/BubblesVis";
import AirVis from "../features/visualizations/covid/air/AirVis";
import RacingData from "../features/visualizations/covid/Racing-Chart/RacingData";
import CasesVis from "../features/visualizations/covid/cases/CasesVis";
import CountryVis from "../features/visualizations/deforestation/country/CountryVis";
import CountryIncomeVis from "../features/visualizations/deforestation/income/CountryIncomeVis";
import Migration from "../features/visualizations/migration/Migration";

const visualizations = [
  {
    name: "bubbles",
    component: <BubblesVis />,
    initialStateData: {
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
  {
    name: "airQuality",
    component: <AirVis />,
    initialStateData: {
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
  {
    name: "racing",
    component: <RacingData />,
    initialStateData: {
      deaths: [
        {
          country: "China",
          date: "2020-01-22T08:00:00.000Z",
          deaths: 17,
          color: "#fb8072",
        },
      ],
    },
  },
  {
    name: "heatmap",
    component: <CasesVis />,
    initialStateData: {
      dates: ["01-22-20", "01-23-20"],
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
        ],
        type: "FeatureCollection",
      },
    },
  },
  {
    name: "deforestation",
    component: <CountryVis />,
    initialStateData: {
      country: [
        {
          name: "Argentina",
          x: 1990,
          y: 12.7135335022,
        },
      ],
    },
  },
  {
    name: "deforestation",
    component: <CountryIncomeVis />,
    initialStateData: {
      countryIncome: [
        {
          incomeLevel: "High Income Countries",
          x: 1990,
          y: 28.4507844367,
        },
      ],
    },
  },
  {
    name: "migration",
    component: <Migration />,
    initialStateData: {
      migration: [
        {
          year: "1970",
          density: [
            {
              x: -10,
              y: 9,
              y0: 9,
            },
          ],
          color: "rgb(84, 101, 214)",
        },
      ],
    },
  },
];

describe("Visualizations", () => {
  visualizations.forEach((vis) => {
    describe(`${vis.name} visualization`, () => {
      it("should render a visualization container, title, visualization, and explanation", async () => {
        const { container, getAllByTestId } = renderWithRedux(vis.component, {
          initialState: {
            [`${vis.name}Reducer`]: {
              data: {
                ...vis.initialStateData,
              },
            },
          },
        });

        await waitFor(() => getAllByTestId("vis-container"));
        expect(getAllByTestId("vis-title")[0]).toBeInTheDocument();
        expect(
          container.querySelector("svg") || container.querySelector("canvas")
        ).toBeInTheDocument();
        expect(getAllByTestId("vis-explanation")[0]).toBeInTheDocument();
      });
    });
  });
});

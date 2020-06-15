import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import bubbles from "../../api/covid/bubbles";
import racing from "../../api/covid/racing";
import airQuality from "../../api/covid/airQuality";
import heatmap from "../../api/covid/heatmap";
import deforestation from "../../api/deforestation/prediction";
import migration from "../../api/migration/migration";
import BubblesVis from "./covid/bubbles/BubblesVis";
import RacingData from "./covid/racing/RacingData";
import AirVis from "./covid/air/AirVis";
import CasesVis from "./covid/cases/CasesVis";
import CountryVis from "./deforestation/country/CountryVis";
import CountryIncomeVis from "./deforestation/income/CountryIncomeVis";
import Migration from "./migration/pattern/Migration";

const initialStateBuilder = (initialData) => ({
  fetching: false,
  success: null,
  error: null,
  data: {
    ...initialData,
  },
});

const fetchingReducers = {
  fetchingData(state) {
    return {
      ...state,
      fetching: true,
      success: null,
      error: null,
    };
  },

  fetchingDataSuccess(state, action) {
    const { data, rest } = JSON.parse(action.payload);

    return {
      ...state,
      fetching: false,
      success: rest,
      data,
      error: null,
    };
  },

  fetchingDataError(state, action) {
    return {
      ...state,
      fetching: false,
      error: JSON.parse(action.payload),
      success: null,
    };
  },
};

const getData = (requestData, actions) => () => async (dispatch) => {
  dispatch(actions.fetchingData());
  try {
    const apiResponse = await requestData();
    dispatch(actions.fetchingDataSuccess(JSON.stringify(apiResponse)));
  } catch (fetchError) {
    dispatch(actions.fetchingDataError(JSON.stringify(fetchError)));
  }
};

const sliceBuilder = (name, initialData) => ({
  slice: createSlice({
    name,
    initialState: initialStateBuilder(initialData),
    reducers: fetchingReducers,
  }),
  initialState: initialStateBuilder(initialData),
  getData,
  fetching: (state) => state[name].fetching,
  success: (state) => state[name].success,
  error: (state) => state[name].error,
  data: (state) => state[name].data,
});

export const visualizations = [
  {
    name: "bubbles",
    displayName: "Bubbles",
    topic: "COVID-19",
    path: "/covid/bubbles/BubblesVis",
    initialData: {
      summary: null,
    },
    fetchMethod: bubbles,
    minTestData: {
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
    component: <BubblesVis />,
  },
  {
    name: "racing",
    displayName: "Racing",
    topic: "COVID-19",
    path: "/covid/racing/RacingData",
    initialData: {
      deaths: null,
    },
    fetchMethod: racing,
    minTestData: {
      deaths: [
        {
          country: "China",
          date: "2020-01-22T08:00:00.000Z",
          deaths: 17,
          color: "#fb8072",
        },
      ],
    },
    component: <RacingData />,
  },
  {
    name: "airQuality",
    displayName: "Air Quality",
    topic: "COVID-19",
    path: "/covid/air/AirVis",
    initialData: {
      dates: null,
      airQuality: null,
      cases: null,
    },
    fetchMethod: airQuality,
    minTestData: {
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
    component: <AirVis />,
  },
  {
    name: "heatmap",
    displayName: "Heatmap",
    topic: "COVID-19",
    path: "/covid/cases/CasesVis",
    initialData: {
      cases: null,
      dates: [null, null],
    },
    fetchMethod: heatmap,
    minTestData: {
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
    component: <CasesVis />,
  },
  {
    name: "country",
    displayName: "By Country",
    topic: "Deforestation",
    path: "/deforestation/country/CountryVis",
    initialData: {
      countryIncome: null,
      country: null,
    },
    fetchMethod: deforestation,
    minTestData: {
      country: [
        {
          name: "Argentina",
          x: 1990,
          y: 12.7135335022,
        },
      ],
    },
    component: <CountryVis />,
  },
  {
    name: "countryIncome",
    displayName: "By Country Income",
    topic: "Deforestation",
    path: "/deforestation/income/CountryIncomeVis",
    initialData: {
      countryIncome: null,
      country: null,
    },
    fetchMethod: deforestation,
    minTestData: {
      countryIncome: [
        {
          incomeLevel: "High Income Countries",
          x: 1990,
          y: 28.4507844367,
        },
      ],
    },
    component: <CountryIncomeVis />,
  },
  {
    name: "pattern",
    displayName: "Pattern",
    topic: "Migration",
    path: "/migration/pattern/Migration",
    initialData: {
      migration: null,
    },
    fetchMethod: migration,
    minTestData: {
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
    component: <Migration />,
  },
];

export const slices = visualizations.map(({ name, initialData, fetchMethod }) =>
  sliceBuilder(name, initialData, fetchMethod)
);

export const visStates = Object.fromEntries(
  Object.entries({
    ...slices,
  }).map(([key, val], index) => [
    visualizations[+key].name,
    {
      ...val,
      getData: getData(visualizations[index].fetchMethod, val.slice.actions),
    },
  ])
);

export const visualizationReducers = Object.fromEntries(
  Object.entries({
    ...slices.map((vis) => vis.slice.reducer),
  }).map(([key, val]) => [`${visualizations[+key].name}Reducer`, val])
);

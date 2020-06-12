import { combineReducers, createSlice } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import bubbles from "../api/covid/bubbles";
import racing from "../api/covid/racing";
import airQuality from "../api/covid/airQuality";
import heatmap from "../api/covid/heatmap";
import deforestation from "../api/deforestation/prediction";
import migration from "../api/migration/migration";

const initialStateBuilder = (stateData) => ({
  fetching: false,
  success: null,
  error: null,
  data: {
    ...stateData,
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

const sliceBuilder = (name, stateData) => ({
  slice: createSlice({
    name,
    initialState: initialStateBuilder(stateData),
    reducers: fetchingReducers,
  }),
  initialState: initialStateBuilder(stateData),
  getData,
  fetching: (state) => state[name].fetching,
  success: (state) => state[name].success,
  error: (state) => state[name].error,
  data: (state) => state[name].data,
});

const visualizations = [
  {
    name: "bubbles",
    stateData: {
      summary: null,
    },
    fetchMethod: bubbles,
  },
  {
    name: "racing",
    stateData: {
      deaths: null,
    },
    fetchMethod: racing,
  },
  {
    name: "airQuality",
    stateData: {
      dates: null,
      airQuality: null,
      cases: null,
    },
    fetchMethod: airQuality,
  },
  {
    name: "heatmap",
    stateData: {
      cases: null,
      dates: [null, null],
    },
    fetchMethod: heatmap,
  },
  {
    name: "deforestation",
    stateData: {
      countryIncome: null,
      country: null,
    },
    fetchMethod: deforestation,
  },
  {
    name: "migration",
    stateData: {
      migration: null,
    },
    fetchMethod: migration,
  },
];

export const slices = visualizations.map(({ name, stateData, fetchMethod }) =>
  sliceBuilder(name, stateData, fetchMethod)
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

const visualizationReducers = Object.fromEntries(
  Object.entries({
    ...slices.map((vis) => vis.slice.reducer),
  }).map(([key, val]) => [`${visualizations[+key].name}Reducer`, val])
);

export default combineReducers({
  themeReducer,
  ...visualizationReducers,
});

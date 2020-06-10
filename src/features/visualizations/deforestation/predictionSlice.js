import { createSlice } from "@reduxjs/toolkit";
import api from "../../../api/deforestation/prediction";

export const initialState = {
  fetching: false,
  success: null,
  error: null,
  countryIncome: null,
  country: null,
};

const predictionSlice = createSlice({
  name: "deforestation",
  initialState,
  reducers: {
    fetchingPredictions(state) {
      return {
        ...state,
        fetching: true,
        success: null,
        error: null,
      };
    },

    fetchPredictionsSuccess(state, action) {
      const { data, rest } = JSON.parse(action.payload);

      return {
        ...state,
        fetching: false,
        success: rest,
        countryIncome: data
          .filter(
            (datum) =>
              datum["Country Code"] === "HIC" ||
              datum["Country Code"] === "MIC" ||
              datum["Country Code"] === "LIC"
          )
          .map((country) => ({
            incomeLevel: country["Country Name"],
            x: country.Year,
            y: country["Forest area (% of land area)"],
          })),
        country: data
          .filter(
            (datum) =>
              datum["Country Name"] === "Cambodia" ||
              datum["Country Name"] === "India" ||
              datum["Country Name"] === "United States of America" ||
              datum["Country Name"] === "United Kingdom" ||
              datum["Country Name"] === "Argentina" ||
              datum["Country Name"] === "Brazil"
          )
          .map((country) => ({
            name: country["Country Name"],
            x: country.Year,
            y:
              country["Forest area (% of land area)"] >= 0
                ? country["Forest area (% of land area)"]
                : 0,
          })),
        error: null,
      };
    },

    fetchPredictionsError(state, action) {
      return {
        ...state,
        fetching: false,
        error: JSON.parse(action.payload),
        success: null,
      };
    },
  },
});

export const {
  fetchingPredictions,
  fetchPredictionsSuccess,
  fetchPredictionsError,
} = predictionSlice.actions;

export default predictionSlice.reducer;

// Export the selectors for ease of testing
export const fetching = (state) => state.prediction.fetching;
export const success = (state) => state.prediction.success;
export const error = (state) => state.prediction.error;
export const countryIncome = (state) => state.prediction.countryIncome;
export const country = (state) => state.prediction.country;

// Serializing API response by stringifying it
export const getPredictions = () => async (dispatch) => {
  dispatch(fetchingPredictions());
  try {
    const predictionResponse = await api.requestPredictionData();
    dispatch(fetchPredictionsSuccess(JSON.stringify(predictionResponse)));
  } catch (fetchError) {
    dispatch(fetchPredictionsError(JSON.stringify(fetchError)));
  }
};

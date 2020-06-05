import { createSlice } from "@reduxjs/toolkit";
import api from "../../../../api/covid/air";

export const initialState = {
  fetching: false,
  success: null,
  error: null,
  dates: null,
  airQuality: null,
  cases: null,
};

const airSlice = createSlice({
  name: "air",
  initialState,
  reducers: {
    fetchingAirQuality(state) {
      return {
        ...state,
        fetching: true,
        success: null,
        error: null,
      };
    },

    fetchAirQualitySuccess(state, action) {
      const { data, rest } = JSON.parse(action.payload);

      return {
        ...state,
        fetching: false,
        success: rest,
        dates: data.dates,
        airQuality: data.airQuality,
        cases: data.cases,
        error: null,
      };
    },

    fetchAirQualityError(state, action) {
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
  fetchingAirQuality,
  fetchAirQualitySuccess,
  fetchAirQualityError,
} = airSlice.actions;

export default airSlice.reducer;

// Export the selectors for ease of testing
export const fetching = (state) => state.air.fetching;
export const success = (state) => state.air.success;
export const error = (state) => state.air.error;
export const dates = (state) => state.air.dates;
export const airQuality = (state) => state.air.airQuality;
export const cases = (state) => state.air.cases;

// Serializing API response by stringifying it
export const getAirQuality = () => async (dispatch) => {
  dispatch(fetchingAirQuality());
  try {
    const airQualityResponse = await api.requestAirData();
    dispatch(fetchAirQualitySuccess(JSON.stringify(airQualityResponse)));
  } catch (fetchError) {
    dispatch(fetchAirQualityError(JSON.stringify(fetchError)));
  }
};

import { createSlice } from "@reduxjs/toolkit";
import GeoJSON from "geojson";
import api from "../../../api/cases";

export const initialState = {
  fetching: false,
  success: null,
  error: null,
  cases: null,
  dates: [null, null],
};

const casesSlice = createSlice({
  name: "cases",
  initialState,
  reducers: {
    fetchingCases(state) {
      return {
        ...state,
        fetching: true,
        success: null,
        error: null,
      };
    },

    fetchCasesSuccess(state, action) {
      const { data, rest } = JSON.parse(action.payload);

      return {
        ...state,
        fetching: false,
        success: rest,
        cases: GeoJSON.parse(data.cases, {
          Point: ["lat", "lon"],
        }),
        dates: data.dates,
        error: null,
      };
    },

    fetchCasesError(state, action) {
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
  fetchingCases,
  fetchCasesSuccess,
  fetchCasesError,
} = casesSlice.actions;

export default casesSlice.reducer;

export const fetching = (state) => state.cases.fetching;
export const success = (state) => state.cases.success;
export const error = (state) => state.cases.error;
export const cases = (state) => state.cases.cases;
export const dates = (state) => state.cases.dates;

export const getCases = () => async (dispatch) => {
  dispatch(fetchingCases());
  try {
    const casesResponse = await api.requestCases();
    dispatch(fetchCasesSuccess(JSON.stringify(casesResponse)));
  } catch (fetchError) {
    dispatch(fetchCasesError(JSON.stringify(fetchError)));
  }
};

import { createSlice } from "@reduxjs/toolkit";
import requestCases from "../../../api/cases";

const initialState = {
  fetching: false,
  success: null,
  error: null,
  cases: null,
};

const cases = createSlice({
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
        cases: data,
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
} = cases.actions;

export default cases.reducer;

export const getCases = () => async (dispatch) => {
  dispatch(fetchingCases());
  try {
    const casesResponse = await requestCases();
    dispatch(fetchCasesSuccess(JSON.stringify(casesResponse)));
  } catch (error) {
    dispatch(fetchCasesError(JSON.stringify(error)));
  }
};

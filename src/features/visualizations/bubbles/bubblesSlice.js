import { createSlice } from "@reduxjs/toolkit";
import api from "../../../api/bubbles";

export const initialState = {
  fetching: true,
  success: null,
  error: null,
  summary: null,
};

const bubblesSlice = createSlice({
  name: "bubbles",
  initialState,
  reducers: {
    fetchingSummary(state) {
      return {
        ...state,
        fetching: true,
        success: null,
        error: null,
      };
    },

    fetchSummarySuccess(state, action) {
      const { data, rest } = JSON.parse(action.payload);

      return {
        ...state,
        fetching: false,
        success: rest,
        summary: data,
        error: null,
      };
    },

    fetchSummaryError(state, action) {
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
  fetchingSummary,
  fetchSummarySuccess,
  fetchSummaryError,
} = bubblesSlice.actions;

export default bubblesSlice.reducer;

// Export the selectors for ease of testing
export const fetching = (state) => state.bubbles.fetching;
export const success = (state) => state.bubbles.success;
export const error = (state) => state.bubbles.error;
export const summary = (state) => state.bubbles.summary;

// Serializing API response by stringifying it
export const getSummary = () => async (dispatch) => {
  dispatch(fetchingSummary());
  try {
    const summaryResponse = await api.requestSummary();
    dispatch(fetchSummarySuccess(JSON.stringify(summaryResponse)));
  } catch (fetchError) {
    dispatch(fetchSummaryError(JSON.stringify(fetchError)));
  }
};

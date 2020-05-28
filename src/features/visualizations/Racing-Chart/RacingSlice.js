import { createSlice } from "@reduxjs/toolkit";
import { schemeSet3 } from "d3";
import api from "../../../api/racing";

export const initialState = {
  fetching: true,
  success: null,
  error: null,
  deaths: null,
};

const RacingSlice = createSlice({
  name: "racing",
  initialState,
  reducers: {
    fetchingDeathCases(state) {
      return {
        ...state,
        fetching: true,
        success: null,
        error: null,
      };
    },

    fetchDeathCasesSuccess(state, action) {
      const { data, rest } = JSON.parse(action.payload);

      /*
       * For visual clarity, each country should have a persistent color. While the bars are switching around, it's easier
       * to follow a specific country by tracking it's color rather than text label alone.
       *
       * The rest of the visualizations are using colors from D3 schemeSet3[]. For app cohesion, we want this graph to utilize
       * those same colors.
       *
       * We need to assign a color from schemeSet3 to each country. To tie a color to a country, we can hash the name of the
       * country and use that as an index to access a color from schemeSet3[]. Because hashString returns the same output each
       * time it runs with the same input, we'll always get the same color for a country.
       *
       * The result is our data array except a color property has been added to each object.
       */
      const hashString = (input) =>
        [...input]
          .map((character) => character.charCodeAt(0))
          .reduce((accumulator, currentValue) => accumulator + currentValue) %
        schemeSet3.length;

      return {
        ...state,
        fetching: false,
        success: rest,
        deaths: data.map((x) => ({
          ...x,
          date: new Date(
            x.date.substring(0, 4),
            x.date.substring(5, 7) - 1,
            x.date.substring(8, 10)
          ),
          color: schemeSet3[hashString(x.country)],
        })),
        error: null,
      };
    },

    fetchDeathCasesError(state, action) {
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
  fetchingDeathCases,
  fetchDeathCasesSuccess,
  fetchDeathCasesError,
} = RacingSlice.actions;

export default RacingSlice.reducer;

// Export the selectors for ease of testing
export const fetching = (state) => state.bracingfetching;
export const success = (state) => state.racing.success;
export const error = (state) => state.racing.error;
export const summary = (state) => state.racing.summary;

// Serializing API response by stringifying it
export const getConfirmedCases = () => async (dispatch) => {
  dispatch(fetchingDeathCases());
  try {
    const confirmedCasesResponse = await api.requestDeaths();
    dispatch(fetchDeathCasesSuccess(JSON.stringify(confirmedCasesResponse)));
  } catch (fetchError) {
    dispatch(fetchDeathCasesError(JSON.stringify(fetchError)));
  }
};

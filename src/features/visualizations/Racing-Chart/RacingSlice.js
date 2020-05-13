import { createSlice } from "@reduxjs/toolkit";
import api from '../../../api/racing.js'

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

            return {
                ...state,
                fetching: false,
                success: rest,
                deaths: data,
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
        const confirmedCasesResponse = await api.requestConfirmed();
        dispatch(fetchDeathCasesSuccess(JSON.stringify(confirmedCasesResponse)));
        console.log("case data", confirmedCasesResponse)
    } catch (fetchError) {
        dispatch(fetchDeathCasesError(JSON.stringify(fetchError)));
    }
};

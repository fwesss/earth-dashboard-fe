import { createSlice } from "@reduxjs/toolkit";
import api from "../../../api/migration/migration";

export const initialState = {
  fetching: false,
  success: null,
  error: null,
  migration: null,
};

const migrationSlice = createSlice({
  name: "migration",
  initialState,
  reducers: {
    fetchingMigrations(state) {
      return {
        ...state,
        fetching: true,
        success: null,
        error: null,
      };
    },

    fetchMigrationsSuccess(state, action) {
      const { data, rest } = JSON.parse(action.payload);

      return {
        ...state,
        fetching: false,
        success: rest,
        migration: data,
        error: null,
      };
    },

    fetchMigrationsError(state, action) {
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
  fetchingMigrations,
  fetchMigrationsSuccess,
  fetchMigrationsError,
} = migrationSlice.actions;

export default migrationSlice.reducer;

// Export the selectors for ease of testing
export const fetching = (state) => state.migration.fetching;
export const success = (state) => state.migration.success;
export const error = (state) => state.migration.error;
export const migration = (state) => state.migration.migration;

// Serializing API response by stringifying it
export const getMigrations = () => async (dispatch) => {
  dispatch(fetchingMigrations());
  try {
    const migrationResponse = await api.requestMigrationData();
    dispatch(fetchMigrationsSuccess(JSON.stringify(migrationResponse)));
  } catch (fetchError) {
    dispatch(fetchMigrationsError(JSON.stringify(fetchError)));
  }
};

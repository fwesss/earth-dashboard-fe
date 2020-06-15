import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {{darkMode: boolean}} State
 */
export const initialState = {
  /*
   * If there is a color preference stored in localStorage from a previous visit,
   * use that value. Otherwise, default to a light theme.
   */
  darkMode: JSON.parse(localStorage.getItem("darkMode"))
    ? JSON.parse(localStorage.getItem("darkMode"))
    : false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    /**
     * Toggles theme state from light/dark
     *
     * @param {State} state - Current theme state
     * @returns {State} - The new theme state
     */
    toggleDarkMode(state) {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;

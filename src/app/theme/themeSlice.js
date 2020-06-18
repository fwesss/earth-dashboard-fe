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
  showSplash: true,
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

    toggleShowSplash(state) {
      return {
        ...state,
        showSplash: false,
      };
    },
  },
});

export const { toggleDarkMode, toggleShowSplash } = themeSlice.actions;

export default themeSlice.reducer;

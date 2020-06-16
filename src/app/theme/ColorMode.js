// eslint-disable-next-line
import React, { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness4RoundedIcon from "@material-ui/icons/Brightness4Rounded";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "./themeSlice";

/**
 * Clicking on the color mode icon sets the darkMode flag in Redux and saves that variable to localStorage.
 * Their preference will persist between site visits.
 *
 * @name ColorMode
 * @returns {FC} - A button that will toggle the theme color scheme dark/light
 */
export default () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.themeReducer);

  return (
    <>
      {darkMode ? (
        <IconButton
          onClick={() => {
            localStorage.setItem("darkMode", "false");
            dispatch(toggleDarkMode(false));
          }}
          aria-label="toggleLightMode"
        >
          <Brightness7RoundedIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => {
            localStorage.setItem("darkMode", "true");
            dispatch(toggleDarkMode(true));
          }}
          aria-label="toggleDarkMode"
        >
          <Brightness4RoundedIcon />
        </IconButton>
      )}
    </>
  );
};

import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../app/rootReducer";

/*
 * Renders component with a custom initialState. Functions the same as render from react-testing-library
 * except it takes in an initialState object as the 2nd parameter. This allows us to render a component
 * with a preloaded state.
 */

const renderWithRedux = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
  }
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};

export default renderWithRedux;

import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../app/store";

const renderWithRedux = (
  ui,
  {
    initialState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
    }),
  } = {}
) => {
  return { ...render(<Provider store={store}>{ui}</Provider>), store };
};

export default renderWithRedux;

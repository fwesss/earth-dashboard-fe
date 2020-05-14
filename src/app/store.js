import { configureStore, combineReducers } from "@reduxjs/toolkit";
import casesReducer from "../features/visualizations/cases/casesSlice";
import bubblesReducer from "../features/visualizations/bubbles/bubblesSlice";
import airReducer from "../features/visualizations/air/airSlice";

export const rootReducer = combineReducers({
  casesReducer,
  bubblesReducer,
  airReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

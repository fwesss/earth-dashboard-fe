import { configureStore, combineReducers } from "@reduxjs/toolkit";
import casesReducer from "../features/visualizations/cases/casesSlice";
import bubblesReducer from "../features/visualizations/bubbles/bubblesSlice";
import racingReducer from "../features/visualizations/Racing-Chart/RacingSlice";
import airReducer from "../features/visualizations/air/airSlice";

export const rootReducer = combineReducers({
  casesReducer,
  bubblesReducer,
  racingReducer,
  airReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

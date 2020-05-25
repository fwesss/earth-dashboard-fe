import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import casesReducer from "../features/visualizations/cases/casesSlice";
import bubblesReducer from "../features/visualizations/bubbles/bubblesSlice";
import racingReducer from "../features/visualizations/Racing-Chart/RacingSlice";
import airReducer from "../features/visualizations/air/airSlice";

const rootReducer = combineReducers({
  themeReducer,
  casesReducer,
  bubblesReducer,
  racingReducer,
  airReducer,
});

export default rootReducer;

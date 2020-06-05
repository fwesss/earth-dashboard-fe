import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import casesReducer from "../features/visualizations/covid/cases/casesSlice";
import bubblesReducer from "../features/visualizations/covid/bubbles/bubblesSlice";
import racingReducer from "../features/visualizations/covid/Racing-Chart/RacingSlice";
import airReducer from "../features/visualizations/covid/air/airSlice";
import predictionReducer from "../features/visualizations/deforestation/prediction/predictionSlice";

const rootReducer = combineReducers({
  themeReducer,
  casesReducer,
  bubblesReducer,
  racingReducer,
  airReducer,
  predictionReducer,
});

export default rootReducer;

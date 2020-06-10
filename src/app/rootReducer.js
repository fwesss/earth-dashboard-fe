import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import casesReducer from "../features/visualizations/covid/cases/casesSlice";
import bubblesReducer from "../features/visualizations/covid/bubbles/bubblesSlice";
import racingReducer from "../features/visualizations/covid/Racing-Chart/RacingSlice";
import airReducer from "../features/visualizations/covid/air/airSlice";
import predictionReducer from "../features/visualizations/deforestation/predictionSlice";
import migrationReducer from "../features/visualizations/migration/migrationSlice";

const rootReducer = combineReducers({
  themeReducer,
  casesReducer,
  bubblesReducer,
  racingReducer,
  airReducer,
  predictionReducer,
  migrationReducer,
});

export default rootReducer;

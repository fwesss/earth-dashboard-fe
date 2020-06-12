import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import { visualizationReducers } from "../features/visualizations/visConstructor";

export default combineReducers({
  themeReducer,
  ...visualizationReducers,
});

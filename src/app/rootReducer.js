import { combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import quizProgressReducer from "../features/quiz/quizProgressSlice";
import { visualizationReducers } from "../features/visualizations/visConstructor";

export default combineReducers({
  themeReducer,
  quizProgressReducer,
  ...visualizationReducers,
});

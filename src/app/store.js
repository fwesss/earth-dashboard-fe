import { configureStore, combineReducers } from "@reduxjs/toolkit";
import casesReducer from "../features/visualizations/cases/casesSlice";

export const rootReducer = combineReducers({
  casesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

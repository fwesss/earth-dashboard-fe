import { configureStore, combineReducers } from "@reduxjs/toolkit";
import casesReducer from "../features/visualizations/cases/casesSlice";
import bubblesReducer from "../features/visualizations/bubbles/bubblesSlice";

export const rootReducer = combineReducers({
    casesReducer,
    bubblesReducer,
    racingReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

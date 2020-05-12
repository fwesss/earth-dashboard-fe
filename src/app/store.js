import { configureStore, combineReducers } from "@reduxjs/toolkit";
import casesReducer from "../features/visualizations/cases/casesSlice";
import racingReducer from "../features/visualizations/cases/Racing-Chart/RacingSlice";

export const rootReducer = combineReducers({
    casesReducer,
    racingReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

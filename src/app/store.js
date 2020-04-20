import { configureStore } from "@reduxjs/toolkit";
import casesReducer from "../features/visualizations/cases/casesSlice";

export default configureStore({
  reducer: {
    casesVis: casesReducer,
  },
});

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

/*
 * The size of the state is large due to the amount of data fetched for
 * the heatmap. Turning off checks for state serialization and immutability
 * drastically improves dev performance and memory usage.
 */
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

/*
 * When a temperature is made in development, refresh the changed component and hot swap
 * the Redux store. This allows us to make changes without fetching data for all
 * components.
 */
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  immutableCheck: false,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;

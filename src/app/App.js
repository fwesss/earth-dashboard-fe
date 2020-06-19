import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import * as THREE from "three";
import Splash from "../features/landing/Splash";
import store from "./store";

window.THREE = THREE;
const LazyApp = lazy(() => import("./LazyApp"));

export default () => (
  <Suspense fallback={<Splash />}>
    <Provider store={store}>
      <LazyApp />
    </Provider>
  </Suspense>
);

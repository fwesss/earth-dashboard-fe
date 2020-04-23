import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./app/store";

describe("App", () => {
  it("should render", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByTestId("app")).toBeInTheDocument();
  });
});

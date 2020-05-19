import React, { useState } from "react";
import { render, waitFor } from "@testing-library/react";
import useInterval from "./useInterval";

const TestComponent = () => {
  const [numbers, setNumbers] = useState([0]);
  useInterval(() => setNumbers([...numbers, numbers.length]), 50);

  return numbers.map((number) => <p key={number}>{number}</p>);
};

describe("CasesVis", () => {
  it("should delay call of the cb by set interval", async () => {
    const { getByText } = render(<TestComponent />);

    await waitFor(() => expect(getByText(/1/)).toBeInTheDocument());
  });
});

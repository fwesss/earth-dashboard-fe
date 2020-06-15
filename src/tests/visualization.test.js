import { waitFor } from "@testing-library/react";
import renderWithRedux from "../utils/testingUtils";
import { visualizations } from "../features/visualizations/visConstructor";

describe("Visualizations", () => {
  visualizations.forEach((vis) => {
    describe(`${vis.name} visualization`, () => {
      it("should render a visualization container, title, visualization, and explanation", async () => {
        const { container, getAllByTestId } = renderWithRedux(vis.component, {
          initialState: {
            [`${vis.name}Reducer`]: {
              data: {
                ...vis.minTestData,
              },
            },
          },
        });

        await waitFor(() => getAllByTestId("vis-container"));
        expect(getAllByTestId("vis-title")[0]).toBeInTheDocument();
        expect(
          container.querySelector("svg") || container.querySelector("canvas")
        ).toBeInTheDocument();
        expect(getAllByTestId("vis-explanation")[0]).toBeInTheDocument();
      });
    });
  });
});

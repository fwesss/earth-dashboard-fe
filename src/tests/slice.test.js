import { slices } from "../features/visualizations/visConstructor";

describe("redux slices", () => {
  slices.forEach((visualization) => {
    describe(`${visualization.slice.name} slice`, () => {
      describe("reducer, actions, and selectors", () => {
        it("should return the initial state on first run", () => {
          const nextState = visualization.initialState;
          const result = visualization.slice.reducer(undefined, {});
          expect(result).toEqual(nextState);
        });

        it("should handle fetching data", () => {
          const nextState = visualization.slice.reducer(
            visualization.initialState,
            visualization.slice.actions.fetchingData()
          );

          const rootState = { [visualization.slice.name]: nextState };
          expect(visualization.fetching(rootState)).toEqual(true);
          expect(visualization.success(rootState)).toBeNull();
          expect(visualization.error(rootState)).toBeNull();
        });

        it("should handle a successful fetch of data", () => {
          const dataPayload = Object.keys(visualization.data).map((datum) => ({
            [datum]: [1, 2, 3],
          }));

          const payload = {
            rest: 1,
            data: {
              dataPayload,
            },
          };

          const nextState = visualization.slice.reducer(
            visualization.initialState,
            visualization.slice.actions.fetchingDataSuccess(
              JSON.stringify(payload)
            )
          );

          const rootState = { [visualization.slice.name]: nextState };
          expect(visualization.fetching(rootState)).toEqual(false);
          expect(visualization.success(rootState)).toEqual(payload.rest);
          expect(visualization.data(rootState)).toEqual({
            dataPayload,
          });
          expect(visualization.error(rootState)).toBeNull();
        });

        it("should handle a failure to fetch data", () => {
          const fetchError = new Error("Could not connect to DB");

          const nextState = visualization.slice.reducer(
            visualization.initialState,
            visualization.slice.actions.fetchingDataError(
              JSON.stringify({ error: fetchError.message })
            )
          );

          const rootState = { [visualization.slice.name]: nextState };
          expect(visualization.fetching(rootState)).toEqual(false);
          expect(visualization.error(rootState)).toEqual({
            error: fetchError.message,
          });
          expect(visualization.success(rootState)).toBeNull();
        });
      });
    });
  });
});

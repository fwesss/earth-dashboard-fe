import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, {
  initialState,
  fetchingSummary,
  fetchSummarySuccess,
  fetchSummaryError,
  getSummary,
  fetching,
  success,
  error,
  summary,
} from "./bubblesSlice";
import api from "../../../../api/covid/bubbles";

describe("bubbles slice", () => {
  describe("reducer, actions, and selectors", () => {
    it("should return the initial state on first run", () => {
      const nextState = initialState;
      const result = reducer(undefined, {});
      expect(result).toEqual(nextState);
    });

    it("should handle fetching data", () => {
      const nextState = reducer(initialState, fetchingSummary());

      const rootState = { bubbles: nextState };
      expect(fetching(rootState)).toEqual(true);
      expect(success(rootState)).toBeNull();
      expect(error(rootState)).toBeNull();
    });

    it("should handle a successful fetch of data", () => {
      const payload = {
        rest: 1,
        data: {
          summary: [{ lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" }],
        },
      };

      const nextState = reducer(
        initialState,
        fetchSummarySuccess(JSON.stringify(payload))
      );

      const rootState = { bubbles: nextState };
      expect(fetching(rootState)).toEqual(false);
      expect(success(rootState)).toEqual(payload.rest);
      expect(summary(rootState)).toEqual({
        summary: [{ lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" }],
      });
      expect(error(rootState)).toBeNull();
    });

    it("should handle a failure to fetch data", () => {
      const fetchError = new Error("Could not connect to DB");

      const nextState = reducer(
        initialState,
        fetchSummaryError(JSON.stringify({ error: fetchError.message }))
      );

      const rootState = { bubbles: nextState };
      expect(fetching(rootState)).toEqual(false);
      expect(error(rootState)).toEqual({ error: fetchError.message });
      expect(success(rootState)).toBeNull();
    });
  });
});

jest.mock("../../../../api/covid/bubbles");

const mockStore = configureMockStore([thunk]);

describe("thunks", () => {
  it("should create both fetchingSummary and fetchSummarySuccess when fetching succeeds", async () => {
    const responsePayload = {
      summary: [{ lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" }],
    };
    const store = mockStore(initialState);
    api.requestSummary.mockResolvedValueOnce(responsePayload);

    await store.dispatch(getSummary());

    const expectedActions = [
      fetchingSummary(),
      fetchSummarySuccess(JSON.stringify(responsePayload)),
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create both fetchingSummary and fetchSummaryError when fetching fails", async () => {
    const responseError = new Error("Failed to connect to DB");
    const store = mockStore(initialState);
    api.requestSummary.mockRejectedValueOnce(responseError);

    await store.dispatch(getSummary());

    const expectedActions = [
      fetchingSummary(),
      fetchSummaryError(JSON.stringify(responseError)),
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});

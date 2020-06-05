import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, {
  initialState,
  fetchingCases,
  fetchCasesSuccess,
  fetchCasesError,
  getCases,
  fetching,
  success,
  error,
  cases,
  dates,
} from "./casesSlice";
import api from "../../../../api/covid/cases";

describe("cases slice", () => {
  describe("reducer, actions, and selectors", () => {
    it("should return the initial state on first run", () => {
      const nextState = initialState;
      const result = reducer(undefined, {});
      expect(result).toEqual(nextState);
    });

    it("should handle fetching cases", () => {
      const nextState = reducer(initialState, fetchingCases());

      const rootState = { cases: nextState };
      expect(fetching(rootState)).toEqual(true);
      expect(success(rootState)).toBeNull();
      expect(error(rootState)).toBeNull();
    });

    it("should handle a successful fetch of cases", () => {
      const payload = {
        rest: 1,
        data: {
          cases: [{ lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" }],
          dates: ["2020-01-23"],
        },
      };

      const nextState = reducer(
        initialState,
        fetchCasesSuccess(JSON.stringify(payload))
      );

      const rootState = { cases: nextState };
      expect(fetching(rootState)).toEqual(false);
      expect(success(rootState)).toEqual(payload.rest);
      expect(cases(rootState)).toEqual({
        features: [
          {
            geometry: { coordinates: [-121.83, 47.49], type: "Point" },
            properties: { cases: 1, date: "2020-01-23" },
            type: "Feature",
          },
        ],
        type: "FeatureCollection",
      });
      expect(dates(rootState)).toEqual(payload.data.dates);
      expect(error(rootState)).toBeNull();
    });

    it("should handle a failure to fetch cases", () => {
      const fetchError = new Error("Could not connect to DB");

      const nextState = reducer(
        initialState,
        fetchCasesError(JSON.stringify({ error: fetchError.message }))
      );

      const rootState = { cases: nextState };
      expect(fetching(rootState)).toEqual(false);
      expect(error(rootState)).toEqual({ error: fetchError.message });
      expect(success(rootState)).toBeNull();
    });
  });
});

jest.mock("../../../../api/covid/cases");

const mockStore = configureMockStore([thunk]);

describe("thunks", () => {
  it("should create both fetchingCases and fetchCasesSuccess when fetching succeeds", async () => {
    const responsePayload = {
      cases: [{ lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" }],
      dates: ["2020-01-23"],
    };
    const store = mockStore(initialState);
    api.requestCases.mockResolvedValueOnce(responsePayload);

    await store.dispatch(getCases());

    const expectedActions = [
      fetchingCases(),
      fetchCasesSuccess(JSON.stringify(responsePayload)),
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create both fetchingCases and fetchCasesError when fetching fails", async () => {
    const responseError = new Error("Failed to connect to DB");
    const store = mockStore(initialState);
    api.requestCases.mockRejectedValueOnce(responseError);

    await store.dispatch(getCases());

    const expectedActions = [
      fetchingCases(),
      fetchCasesError(JSON.stringify(responseError)),
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});

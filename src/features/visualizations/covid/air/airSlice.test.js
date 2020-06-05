import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer, {
  initialState,
  fetchingAirQuality,
  fetchAirQualitySuccess,
  fetchAirQualityError,
  getAirQuality,
  fetching,
  success,
  error,
  dates,
  airQuality,
  cases,
} from "./airSlice";
import api from "../../../../api/covid/air";

describe("air slice", () => {
  describe("reducer, actions, and selectors", () => {
    it("should return the initial state on first run", () => {
      const nextState = initialState;
      const result = reducer(undefined, {});
      expect(result).toEqual(nextState);
    });

    it("should handle fetching data", () => {
      const nextState = reducer(initialState, fetchingAirQuality());

      const rootState = { air: nextState };
      expect(fetching(rootState)).toEqual(true);
      expect(success(rootState)).toBeNull();
      expect(error(rootState)).toBeNull();
    });

    it("should handle a successful fetch of data", () => {
      const payload = {
        rest: 1,
        data: {
          airQuality: [
            { lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" },
          ],
          cases: [{ lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" }],
          dates: ["1/1/2020", "1/2/2020"],
        },
      };

      const nextState = reducer(
        initialState,
        fetchAirQualitySuccess(JSON.stringify(payload))
      );

      const rootState = { air: nextState };
      expect(fetching(rootState)).toEqual(false);
      expect(success(rootState)).toEqual(payload.rest);
      expect(airQuality(rootState)).toEqual([
        { lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" },
      ]);
      expect(cases(rootState)).toEqual([
        { lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" },
      ]);
      expect(dates(rootState)).toEqual(["1/1/2020", "1/2/2020"]);
      expect(error(rootState)).toBeNull();
    });

    it("should handle a failure to fetch data", () => {
      const fetchError = new Error("Could not connect to DB");

      const nextState = reducer(
        initialState,
        fetchAirQualityError(JSON.stringify({ error: fetchError.message }))
      );

      const rootState = { air: nextState };
      expect(fetching(rootState)).toEqual(false);
      expect(error(rootState)).toEqual({ error: fetchError.message });
      expect(success(rootState)).toBeNull();
    });
  });
});

jest.mock("../../../../api/covid/air");

const mockStore = configureMockStore([thunk]);

describe("thunks", () => {
  it("should create both fetchingAirQuality and fetchAirQualitySuccess when fetching succeeds", async () => {
    const responsePayload = {
      airQuality: [{ lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" }],
      cases: [{ lat: 47.49, lon: -121.83, cases: 1, date: "2020-01-23" }],
      dates: ["1/1/2020", "1/2/2020"],
    };
    const store = mockStore(initialState);
    api.requestAirData.mockResolvedValueOnce(responsePayload);

    await store.dispatch(getAirQuality());

    const expectedActions = [
      fetchingAirQuality(),
      fetchAirQualitySuccess(JSON.stringify(responsePayload)),
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should create both fetchingAirQuality and fetchAirQualityError when fetching fails", async () => {
    const responseError = new Error("Failed to connect to DB");
    const store = mockStore(initialState);
    api.requestAirData.mockRejectedValueOnce(responseError);

    await store.dispatch(getAirQuality());

    const expectedActions = [
      fetchingAirQuality(),
      fetchAirQualityError(JSON.stringify(responseError)),
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});

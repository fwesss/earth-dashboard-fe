import "@testing-library/jest-dom/extend-expect";

/*
 * Mocking the Map class and other functions necessary to render mapbox-gl. Jest does not utilize
 * the dom and there are many functions in mapbox that rely on the dom including Web-GL. We need
 * to mock these functions to enable the tests to run.
 */

const mockOn = jest.fn();
const mockAddLayer = jest.fn();
const mockAddControl = jest.fn();
const mockRemove = jest.fn();
const mockAddSource = jest.fn();

jest.mock("mapbox-gl", () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn().mockImplementation(() => ({
    on: mockOn,
    addLayer: mockAddLayer,
    addControl: mockAddControl,
    remove: mockRemove,
    addSource: mockAddSource,
  })),
  NavigationControl: jest.fn(),
}));

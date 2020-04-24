// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

const mockOn = jest.fn();
const mockAddLayer = jest.fn();
const mockAddControl = jest.fn();
const mockRemove = jest.fn();
const mockAddSource = jest.fn();

jest.mock("mapbox-gl", () => {
  return {
    GeolocateControl: jest.fn(),
    Map: jest.fn().mockImplementation(() => {
      return {
        on: mockOn,
        addLayer: mockAddLayer,
        addControl: mockAddControl,
        remove: mockRemove,
        addSource: mockAddSource,
      };
    }),
    NavigationControl: jest.fn(),
  };
});

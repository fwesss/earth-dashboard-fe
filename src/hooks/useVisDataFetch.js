import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { visStates } from "../features/visualizations/visConstructor";

/**
 * Checks if any value of an object property is null
 *
 * @param {object<string, ?any>} data - The object to be checked
 * @returns {boolean} - Whether a value in the object is null
 */
export const checkIfNoData = (data) =>
  Object.values(data).some((value) => value == null);

/**
 * Hook for managing the fetching of visualization data. Will dispatch the thunk for fetching data if any of the values
 * in the visualization's data object are null and the thunk has not already been dispatched. If an error occurs during
 * fetch, an error occurs during fetch, an error is thrown so the error boundary is triggered and a user friendly error
 * component is displayed.
 *
 * @name useVisDataFetch
 * @param {string} vis - The name of the visualization
 * @param {object<string, ?any>} data - The needed to render the visualization
 * @param {boolean} fetching - Whether the visualization data is currently being fetched from the API
 * @param {object<string, ?any>} error - The fetch error
 */
export default (vis, data, fetching, error) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (checkIfNoData(data) && !fetching) {
      dispatch(visStates[vis].getData());
    }
  }, [data, dispatch, fetching, vis]);

  useEffect(() => {
    if (error) {
      throw new Error("Could not retrieve data for visualization");
    }
  }, [error]);
};

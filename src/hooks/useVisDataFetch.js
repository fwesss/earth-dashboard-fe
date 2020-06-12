import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { visStates } from "../features/visualizations/visConstructor";

export const checkIfNoData = (data) =>
  Object.values(data).some((value) => value == null);

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

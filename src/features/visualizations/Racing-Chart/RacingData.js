import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, compareAsc, parseISO } from "date-fns";
import RacingBarChart from "./RacingBarChart";
import useInterval from "../../../hooks/useInterval";
import { getConfirmedCases } from "./RacingSlice";

function RacingData() {
  const dispatch = useDispatch();
  const { deaths, fetching } = useSelector((state) => state.racingReducer);
  const [start, setStart] = useState(false);
  const [data, setData] = useState(null);
  const [dateToFilter, setDateToFilter] = useState(null);

  useEffect(() => {
    if (deaths !== null) {
      setData(
        deaths
          .map((x) => ({
            name: x.country,
            deaths: x.deaths,
            date: x.date,
          }))
          .filter((x) => x.date === deaths[0].date)
      );
      setDateToFilter(new Date(deaths[0].date));
    }
  }, [deaths]);

  useInterval(() => {
    if (start) {
      setData(
        deaths
          .map((x) => ({
            name: x.country,
            deaths: x.deaths,
            date: x.date,
          }))
          .filter((x) => compareAsc(parseISO(x.date), dateToFilter) === 0)
      );
      setDateToFilter(add(dateToFilter, { days: 1 }));
    }
  }, 500);

  useEffect(() => {
    dispatch(getConfirmedCases());
  }, [dispatch]);

  return (
    <>
      <h1>Racing Bar Chart</h1>
      <RacingBarChart data={!fetching && data} />
      <button type="button" onClick={() => setStart(!start)}>
        {start ? "Stop the race" : "Start the race!"}
      </button>
    </>
  );
}

export default RacingData;

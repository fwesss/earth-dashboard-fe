import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, compareAsc, parseISO } from "date-fns";
import { Box, Button, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RacingBarChart from "./RacingBarChart";
import useInterval from "../../../hooks/useInterval";
import { getConfirmedCases } from "./RacingSlice";

const useStyles = makeStyles({
  ChartBox: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  titleText: {
    textAlign: "center",
    padding: "2rem",
  },
  headText: {
    // marginTop: '3.75rem',
    paddingBottom: "30px",
    color: "Black",
  },

  midText: {
    paddingBottom: "30px",
    color: "Black",
  },
  buttons: {
    height: "2.5rem",
    width: "10rem",
    fontSize: "12px",
    backgroundColor: "#3EB6B4",
    borderRadius: "60px",
    color: "white",
  },
});

function RacingData() {
  const dispatch = useDispatch();
  const { deaths, fetching } = useSelector((state) => state.racingReducer);
  const [start, setStart] = useState(false);
  const [data, setData] = useState(null);
  const [dateToFilter, setDateToFilter] = useState(null);
  const classes = useStyles();

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
  }, 200);

  useEffect(() => {
    dispatch(getConfirmedCases());
  }, [dispatch]);

  return (
    <Box className={classes.ChartBox}>
      <Box className={classes.titleText}>
        <Typography variant="h1">
          Explore COVID-19 Case Rates by Country
        </Typography>
        <Typography varient="h5">Confirmed deaths (Covid-19)</Typography>
      </Box>
      <RacingBarChart data={!fetching && data} />
      <Button
        className={classes.buttons}
        type="button"
        onClick={() => setStart(!start)}
      >
        {start ? "Stop the race" : "Start the race!"}
      </Button>
    </Box>
  );
}

export default RacingData;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, getDayOfYear, parseISO } from "date-fns";
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
    padding: ".7rem",
  },

  explanation: {
    width: "75%",
    paddingBottom: "4rem",
    margin: "1rem auto 0",
  },

  buttonBox: {
    display: "flex",
    justifyContent: "space-around",
    width: "30%",
  },

  buttons: {
    height: "2.5rem",
    width: "10rem",
    fontSize: "12px",
    backgroundColor: "#3EB6B4",
    borderRadius: "60px",
    marginTop: ".5rem",
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
          .filter(
            (x) => getDayOfYear(parseISO(x.date)) === getDayOfYear(dateToFilter)
          )
      );
      setDateToFilter(add(dateToFilter, { days: 1 }));

      if (
        getDayOfYear(parseISO(deaths[deaths.length - 1].date)) ===
        getDayOfYear(dateToFilter)
      ) {
        setDateToFilter(new Date(deaths[0].date));
        setStart(false);
      }
    }
  }, 200);

  useEffect(() => {
    dispatch(getConfirmedCases());
  }, [dispatch]);

  const handleReset = (e) => {
    e.preventDefault();
    setStart(false);
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
  };

  return (
    <Box className={classes.ChartBox}>
      <Box className={classes.titleText}>
        <Typography variant="h4" component="h2" style={{ paddingTop: "1rem" }}>
          Explore COVID-19 Case Rates by Country
        </Typography>
        <Typography varient="h5">Confirmed deaths (Covid-19)</Typography>
      </Box>
      <RacingBarChart data={!fetching && data} />
      <Box className={classes.buttonBox}>
        <Button
          className={classes.buttons}
          type="button"
          onClick={() => setStart(!start)}
        >
          {start ? "Stop the race" : "Start the race!"}
        </Button>
        <Button className={classes.buttons} type="button" onClick={handleReset}>
          Reset race
        </Button>
      </Box>
      <Typography className={classes.explanation}>
        Even the most basic graphs like a bar chart can be engaging and
        interesting with the right set up and data. Time-series data (data that
        has a date and/or time associated to it) allows us to see changes that
        happen over-time. Here we are able to see the total death counts for the
        world countries that have the highest totals in a basic bar graph,
        because we have time-series data we are able to put the data in an
        animation from the very first day a COVID-19 death was confirmed through
        the present day.
      </Typography>
    </Box>
  );
}

export default RacingData;

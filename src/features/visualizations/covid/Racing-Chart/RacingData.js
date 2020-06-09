import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, getDayOfYear } from "date-fns";
import { Box, Button, CircularProgress, makeStyles } from "@material-ui/core";
import ReactGa from "react-ga";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import RacingBarChart from "./RacingBarChart";
import useInterval from "../../../../hooks/useInterval";
import { getConfirmedCases } from "./RacingSlice";
import VisExplanation from "../../VisExplanation";
import VisTitle from "../../VisTitle";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import useWindowSize from "../../../../hooks/useWindowSize";

const RacingData = () => {
  const dispatch = useDispatch();
  const { deaths, fetching, error } = useSelector(
    (state) => state.racingReducer
  );
  const [start, setStart] = useState(false);
  const [data, setData] = useState(null);
  const [dateToFilter, setDateToFilter] = useState(null);
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const windowWidth = useWindowSize().width * 0.9;
  const [width, height] = [
    mediumScreen ? windowWidth - theme.navBar.width : windowWidth,
    useWindowSize().height,
  ];

  const useStyles = makeStyles({
    button: {
      margin: theme.spacing(2),
    },
  });

  const classes = useStyles();

  const reset = useCallback(() => {
    setData(deaths.filter((x) => x.date === deaths[0].date));
    setDateToFilter(new Date(deaths[0].date));
  }, [deaths]);

  useEffect(() => {
    if (deaths) {
      reset();
    }
  }, [deaths, reset]);

  useInterval(() => {
    if (start) {
      setData(
        deaths.filter(
          (x) => getDayOfYear(x.date) === getDayOfYear(dateToFilter)
        )
      );
      setDateToFilter(add(dateToFilter, { days: 1 }));

      if (
        getDayOfYear(deaths[deaths.length - 1].date) ===
        getDayOfYear(dateToFilter)
      ) {
        setDateToFilter(new Date(deaths[0].date));
        setStart(false);
      }
    }
  }, 200);

  useEffect(() => {
    if (!deaths && !fetching) {
      dispatch(getConfirmedCases());
    }
  }, [deaths, dispatch, fetching]);

  useEffect(() => {
    if (error) {
      throw new Error("Could not retrieve data for visualization");
    }
  }, [error]);

  // Display a loading spinner while data is being fetched
  if (fetching) {
    return (
      <Box
        height="100vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={theme.spacing(10)} data-testid="progressbar" />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Box display="flex" flexDirection="column" overflow="hidden">
        <VisTitle variant="h4" component="h2" subtitled>
          Explore COVID-19 Case Rates by Country
        </VisTitle>
        <VisTitle
          id="racing-title"
          variant="h5"
          component="span"
          aria-label="racing-title"
          subtitled
        >
          Confirmed deaths (Covid-19)
        </VisTitle>
      </Box>
      {data ? (
        <RacingBarChart
          width={width}
          height={height < 800 ? height * 0.9 : 800}
          data={data}
        />
      ) : (
        <Box width={width} height={height < 800 ? height : 800} />
      )}
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          type="button"
          onClick={() => {
            if (!start) {
              ReactGa.event({
                category: "Racing",
                action: "Animation played",
              });
            }
            setStart(!start);
          }}
        >
          {start ? "Stop the race" : "Start the race!"}
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          type="button"
          onClick={reset}
        >
          Reset
        </Button>
      </Box>
      <VisExplanation>
        Even the most basic graphs like a bar chart can be engaging and
        interesting with the right set up and data. Time-series data (data that
        has a date and/or time associated to it) allows us to see changes that
        happen over-time. Here we are able to see the total death counts for the
        world countries that have the highest totals in a basic bar graph,
        because we have time-series data we are able to put the data in an
        animation from the very first day a COVID-19 death was confirmed through
        the present day.
      </VisExplanation>
    </Box>
  );
};

export default withErrorBoundary(RacingData, "visualization");

import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { add, getDayOfYear, parseISO } from "date-fns";
import { Box, Button, makeStyles } from "@material-ui/core";
import ReactGa from "react-ga";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import RacingBarChart from "./RacingBarChart";
import useInterval from "../../../../hooks/useInterval";
import VisExplanation from "../../VisExplanation";
import VisTitle from "../../VisTitle";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import useWindowSize from "../../../../hooks/useWindowSize";
import useVisDataFetch from "../../../../hooks/useVisDataFetch";
import LoadingSpinner from "../../LoadingSpinner";
import RacingQuiz from "../../../quiz/RacingQuiz";

const RacingData = () => {
  const {
    data: sliceData,
    data: { deaths },
    fetching,
    error,
  } = useSelector((state) => state.globalFatalitiesReducer);
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
    setData(
      deaths
        .filter((x) => x.date === deaths[0].date)
        .map((country) => ({ ...country, date: parseISO(country.date) }))
    );
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
        deaths
          .filter(
            (x) => getDayOfYear(parseISO(x.date)) === getDayOfYear(dateToFilter)
          )
          .map((country) => ({ ...country, date: parseISO(country.date) }))
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

  useVisDataFetch("globalFatalities", sliceData, fetching, error);

  if (fetching) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      data-testid="vis-container"
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
          Confirmed deaths (COVID-19)
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
        Even the most basic graphs such as a bar chart can be engaging and
        interesting with the right set up and data. Time-series data (data that
        has a date and/or time associated with it) allows us to see changes that
        happen over-time. Here we are able to see the total death counts for the
        world countries that have the highest totals in a basic bar graph
        because we have time-series data. We are able to put the data in
        animation from the very first day a COVID-19 death was confirmed through
        the present day.
      </VisExplanation>
      <RacingQuiz />
    </Box>
  );
};

export default withErrorBoundary(RacingData, "visualization");

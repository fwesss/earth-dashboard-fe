import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, useTheme } from "@material-ui/core";
import { VictoryLine, VictoryAxis, VictoryLabel, VictoryTheme } from "victory";
import { format } from "date-fns";
import { schemeSet3 } from "d3";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useWindowSize from "../../../../hooks/useWindowSize";
import VisTitle from "../../VisTitle";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import useVisDataFetch, {
  checkIfNoData,
} from "../../../../hooks/useVisDataFetch";
import LoadingSpinner from "../../LoadingSpinner";
import VisExplanation from "../../VisExplanation";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";
import AirQuiz from "../../../quiz/AirQuiz";

const AirVis = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    data,
    data: { dates, airQuality, cases },
    fetching,
    error,
  } = useSelector((state) => state.airQualityEffectReducer);
  const [formattedDates, setFormattedDates] = useState([new Date()]);

  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [windowWidth, windowHeight] = [
    useWindowSize().width * 0.9,
    useWindowSize().height,
  ];
  const [width, height] = [
    mediumScreen ? windowWidth - theme.navBar.width : windowWidth,
    windowHeight < 800 ? windowHeight * 0.9 : 800,
  ];

  useEffect(() => {
    if (dates !== null) {
      setFormattedDates(dates.map((date) => new Date(date)));
    }
  }, [dates]);

  useVisDataFetch("airQualityEffect", data, fetching, error);

  useEffect(() => {
    dispatch(toggleShowSplash());
  }, [dispatch]);

  if (fetching) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      data-testid="vis-container"
    >
      <VisTitle subtitled variant="h4" component="h2">
        Air Pollution vs. the Spread of COVID-19
      </VisTitle>

      {checkIfNoData(data) ? (
        <Box width={width} height={height} />
      ) : (
        <svg width={width + 100} height={height} data-testid="vis-svg">
          <g transform="translate(54, -20)">
            <VictoryAxis
              width={width}
              height={height}
              theme={VictoryTheme.material}
              scale="time"
              standalone={false}
              style={{
                axis: { stroke: theme.palette.text.primary, strokeWidth: 1 },
                ticks: {
                  stroke: theme.palette.text.primary,
                },
                tickLabels: {
                  fill: theme.palette.text.primary,
                  fontSize: 14,
                },
                grid: {
                  fill: theme.palette.text.hint,
                  stroke: theme.palette.text.hint,
                },
              }}
              tickValues={formattedDates}
              tickFormat={(x) => format(x, "M/d/yy")}
              fixLabelOverlap
              tickLabelComponent={
                <VictoryLabel
                  angle={90}
                  verticalAnchor="end"
                  textAnchor="start"
                />
              }
              name="Dates"
            />

            {/*
             Add the dependent axis for the first data set.
             Note that all components plotted against this axis will have the same y domain
             */}
            <VictoryAxis
              width={width}
              height={height}
              theme={VictoryTheme.material}
              dependentAxis
              domain={[
                Math.min(...airQuality.map((x) => x.y)),
                Math.max(...airQuality.map((x) => x.y)),
              ]}
              offsetX={50}
              orientation="left"
              standalone={false}
              style={{
                axis: { stroke: schemeSet3[0] },
                tickLabels: {
                  fill: schemeSet3[0],
                  fontSize: 16,
                },
                axisLabel: {
                  fill: theme.palette.text.primary,
                  fontSize: 22,
                },
                grid: {
                  fill: theme.palette.text.hint,
                  stroke: theme.palette.text.hint,
                },
              }}
              axisLabelComponent={
                <VictoryLabel dy={mediumScreen ? -50 : -30} />
              }
              name="Daily Mean PM2.5 Concentration"
              label="Daily Mean PM2.5 Concentration"
            />

            {/* dataset one */}
            <VictoryLine
              width={width}
              height={height}
              theme={VictoryTheme.material}
              data={airQuality}
              interpolation="monotoneX"
              scale={{ x: "time", y: "linear" }}
              standalone={false}
              style={{
                data: { stroke: schemeSet3[0], strokeWidth: 4.5 },
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            />

            {/*
             Add the dependent axis for the second data set.
             Note that all components plotted against this axis will have the same y domain
             */}
            <VictoryAxis
              width={width}
              height={height}
              theme={VictoryTheme.material}
              dependentAxis
              domain={[
                Math.min(...cases.map((x) => x.y)),
                Math.max(...cases.map((x) => x.y)),
              ]}
              orientation="right"
              standalone={false}
              style={{
                axis: { stroke: schemeSet3[3] },
                tickLabels: {
                  fill: schemeSet3[3],
                  fontSize: 16,
                },
                axisLabel: {
                  fill: theme.palette.text.primary,
                  fontSize: 22,
                },
                grid: {
                  fill: theme.palette.divider,
                  stroke: theme.palette.divider,
                },
              }}
              tickFormat={(tick) => (tick > 999 ? `${tick / 1000}k` : tick)}
              axisLabelComponent={<VictoryLabel dy={mediumScreen ? 50 : 30} />}
              name="Confirmed Cases of COVID-19"
              label="Confirmed Cases of COVID-19"
            />

            <VictoryLine
              width={width}
              height={height}
              theme={VictoryTheme.material}
              data={[
                {
                  x: new Date(2020, 4, 17),
                  y: 0,
                },
                {
                  x: new Date(2020, 4, 17),
                  y: 1,
                },
              ]}
              domain={{
                x: [new Date(2020, 2, 1), new Date(2020, 5, 27)],
                y: [0, 1],
              }}
              standalone={false}
              style={{
                data: { stroke: theme.palette.info.light, strokeWidth: 6 },
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              labels={["Lockdown Ordered"]}
              labelComponent={
                <VictoryLabel
                  angle={270}
                  dx={250}
                  style={{
                    fontSize: 20,
                    fill: theme.palette.text.primary,
                  }}
                />
              }
            />

            {/* dataset two */}
            <VictoryLine
              width={width}
              height={height}
              theme={VictoryTheme.material}
              data={cases}
              interpolation="monotoneX"
              scale={{ x: "time", y: "linear" }}
              standalone={false}
              style={{
                data: { stroke: schemeSet3[3], strokeWidth: 4.5 },
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
            />
          </g>
        </svg>
      )}
      <VisExplanation>
        The term “PM 2.5” refers to atmospheric particulate matter that have a
        diameter of less than 2.5 micrometers, which is about 3% the diameter of
        a human hair.
      </VisExplanation>
      <VisExplanation>
        Guidelines from the World Health Organization (WHO) stipulate that the
        average PM 2.5 should not exceed 10 μg/m³ over the course of a year, and
        25 μg/m³ over a 24-hour period.
      </VisExplanation>
      <VisExplanation>
        During quarantine in Glendora, CA, the PM 2.5 never exceeded the
        stipulated level of 25 μg/m³, but it did routinely before the lockdown.
      </VisExplanation>
      <VisExplanation>
        Even during quarantine, the average PM 2.5 was 10.3 μg/m³, making it
        unlikely that Glendora County will hit their target of less than 10
        μg/m³ on average over the course of a year.
      </VisExplanation>
      <AirQuiz />
    </Box>
  );
};

export default withErrorBoundary(AirVis, "visualization");

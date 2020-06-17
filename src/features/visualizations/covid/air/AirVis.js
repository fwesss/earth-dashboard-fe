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

const AirVis = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    data,
    data: { dates, airQuality, cases },
    fetching,
    error,
  } = useSelector((state) => state.airQualityReducer);
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

  useVisDataFetch("airQuality", data, fetching, error);

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
        This is a simple line graph that shows the air quality in Glendora,
        California superimposed against the number of COVID-19 cases in the
        whole country. While line graphs are one of the simplest types of
        visualization to create, they remain one of the most effective ways to
        convey ideas or demonstrate phenomena. Here we see that as coronavirus
        cases increase - and especially after the lockdown is ordered - air
        quality dramatically improves in Glendora. This could be due to a
        variety of factors, and is probably a result of a combination of reduced
        land/air travel and reduced production in manufacturing/industrial
        plants.
      </VisExplanation>
    </Box>
  );
};

export default withErrorBoundary(AirVis, "visualization");

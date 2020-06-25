import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import { VictoryLine, VictoryAxis, VictoryLabel, VictoryTheme } from "victory";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { schemeSet3 } from "d3";
import { useDispatch } from "react-redux";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import VisTitle from "../../VisTitle";
import useWindowSize from "../../../../hooks/useWindowSize";
import data from "./data.json";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";
import VisExplanation from "../../VisExplanation";
import ClimateSummaryQuiz from "../../../quiz/ClimateSummaryQuiz";

const years = data.map((d) => d.year);
const rawTemps = data.map((d) => d.rawTemp);
const gmsl = data.map((d) => d.gmsl);
const meanGlobalCo2 = data.map((d) => d.meanGlobalCo2);

const Temperature = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
    dispatch(toggleShowSplash());
  }, [dispatch]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      data-testid="vis-container"
    >
      <VisTitle subtitled variant="h4" component="h2">
        Global Temperature Change, GMSL and CO2 Change (1880 - 2013)
      </VisTitle>
      <svg width={width} height={height} data-testid="vis-svg">
        <g transform={`translate(${smallScreen ? 100 : 200}, -20)`}>
          <VictoryAxis
            width={width - (smallScreen ? 120 : 300)}
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
            tickValues={years}
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

          <VictoryAxis
            height={height}
            theme={VictoryTheme.material}
            dependentAxis
            domain={[Math.min(...gmsl), Math.max(...gmsl)]}
            orientation="left"
            standalone={false}
            style={{
              axis: { stroke: schemeSet3[5], strokeWidth: 4 },
              tickLabels: {
                fill: schemeSet3[5],
                fontSize: 16,
              },
              axisLabel: {
                fill: theme.palette.text.primary,
                fontSize: 22,
              },
              grid: {
                fill: "none",
                stroke: "none",
              },
            }}
            tickFormat={(tick) => (tick > 999 ? `${tick / 1000}k` : tick)}
            axisLabelComponent={<VictoryLabel dy={mediumScreen ? -40 : 30} />}
            offsetX={-60}
            name="GMSL (Global Mean Sea Level)"
            label="GMSL (Global Mean Sea Level)"
          />

          <VictoryLine
            width={width - (smallScreen ? 120 : 300)}
            height={height}
            theme={VictoryTheme.material}
            data={data}
            x={(d) => d.year}
            y={(d) => d.gmsl}
            interpolation="monotoneX"
            scale={{ x: "time", y: "linear" }}
            standalone={false}
            style={{
              data: { stroke: schemeSet3[5], strokeWidth: 4.5 },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />

          <VictoryAxis
            width={width - (smallScreen ? 120 : 300)}
            height={height}
            theme={VictoryTheme.material}
            dependentAxis
            domain={[Math.min(...rawTemps), Math.max(...rawTemps)]}
            offsetX={50}
            orientation="left"
            standalone={false}
            style={{
              axis: { stroke: schemeSet3[0], strokeWidth: 4 },
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
            axisLabelComponent={<VictoryLabel dy={mediumScreen ? -40 : -30} />}
            name="Global Temperature Change"
            label="Global Temperature Change"
          />

          <VictoryLine
            width={width - (smallScreen ? 120 : 300)}
            height={height}
            theme={VictoryTheme.material}
            data={data}
            x={(d) => d.year}
            y={(d) => d.rawTemp}
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

          <VictoryAxis
            width={width - (smallScreen ? 120 : 300)}
            height={height}
            theme={VictoryTheme.material}
            dependentAxis
            domain={[Math.min(...meanGlobalCo2), Math.max(...meanGlobalCo2)]}
            orientation="right"
            standalone={false}
            style={{
              axis: { stroke: schemeSet3[3], strokeWidth: 4 },
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
            axisLabelComponent={<VictoryLabel dy={mediumScreen ? 40 : 30} />}
            name="Mole Fraction of CO2 in air (global)"
            label="Mole Fraction of CO2 in air (global)"
          />

          <VictoryLine
            width={width - (smallScreen ? 120 : 300)}
            height={height}
            theme={VictoryTheme.material}
            data={data}
            x={(d) => d.year}
            y={(d) => d.meanGlobalCo2}
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

      <VisExplanation>
        Here we see three indicators of global warming - global mean sea level
        (GMSL), global temperature aberration, and percent CO2 in the
        atmosphere. These metrics (along with loss of sea ice at the poles and
        increasing events of extreme rainfall) are considered the strongest
        evidence of climate change.
      </VisExplanation>
      <VisExplanation>
        Rising sea levels can become catastrophic, because they will affect as
        many as 670 coastal communities, including Cambridge, Massachusetts;
        Oakland, California; Miami and St. Petersburg, Florida; and four of the
        five boroughs of New York City.
      </VisExplanation>
      <VisExplanation>
        The global temperature aberration shows a clear upward trend, with
        soaring temperatures breaking historical records only in the past
        several years.
      </VisExplanation>
      <VisExplanation>
        And the increasing levels of CO2 track closely with these phenomena,
        with levels increasing and breaking records year on year.
      </VisExplanation>
      <ClimateSummaryQuiz />
    </Box>
  );
};

export default withErrorBoundary(Temperature, "visualization");

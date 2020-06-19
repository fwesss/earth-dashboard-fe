import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryLegend,
  VictoryVoronoiContainer,
  VictoryArea,
  VictoryTooltip,
} from "victory";
import { schemeSet3 } from "d3";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useWindowSize from "../../../../hooks/useWindowSize";
import VisTitle from "../../VisTitle";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import VisExplanation from "../../VisExplanation";
import useVisDataFetch from "../../../../hooks/useVisDataFetch";
import LoadingSpinner from "../../LoadingSpinner";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";
import CountryQuiz from "../../../quiz/CountryQuiz";

const countries = [
  { name: "Brazil", color: 5 },
  { name: "United States of America", color: 3 },
  { name: "India", color: 4 },
  { name: "Cambodia", color: 0 },
  { name: "Argentina", color: 9 },
  { name: "United Kingdom", color: 6 },
];

export default withErrorBoundary(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const extraSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const mediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const extraLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [windowWidth, windowHeight] = [
    useWindowSize().width * 0.9,
    useWindowSize().height,
  ];
  const [width, height] = [
    largeScreen ? windowWidth - theme.navBar.width : windowWidth,
    smallScreen
      ? (windowHeight - theme.appBar.height) * 0.8
      : windowHeight * 0.8,
  ];
  const {
    data,
    error,
    fetching,
    data: { country },
  } = useSelector((state) => state.countryReducer);
  const { darkMode } = useSelector((state) => state.themeReducer);
  const [graphType, setGraphType] = useState("area");

  useVisDataFetch("country", data, fetching, error);

  useEffect(() => {
    dispatch(toggleShowSplash());
  }, [dispatch]);

  if (fetching) {
    return <LoadingSpinner />;
  }

  const handleChange = (event) => setGraphType(event.target.value);

  return (
    <Box
      data-testid="vis-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VisTitle subtitled variant="h4" component="h2">
        Deforestation Prediction Trends by Country
      </VisTitle>
      <Box
        display="flex"
        flexDirection={extraLargeScreen ? "row" : "column"}
        width={width}
      >
        {country && (
          <Box width={width}>
            <VictoryChart
              width={width}
              height={height}
              maxDomain={{ x: 2120, y: 85 }}
              padding={{
                top: 120,
                right: mediumScreen ? 40 : 20,
                bottom: 60,
                left: smallScreen ? 75 : 100,
              }}
              style={{
                touchAction: "auto",
              }}
              theme={VictoryTheme.material}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiBlacklist={["prediction-range"]}
                  labels={({ datum }) =>
                    `${datum.x}: ${datum.name} ${
                      Math.ceil(datum.y * 100) / 100
                    }%`
                  }
                  labelComponent={
                    <VictoryTooltip
                      style={{ fontSize: 14, fill: theme.palette.text.primary }}
                      constrainToVisibleArea
                      cornerRadius={theme.shape.borderRadius}
                      flyoutStyle={{
                        fill: theme.palette.background.paper,
                        filter: "drop-shadow(0px 5px 5px rgba(0, 0, 0, .2))",
                        stroke: 0,
                      }}
                    />
                  }
                />
              }
            >
              <VictoryArea
                name="prediction-range"
                data={[
                  {
                    x: 2018,
                    y: 0.1,
                    y0: 85,
                  },
                  {
                    x: 2120,
                    y: 0.1,
                    y0: 85,
                  },
                ]}
                style={{
                  data: {
                    fill: darkMode ? schemeSet3[10] : schemeSet3[6],
                    fillOpacity: 0.2,
                    stroke: "none",
                  },
                }}
              />
              <VictoryAxis
                fixLabelOverlap
                dependentAxis
                style={{
                  tickLabels: {
                    fill: theme.palette.text.primary,
                    fontSize: smallScreen ? 14 : 20,
                  },
                  axisLabel: {
                    fill: theme.palette.text.primary,
                    fontSize: smallScreen ? 20 : 28,
                    padding: smallScreen ? 45 : 60,
                  },
                  grid: {
                    fill: `${theme.palette.text.hint}66`,
                    stroke: `${theme.palette.text.hint}66`,
                  },
                }}
                tickFormat={(x) => `${x}%`}
                label="Forest Area"
              />
              <VictoryAxis
                fixLabelOverlap
                scale="time"
                style={{
                  tickLabels: {
                    fill: theme.palette.text.primary,
                    fontSize: smallScreen ? 14 : 20,
                  },
                  axisLabel: {
                    fill: theme.palette.text.primary,
                    fontSize: smallScreen ? 20 : 28,
                    padding: smallScreen ? 32 : 36,
                  },
                  grid: {
                    fill: `${theme.palette.text.hint}66`,
                    stroke: `${theme.palette.text.hint}66`,
                  },
                }}
                tickFormat={(x) => x}
                name="Year"
                label="Year"
              />

              {graphType === "area"
                ? countries.map(({ name, color }) => (
                    <VictoryArea
                      key={name}
                      style={{
                        data: { fill: `${schemeSet3[color]}99` },
                      }}
                      data={country.filter((group) => group.name === name)}
                    />
                  ))
                : countries.map(({ name, color }) => (
                    <VictoryLine
                      key={name}
                      style={{
                        data: { stroke: schemeSet3[color], strokeWidth: 4.5 },
                      }}
                      data={country.filter((group) => group.name === name)}
                    />
                  ))}

              <VictoryLegend
                x={smallScreen ? 30 : 120}
                y={extraSmallScreen ? 5 : 25}
                itemsPerRow={extraSmallScreen ? 2 : 3}
                orientation="horizontal"
                style={{
                  labels: {
                    fontSize: mediumScreen ? 14 : 20,
                    fill: theme.palette.text.primary,
                  },
                }}
                data={countries.map(({ name, color }) => ({
                  name,
                  symbol: {
                    fill: `${schemeSet3[color]}${
                      graphType === "area" ? "99" : ""
                    }`,
                  },
                }))}
              />
            </VictoryChart>
          </Box>
        )}

        <Box
          width={mediumScreen ? 500 : 200}
          p={5}
          ml={mediumScreen ? 8 : 0}
          mt={extraLargeScreen ? 9 : 0}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">Graph Type</FormLabel>
            <RadioGroup
              row
              aria-label="graph type"
              name="graph-type"
              value={graphType}
              onChange={handleChange}
            >
              <FormControlLabel value="area" control={<Radio />} label="Area" />
              <FormControlLabel value="line" control={<Radio />} label="Line" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <VisExplanation>
        When there is relevant historical data it is possible to use data
        science prediction modeling to see what the future of deforestation
        could possibly look like. Here we were able to find useful data from
        1990 - 2018 for some countries about their agricultural land (sq. km),
        electric power consumption (kWh per capita), GDP per capita growth
        (annual %), Livestock production, ores and metals exports (% of
        exports), urban population totals, crop production, food production
        index, and forest area (% of land area). Using a random forest
        regression prediction model we are able to predict the ‘forest area (%
        of land area)’ for the next 100 years based on the data collected.
      </VisExplanation>
      <CountryQuiz />
    </Box>
  );
}, "visualization");

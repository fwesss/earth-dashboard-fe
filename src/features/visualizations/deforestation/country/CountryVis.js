import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryLegend,
  VictoryVoronoiContainer,
  VictoryArea,
  VictoryTooltip,
  VictoryBar,
} from "victory";
import { schemeSet3 } from "d3";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import useWindowSize from "../../../../hooks/useWindowSize";
import VisTitle from "../../VisTitle";
import { getPredictions } from "../predictionSlice";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";

const countries = [
  { name: "Brazil", color: 5 },
  { name: "United States of America", color: 3 },
  { name: "India", color: 4 },
  { name: "Cambodia", color: 0 },
  { name: "United Kingdom", color: 6 },
  { name: "Argentina", color: 9 },
];

export default withErrorBoundary(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [width, height] = [useWindowSize().width * 0.8, 820];
  const { fetching, country } = useSelector((state) => state.predictionReducer);
  const { darkMode } = useSelector((state) => state.themeReducer);
  const [graphType, setGraphType] = useState("bar");

  useEffect(() => {
    if (!country && !fetching) {
      dispatch(getPredictions());
    }
  }, [dispatch, fetching, country]);

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

  const handleChange = (event) => setGraphType(event.target.value);

  return (
    <>
      <VisTitle subtitled variant="h4" component="h2">
        Deforestation Prediction Trends by Country 2019 - 2120
      </VisTitle>
      <Box display="flex">
        {country && (
          <VictoryChart
            width={width}
            height={height}
            maxDomain={{ x: 2120, y: 85 }}
            padding={{ top: 20, right: 40, bottom: 250, left: 100 }}
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiBlacklist={["prediction-range"]}
                labels={({ datum }) =>
                  `${datum.x}: ${datum.name} ${Math.ceil(datum.y * 100) / 100}%`
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
              dependentAxis
              style={{
                tickLabels: {
                  fill: theme.palette.text.primary,
                  fontSize: 20,
                },
                axisLabel: {
                  fill: theme.palette.text.primary,
                  fontSize: 28,
                  padding: 60,
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
              scale="time"
              style={{
                tickLabels: {
                  fill: theme.palette.text.primary,
                  fontSize: 20,
                },
                axisLabel: {
                  fill: theme.palette.text.primary,
                  fontSize: 28,
                  padding: 36,
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

            {graphType === "bar"
              ? countries.map(({ name, color }) => (
                  <VictoryBar
                    key={name}
                    style={{
                      data: { stroke: schemeSet3[color], strokeWidth: 4.5 },
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
              x={80}
              y={640}
              itemsPerRow={3}
              style={{
                labels: { fontSize: 20, fill: theme.palette.text.primary },
                parent: { fill: "blue" },
              }}
              data={[
                { name: "Cambodia", symbol: { fill: schemeSet3[0] } },
                { name: "Brazil", symbol: { fill: schemeSet3[5] } },
                {
                  name: "United States of America",
                  symbol: { fill: schemeSet3[3] },
                },
                { name: "United Kingdom", symbol: { fill: schemeSet3[6] } },
                { name: "Argentina", symbol: { fill: schemeSet3[9] } },
                { name: "India", symbol: { fill: schemeSet3[4] } },
              ]}
            />
          </VictoryChart>
        )}
        <Box width={200} p={5}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Graph Type</FormLabel>
            <RadioGroup
              aria-label="dataset"
              name="dataset1"
              value={graphType}
              onChange={handleChange}
            >
              <FormControlLabel value="bar" control={<Radio />} label="Bar" />
              <FormControlLabel value="line" control={<Radio />} label="Line" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}, "visualization");

import React, { useEffect } from "react";
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
} from "victory";
import { schemeSet3 } from "d3";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import { getPredictions } from "../predictionSlice";
import VisTitle from "../../VisTitle";
import useWindowSize from "../../../../hooks/useWindowSize";

export default withErrorBoundary(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [width, height] = [useWindowSize().width * 0.8, 720];
  const { fetching, countryIncome } = useSelector(
    (state) => state.predictionReducer
  );
  const { darkMode } = useSelector((state) => state.themeReducer);

  useEffect(() => {
    if (!countryIncome && !fetching) {
      dispatch(getPredictions());
    }
  }, [dispatch, fetching, countryIncome]);

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
    <>
      <VisTitle subtitled variant="h4" component="h2">
        Deforestation Prediction Trends by Country Income 2019 - 2120
      </VisTitle>
      {countryIncome && (
        <VictoryChart
          width={width}
          height={height}
          maxDomain={{ x: 2120, y: 40 }}
          padding={{ top: 20, right: 100, bottom: 100, left: 100 }}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiBlacklist={["income-range"]}
              labels={({ datum }) =>
                `${datum.x}: ${datum.incomeLevel} ${
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
                y0: 40,
              },
              {
                x: 2120,
                y: 0.1,
                y0: 40,
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
          <VictoryLine
            style={{
              data: { stroke: schemeSet3[0], strokeWidth: 4.5 },
            }}
            data={countryIncome.filter(
              (group) => group.incomeLevel === "High Income Countries"
            )}
          />
          <VictoryLine
            style={{
              data: { stroke: schemeSet3[5], strokeWidth: 4.5 },
            }}
            data={countryIncome.filter(
              (group) => group.incomeLevel === "Middle Income Countries"
            )}
          />
          <VictoryLine
            style={{
              data: { stroke: schemeSet3[3], strokeWidth: 4.5 },
            }}
            data={countryIncome.filter(
              (group) => group.incomeLevel === "Low Income Countries"
            )}
          />
          <VictoryLegend
            x={140}
            y={350}
            title="Country Income Level"
            orientation="vertical"
            borderPadding={20}
            style={{
              title: { fontSize: 24, fill: theme.palette.text.primary },
              labels: { fontSize: 20, fill: theme.palette.text.primary },
              parent: { fill: "blue" },
            }}
            data={[
              { name: "High", symbol: { fill: schemeSet3[0] } },
              { name: "Middle", symbol: { fill: schemeSet3[5] } },
              { name: "Low", symbol: { fill: schemeSet3[3] } },
            ]}
          />
        </VictoryChart>
      )}
    </>
  );
}, "visualization");

import React, { useEffect } from "react";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import VisTitle from "../../VisTitle";
import useWindowSize from "../../../../hooks/useWindowSize";
import VisExplanation from "../../VisExplanation";
import LoadingSpinner from "../../LoadingSpinner";
import useVisDataFetch from "../../../../hooks/useVisDataFetch";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";
import IncomeQuiz from "../../../quiz/IncomeQuiz";

export default withErrorBoundary(() => {
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
    smallScreen
      ? (windowHeight - theme.appBar.height) * 0.8
      : windowHeight * 0.8,
  ];

  const {
    data,
    error,
    fetching,
    data: { countryIncome },
  } = useSelector((state) => state.countryIncomeReducer);
  const { darkMode } = useSelector((state) => state.themeReducer);

  useVisDataFetch("countryIncome", data, fetching, error);

  useEffect(() => {
    dispatch(toggleShowSplash());
  }, [dispatch]);

  if (fetching) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      data-testid="vis-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VisTitle subtitled variant="h4" component="h2">
        Deforestation Prediction Trends by Country Income
      </VisTitle>
      {countryIncome && (
        <Box>
          <VictoryChart
            width={width}
            height={height}
            maxDomain={{ x: 2120, y: 40 }}
            style={{
              touchAction: "auto",
            }}
            padding={{
              top: smallScreen ? 80 : 120,
              right: smallScreen ? 30 : 80,
              bottom: 60,
              left: smallScreen ? 75 : 140,
            }}
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
              name="income-range"
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
              x={smallScreen ? 40 : 75}
              y={smallScreen ? -10 : -5}
              title="Country Income Level"
              orientation="horizontal"
              borderPadding={20}
              style={{
                title: {
                  fontSize: smallScreen ? 16 : 20,
                  fill: theme.palette.text.primary,
                },
                labels: {
                  fontSize: smallScreen ? 14 : 20,
                  fill: theme.palette.text.primary,
                },
                parent: { fill: "blue" },
              }}
              data={[
                { name: "High", symbol: { fill: schemeSet3[0] } },
                { name: "Middle", symbol: { fill: schemeSet3[5] } },
                { name: "Low", symbol: { fill: schemeSet3[3] } },
              ]}
            />
          </VictoryChart>
        </Box>
      )}
      <VisExplanation>
        Using the same prediction model and data source from the previous graph
        we are able to group countries based on the country&apos;s income size.
        This allows us to see how the forest area (% of land area) predictions
        trend for high, medium, and low income countries.
      </VisExplanation>
      <IncomeQuiz />
    </Box>
  );
}, "visualization");

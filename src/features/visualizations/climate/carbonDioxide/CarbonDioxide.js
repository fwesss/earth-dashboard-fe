import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
} from "victory";
import { schemeSet3 } from "d3";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import useWindowSize from "../../../../hooks/useWindowSize";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";
import VisTitle from "../../VisTitle";
import VisExplanation from "../../VisExplanation";
import CarbonDioxideQuiz from "../../../quiz/CarbonDioxideQuiz";
import data from "./data";

const years = [...Array(data.length).keys()];

export default withErrorBoundary(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [windowWidth, windowHeight] = [
    useWindowSize().width * 0.8,
    useWindowSize().height,
  ];
  const [width, height] = [
    mediumScreen ? windowWidth - theme.navBar.width : windowWidth,
    windowHeight < 600 ? windowHeight * 0.7 : 600,
  ];

  useEffect(() => {
    dispatch(toggleShowSplash());
  }, [dispatch]);

  return (
    <Box
      data-testid="vis-container"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VisTitle subtitled variant="h4" component="h2">
        Mole Fraction of CO<sub>2</sub> Over 2,014 Years
      </VisTitle>
      <VictoryChart
        domainPadding={{ x: 10, y: 10 }}
        width={width}
        height={height}
        style={{ touchAction: "auto" }}
        theme={VictoryTheme.material}
        padding={{
          top: smallScreen ? 10 : 20,
          right: smallScreen ? 30 : 80,
          bottom: 75,
          left: smallScreen ? 75 : 140,
        }}
      >
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
          name="CO2 (Carbon Dioxide)"
          label="CO&#8322; (Carbon Dioxide)"
        />
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
            axisLabel: {
              fill: theme.palette.text.primary,
              fontSize: smallScreen ? 20 : 28,
              padding: smallScreen ? 40 : 44,
            },
            grid: {
              fill: theme.palette.text.hint,
              stroke: theme.palette.text.hint,
            },
          }}
          tickValues={years}
          fixLabelOverlap
          tickLabelComponent={
            <VictoryLabel angle={90} verticalAnchor="end" textAnchor="start" />
          }
          name="Year"
          label="Year"
        />
        <VictoryLine
          style={{
            data: { stroke: schemeSet3[0], strokeWidth: 4.5 },
          }}
          data={data}
          animate={{ onLoad: { duration: 6000 } }}
        />
      </VictoryChart>
      <VisExplanation>
        How do we know the CO<sub>2</sub> levels going back over 2000 years?
        Humans did not start measuring CO<sub>2</sub> until 1957.
      </VisExplanation>
      <VisExplanation>
        When ice freezes, tiny bubbles of air become trapped in it. At the
        Earth&apos;s poles, ancient ice contains bubbles from over 800,000 years
        ago. By analyzing the chemical composition of these bubbles, we can
        ascertain the amount of CO<sub>2</sub> in the air when the ice froze.
      </VisExplanation>
      <VisExplanation>
        Scientists have found when going through this data that over the past
        800,000 years, CO<sub>2</sub> levels have never been as high as they are
        now.
      </VisExplanation>
      <CarbonDioxideQuiz />
    </Box>
  );
}, "visualization");

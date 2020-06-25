import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTheme from "@material-ui/core/styles/useTheme";
import Box from "@material-ui/core/Box";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryArea,
} from "victory";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import useWindowSize from "../../../../hooks/useWindowSize";
import VisTitle from "../../VisTitle";
import VisExplanation from "../../VisExplanation";
import useVisDataFetch from "../../../../hooks/useVisDataFetch";
import LoadingSpinner from "../../LoadingSpinner";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";
import BirdPatternQuiz from "../../../quiz/BirdPatternQuiz";

export default withErrorBoundary(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [windowWidth, windowHeight] = [
    useWindowSize().width * 0.9,
    useWindowSize().height,
  ];
  const [width, height] = [
    largeScreen ? windowWidth - theme.navBar.width : windowWidth,
    smallScreen
      ? (windowHeight - theme.appBar.height) * 0.9
      : windowHeight * 0.9,
  ];
  const {
    data,
    error,
    fetching,
    data: { migration },
  } = useSelector((state) => state.patternReducer);

  useVisDataFetch("pattern", data, fetching, error);

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
        Migration Patterns by Year
      </VisTitle>
      {migration && (
        <Box>
          <VictoryChart
            width={width}
            height={height}
            theme={VictoryTheme.material}
            padding={{
              top: smallScreen ? 0 : 20,
              bottom: 60,
              left: smallScreen ? 30 : 20,
            }}
            style={{
              touchAction: "auto",
            }}
            domainPadding={{ x: smallScreen ? 52 : 60 }}
          >
            <VictoryAxis
              fixLabelOverlap
              tickValues={[0, 25, 50, 75, 100]}
              style={{
                axis: { stroke: "none" },
                grid: { stroke: theme.palette.divider },
                tickLabels: {
                  fill: theme.palette.text.primary,
                  fontSize: smallScreen ? 14 : 20,
                },
                ticks: { fill: theme.palette.divider },
                axisLabel: {
                  fill: theme.palette.text.primary,
                  fontSize: smallScreen ? 16 : 24,
                },
              }}
              animate={{ duration: 1000 }}
              label="Bird Observations Per Species"
              axisLabelComponent={<VictoryLabel dy={30} />}
            />
            {migration.map((datum, index) => (
              <VictoryArea
                key={datum.year}
                data={datum.density}
                style={{
                  data: {
                    fill: datum.color,
                    fillOpacity: 0.7,
                    stroke: "none",
                  },
                  labels: {
                    fill: theme.palette.text.primary,
                    fontSize: smallScreen ? 16 : 20,
                  },
                }}
                interpolation="basis"
                labels={[datum.year]}
                labelComponent={<VictoryLabel dx={-30} dy={2} />}
                animate={{
                  onLoad: {
                    duration: 1000 + index * 200,
                  },
                  easing: "cubicInOut",
                }}
              />
            ))}
          </VictoryChart>
        </Box>
      )}
      <VisExplanation>
        The spring migration of birds was at one point in time as predictable as
        the seasons. Bird migration peaks as the amount of daylight increases,
        as it suggests to the birds that their destinations will have plentiful
        food and resources with the arrival of summer. However, as the seasons
        have become less predictable with the advent of increasing climate
        change, so too have the patterns of bird migrations become more varied.
        Bird observations during the peak of the season have decreased between
        1970 and today, suggesting that the peak of the season is now earlier.
        Similar data suggests that the populations of various species may be
        decreasing.
      </VisExplanation>
      <VisExplanation>
        A density plot allows us to check the distribution of a numeric
        variable. This is useful when examining a new dataset. A ridgeline plot
        such as this one lets us look at the distribution of bird observations
        amongst several groups. In this case, each group is the migration for
        that year. Each ‘observation’ is the number of sightings for a
        particular species.
      </VisExplanation>
      <BirdPatternQuiz />
    </Box>
  );
}, "visualization");

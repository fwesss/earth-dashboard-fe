import React, { useEffect } from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLegend,
  VictoryAxis,
  VictoryBar,
} from "victory";
import { format } from "date-fns";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch } from "react-redux";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";

const RacingBarChart = ({ data, width, height }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(toggleShowSplash());
  }, [dispatch]);

  return (
    <VictoryChart
      width={width}
      height={height}
      domainPadding={{ x: 20, y: 300 }}
      theme={VictoryTheme.material}
      style={{
        touchAction: "auto",
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
          grid: {
            fill: theme.palette.divider,
            stroke: theme.palette.divider,
          },
        }}
      />
      <VictoryBar
        horizontal
        barWidth={height * 0.0375}
        data={data}
        x="country"
        y="deaths"
        sortKey="deaths"
        labels={({ datum }) =>
          `${datum.country} ${Math.round(
            Number(datum.deaths)
          ).toLocaleString()}`
        }
        style={{
          data: {
            fill: ({ datum }) => datum.color,
          },
          labels: {
            fontSize: smallScreen ? 14 : 20,
            fill: theme.palette.text.primary,
            padding: 10,
          },
        }}
      />
      <VictoryLegend
        x={smallScreen ? width * 0.4 : width * 0.5}
        y={height * 0.7}
        data={[
          {
            name: format(data[0].date, "M/d/yy"),
            symbol: { fill: "transparent" },
          },
        ]}
        style={{
          labels: {
            fontSize: smallScreen ? 32 : 48,
            fill: theme.palette.text.secondary,
          },
        }}
      />
    </VictoryChart>
  );
};

export default RacingBarChart;

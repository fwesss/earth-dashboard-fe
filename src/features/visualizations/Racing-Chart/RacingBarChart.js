import React from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLegend,
  VictoryAxis,
  VictoryBar,
} from "victory";
import { format } from "date-fns";
import useTheme from "@material-ui/core/styles/useTheme";
import useWindowSize from "../../../hooks/useWindowSize";

function RacingBarChart({ data }) {
  const theme = useTheme();
  const [width, height] = [useWindowSize().width * 0.8, 800];

  return (
    <VictoryChart
      width={width}
      height={height}
      domainPadding={{ x: 20, y: 300 }}
      theme={VictoryTheme.material}
    >
      <VictoryLegend
        x={width * 0.6}
        y={height * 0.7}
        data={[
          {
            name: format(data[0].date, "M/d/yy"),
            symbol: { fill: "transparent" },
          },
        ]}
        style={{
          labels: {
            fontSize: 48,
            fill: theme.palette.text.secondary,
          },
        }}
      />
      <VictoryBar
        horizontal
        barWidth={30}
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
            fontSize: 20,
            fill: theme.palette.text.primary,
            padding: 10,
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
          grid: {
            fill: theme.palette.divider,
            stroke: theme.palette.divider,
          },
        }}
      />
    </VictoryChart>
  );
}

export default RacingBarChart;

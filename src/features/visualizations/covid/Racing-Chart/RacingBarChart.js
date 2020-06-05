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

function RacingBarChart({ data, width, height }) {
  const theme = useTheme();

  return (
    <VictoryChart
      width={width}
      height={height}
      domainPadding={{ x: 20, y: 300 }}
      theme={VictoryTheme.material}
    >
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
      <VictoryBar
        horizontal
        barWidth={20}
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
    </VictoryChart>
  );
}

export default RacingBarChart;

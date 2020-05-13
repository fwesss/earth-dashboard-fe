import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Typography } from "@material-ui/core";
import { VictoryLine, VictoryAxis, VictoryLabel, VictoryTheme } from "victory";
import { format } from "date-fns";
import { getAirQuality } from "./airSlice";
import useWindowSize from "../../../hooks/useWindowSize";

const AirVis = () => {
  const dispatch = useDispatch();
  const { dates, airQuality, cases, fetching } = useSelector(
    (state) => state.airReducer
  );
  const [formattedDates, setFormattedDates] = useState([new Date()]);

  const width = useWindowSize().width * 0.7;
  const height = 600;

  // Retrieve the air quality data on component mount
  useEffect(() => {
    dispatch(getAirQuality());
  }, [dispatch]);

  useEffect(() => {
    if (dates !== null) {
      setFormattedDates(dates.map((date) => new Date(date)));
    }
  }, [dates]);

  // Display a loading spinner while data is being fetched
  if (fetching) {
    return <CircularProgress data-testid="progressbar" />;
  }

  return (
    <>
      <Typography variant="h4" component="h2" align="center">
        {
          "Mean Particulate Matter < 2.5 microns vs. Confirmed cases of COVID-19"
        }
      </Typography>
      <svg width={width + 100} height={height}>
        <g transform="translate(54, -20)">
          <VictoryAxis
            width={width}
            height={height}
            theme={VictoryTheme.material}
            scale="time"
            standalone={false}
            style={{
              axis: { stroke: "#4A5F70", strokeWidth: 1 },
              ticks: {
                stroke: "#4A5F70",
              },
              tickLabels: {
                fill: "#4A5F70",
                fontSize: 14,
              },
            }}
            tickValues={formattedDates}
            tickFormat={(x) => format(x, "M/d/yy")}
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

          {/*
            Add the dependent axis for the first data set.
            Note that all components plotted against this axis will have the same y domain
          */}
          <VictoryAxis
            width={width}
            height={height}
            theme={VictoryTheme.material}
            dependentAxis
            domain={[
              Math.min(...airQuality.map((x) => x.y)),
              Math.max(...airQuality.map((x) => x.y)),
            ]}
            offsetX={50}
            orientation="left"
            standalone={false}
            style={{
              axis: { stroke: "#3EB6B4" },
              tickLabels: {
                fill: "#3EB6B4",
                fontSize: 16,
              },
              axisLabel: {
                fill: "#22625C",
                fontSize: 22,
              },
            }}
            axisLabelComponent={<VictoryLabel dy={-60} />}
            name="Daily Mean PM2.5 Concentration"
            label="Daily Mean PM2.5 Concentration"
          />

          {/* Annotation line */}
          <VictoryLine
            width={width}
            height={height}
            theme={VictoryTheme.material}
            data={formattedDates.map((date) => ({ x: date, y: 16 }))}
            scale={{ x: "time", y: "linear" }}
            standalone={false}
            domain={{
              x: [formattedDates[0], formattedDates[formattedDates.length - 1]],
              y: [
                Math.min(...airQuality.map((x) => x.y)),
                Math.max(...airQuality.map((x) => x.y)),
              ],
            }}
            style={{
              data: { stroke: "#4A5F70", strokeWidth: 3.5 },
            }}
          />

          {/* dataset one */}
          <VictoryLine
            width={width}
            height={height}
            theme={VictoryTheme.material}
            data={airQuality.map((x) => ({ ...x, label: x.y }))}
            interpolation="monotoneX"
            scale={{ x: "time", y: "linear" }}
            standalone={false}
            style={{
              data: { stroke: "#3EB6B4", strokeWidth: 4.5 },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />

          {/*
            Add the dependent axis for the second data set.
            Note that all components plotted against this axis will have the same y domain
          */}
          <VictoryAxis
            width={width}
            height={height}
            theme={VictoryTheme.material}
            dependentAxis
            domain={[
              Math.min(...cases.map((x) => x.y)),
              Math.max(...cases.map((x) => x.y)),
            ]}
            orientation="right"
            standalone={false}
            style={{
              axis: { stroke: "#F3B041" },
              tickLabels: {
                fill: "#F3B041",
                fontSize: 16,
              },
              axisLabel: {
                fill: "#7A4D06",
                fontSize: 22,
              },
            }}
            tickFormat={(tick) => (tick > 999 ? `${tick / 1000}k` : tick)}
            axisLabelComponent={<VictoryLabel dy={60} />}
            name="Confirmed Cases of COVID-19"
            label="Confirmed Cases of COVID-19"
          />

          {/* dataset two */}
          <VictoryLine
            width={width}
            height={height}
            theme={VictoryTheme.material}
            data={cases.map((x) => ({ ...x, label: "yo" }))}
            interpolation="monotoneX"
            scale={{ x: "time", y: "linear" }}
            standalone={false}
            style={{
              data: { stroke: "#F3B041", strokeWidth: 4.5 },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          />
        </g>
      </svg>
    </>
  );
};

export default AirVis;

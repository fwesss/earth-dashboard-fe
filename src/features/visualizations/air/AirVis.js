import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Box, useTheme } from "@material-ui/core";
import { VictoryLine, VictoryAxis, VictoryLabel, VictoryTheme } from "victory";
import { format } from "date-fns";
import { getAirQuality } from "./airSlice";
import useWindowSize from "../../../hooks/useWindowSize";
import VisTitle from "../VisTitle";
import Blurb from "../../landing/blurbs/Blurb";

const AirVis = () => {
  const theme = useTheme();
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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      data-testid="airQuality"
    >
      <VisTitle variant="h4" component="h2">
        {
          "Mean Particulate Matter < 2.5 microns vs. Confirmed cases of COVID-19"
        }
      </VisTitle>
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
              axis: { stroke: theme.palette.primary.main },
              tickLabels: {
                fill: theme.palette.primary.main,
                fontSize: 16,
              },
              axisLabel: {
                fill: theme.palette.primary.contrastText,
                fontSize: 22,
              },
            }}
            axisLabelComponent={<VictoryLabel dy={-60} />}
            name="Daily Mean PM2.5 Concentration"
            label="Daily Mean PM2.5 Concentration"
          />

          {/* dataset one */}
          <VictoryLine
            width={width}
            height={height}
            theme={VictoryTheme.material}
            data={airQuality}
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
                fill: theme.palette.primary.contrastText,
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
            data={cases}
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
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        <Blurb width="40%" my={10}>
          The term “PM 2.5” refers to atmospheric particulate matter that have a
          diameter of less than 2.5 micrometers, which is about 3% the diameter
          of a human hair.
        </Blurb>
        <Blurb width="40%" my={10}>
          Guidelines from the World Health Organization (WHO) stipulate that the
          average PM 2.5 should not exceed 10 μg/m³ over the course of a year,
          and 25 μg/m³ over a 24-hour period.
        </Blurb>
        <Blurb width="40%">
          During quarantine in Glendora, CA, the PM 2.5 never exceeded the
          stipulated level of 25 μg/m³, but it did routinely before the
          lockdown.
        </Blurb>
        <Blurb width="40%">
          Even during quarantine, the average PM 2.5 was 10.3 μg/m³, making it
          unlikely that Glendora County will hit their target of less than 10
          μg/m³ on average over the course of a year.
        </Blurb>
      </Box>
    </Box>
  );
};

export default AirVis;

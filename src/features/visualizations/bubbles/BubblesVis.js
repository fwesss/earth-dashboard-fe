/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as d3 from "d3";
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getSummary } from "./bubblesSlice";
import useWindowSize from "../../../hooks/useWindowSize";

const useStyles = makeStyles({
  factCard: {
    position: "absolute",
    minWidth: "250px",
    marginLeft: "-18rem",
    marginTop: "5rem",

    "@media (min-width:720px)": {
      marginLeft: "-14rem",
    },

    "@media (min-width:1440px)": {
      marginLeft: "-22rem",
    },
  },
  explanation: {
    width: "75%",
    padding: "2em 2em 3em",
    margin: "0 auto",
  },
});

const Bubbles = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { summary, fetching } = useSelector((state) => state.bubblesReducer);
  const [data, setData] = useState(null);
  const [drawn, setDrawn] = useState(false);
  const [tooltipData, setTooltipData] = useState({
    country: null,
    cases: null,
  });
  const [opacity, setOpacity] = useState(0);

  // set the dimensions and margins of the graph
  const width = useWindowSize().width * 0.8;
  const height = 460;

  // Retrieve the bubbles data on component mount
  useEffect(() => {
    dispatch(getSummary());
  }, [dispatch]);

  useEffect(() => {
    if (!fetching && data === null) {
      setData(
        summary.map((country) => ({
          ...country,
          index: null,
          x: null,
          y: null,
          vx: null,
          vy: null,
        }))
      );
    }
  }, [summary, fetching, data]);

  useEffect(() => {
    if (data !== null && !drawn) {
      // append the svg object to the body of the page
      const svg = d3
        .select("#bubble")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Color palette for continents?
      const color = d3.scaleOrdinal().range(d3.schemeTableau10);

      // Size scale for countries
      const size = d3.scaleLinear().domain([0, 800000]).range([7, 75]); // circle will be between 7 and 55 px wide

      // Features of the forces applied to the nodes:
      const simulation = d3
        .forceSimulation()
        .force(
          "center",
          d3
            .forceCenter()
            .x(width / 2)
            .y(height / 2)
        ) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(0.1)) // Nodes are attracted one each other of value is > 0
        .force(
          "collide",
          d3
            .forceCollide()
            .strength(0.2)
            .radius((d) => size(d.totalConfirmed) + 3)
            .iterations(1)
        ); // Force that avoids circle overlapping

      const dragStarted = (d) => {
        if (!d3.event.active) {
          simulation.alphaTarget(0.03).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      };
      const dragged = (d) => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };
      const dragEnded = (d) => {
        if (!d3.event.active) {
          simulation.alphaTarget(0.03);
        }
        d.fx = null;
        d.fy = null;
      };

      // Initialize the circle: all located at the center of the svg area
      const node = svg
        .append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", (d) => size(d.totalConfirmed))
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", (d) => color(d.country))
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 1)
        .on("mousemove", (d) =>
          setTooltipData({
            country: d.country,
            cases: d.totalConfirmed.toLocaleString(),
          })
        )
        .on("mouseover", () => setOpacity(1))
        .call(
          d3
            .drag() // call specific function when circle is dragged
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded)
        );

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation
        .nodes(data)
        .on("tick", () =>
          node
            .attr(
              "cx",
              (d) =>
                (d.x = Math.max(
                  size(d.totalConfirmed),
                  Math.min(width - size(d.totalConfirmed), d.x)
                ))
            )
            .attr(
              "cy",
              (d) =>
                (d.y = Math.max(
                  size(d.totalConfirmed),
                  Math.min(height - size(d.totalConfirmed), d.y)
                ))
            )
        );

      setDrawn(true);
    }
  }, [width, drawn, data]);

  // Display a loading spinner while data is being fetched
  if (fetching) {
    return <CircularProgress data-testid="progressbar" />;
  }

  return (
    <Box display="flex" flexDirection="column" mt={10} overflow="hidden">
      <Typography variant="h4" component="h2" align="center">
        Biases in Bubbles:
      </Typography>
      <Typography
        variant="h5"
        component="span"
        align="center"
        aria-label="bubbles-title"
      >
        The Spread of COVID-19: Confirmed Cases vs Population
      </Typography>
      <Box display="flex" justifyContent="center">
        <Card className={classes.factCard} style={{ opacity }}>
          <CardContent>
            <Typography variant="body2" component="p">
              {tooltipData.country}
            </Typography>
            <Typography variant="body2" component="p">
              <strong>{tooltipData.cases}</strong> confirmed cases to date
            </Typography>
          </CardContent>
        </Card>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          id="bubble"
          width={width}
          height={height}
          aria-labelledby="bubbles-title"
          data-testid="bubbles"
        />
      </Box>
      <Typography className={classes.explanation}>
        One goal of data visualization is to communicate information that
        accounts for both accuracy and depth. In this case, we have a high level
        of accuracy, but no accounting for the different populations of each
        country.
      </Typography>
    </Box>
  );
};

export default Bubbles;

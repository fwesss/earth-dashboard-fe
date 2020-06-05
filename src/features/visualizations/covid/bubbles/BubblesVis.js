/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  select,
  schemeSet3,
  scaleOrdinal,
  scaleLinear,
  forceManyBody,
  event,
  forceSimulation,
  forceCenter,
  forceCollide,
  drag,
} from "d3";
import ReactGa from "react-ga";
import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import { getSummary } from "./bubblesSlice";
import useWindowSize from "../../../../hooks/useWindowSize";
import VisExplanation from "../../VisExplanation";
import VisTitle from "../../VisTitle";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";

const useStyles = makeStyles({
  factCard: {
    position: "absolute",
    minWidth: "250px",
    marginLeft: "-18rem",
    marginTop: "5rem",

    "@media (min-width:720px)": {
      marginLeft: "-24rem",
    },

    "@media (min-width:1440px)": {
      marginLeft: "-36rem",
    },
  },
});

const Bubbles = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { summary, fetching, error } = useSelector(
    (state) => state.bubblesReducer
  );
  const [data, setData] = useState(null);
  const [tooltipData, setTooltipData] = useState({
    country: null,
    cases: null,
  });
  const [opacity, setOpacity] = useState(0);

  // set the dimensions and margins of the graph
  const width = useWindowSize().width * 0.7;
  const height = 540;

  // Retrieve the bubbles data on component mount
  useEffect(() => {
    if (!summary && !fetching) {
      dispatch(getSummary());
    }
  }, [dispatch, fetching, summary]);

  useEffect(() => {
    if (error) {
      throw new Error("Could not retrieve data for visualization");
    }
  }, [error]);

  useEffect(() => {
    if (!fetching && summary && data === null) {
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (data) {
      // append the svg object to the body of the page
      const svg = select("#bubble")
        .append("svg")
        .attr("id", "bubbleSvg")
        .attr("width", width)
        .attr("height", height);

      // Color palette for continents?
      const color = scaleOrdinal().range(schemeSet3);

      // Size scale for countries
      const size = scaleLinear().domain([0, 800000]).range([7, 75]); // circle will be between 7 and 55 px wide

      // Features of the forces applied to the nodes:
      const simulation = forceSimulation()
        .force(
          "center",
          forceCenter()
            .x(width / 2)
            .y(height / 2)
        ) // Attraction to the center of the svg area
        .force("charge", forceManyBody().strength(0.8)) // Nodes are attracted one each other of value is > 0
        .force(
          "collide",
          forceCollide()
            .strength(0.2)
            .radius((d) => size(d.totalconfirmed) + 3)
            .iterations(1)
        ); // Force that avoids circle overlapping

      const dragStarted = (d) => {
        if (!event.active) {
          simulation.alphaTarget(0.03).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
      };
      const dragged = (d) => {
        d.fx = event.x;
        d.fy = event.y;
      };
      const dragEnded = (d) => {
        if (!event.active) {
          simulation.alphaTarget(0.03);
        }
        ReactGa.event({ category: "Bubbles", action: "Bubble dragged" });
        d.fx = null;
        d.fy = null;
      };

      // Initialize the circle: all located at the center of the svg area
      const node = svg
        .attr("data-testid", "svg")
        .append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", `node draggable`)
        .attr("r", (d) => size(d.totalconfirmed))
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("data-testid", (d) => d.country)
        .style("fill", (d) => color(d.country))
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 1)
        .on("mousemove", (d) =>
          setTooltipData({
            country: d.country,
            cases: d.totalconfirmed.toLocaleString(),
          })
        )
        .on("mouseover", () => setOpacity(1))
        .call(
          drag() // call specific function when circle is dragged
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
                  size(d.totalconfirmed),
                  Math.min(width - size(d.totalconfirmed), d.x)
                ))
            )
            .attr(
              "cy",
              (d) =>
                (d.y = Math.max(
                  size(d.totalconfirmed),
                  Math.min(height - size(d.totalconfirmed), d.y)
                ))
            )
        );

      return () => select("#bubbleSvg").remove();
    }
  }, [data, width]);

  // Display a loading spinner while data is being fetched
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
    <Box display="flex" flexDirection="column" overflow="hidden">
      <VisTitle variant="h4" component="h2" subtitled>
        Biases in Bubbles:
      </VisTitle>
      <VisTitle
        id="bubbles-title"
        variant="h5"
        component="span"
        aria-label="bubbles-title"
      >
        The Spread of COVID-19: Confirmed Cases vs Population
      </VisTitle>
      <Box display="flex" justifyContent="center">
        <Card raised className={classes.factCard} style={{ opacity }}>
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
      <VisExplanation>
        One goal of data visualization is to communicate information that
        accounts for both accuracy and depth. In this case, we have a high level
        of accuracy, but no accounting for the vastly different populations of
        each country. We can see that the US bubble is far larger than the Italy
        bubble, but of course the United States has a much larger population.
      </VisExplanation>
    </Box>
  );
};

export default withErrorBoundary(Bubbles, "visualization");
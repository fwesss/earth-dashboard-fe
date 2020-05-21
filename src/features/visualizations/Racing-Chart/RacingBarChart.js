import React, { useRef, useEffect } from "react";
import {
  select,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  schemeTableau10,
  axisBottom,
} from "d3";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useResizeObserver from "../../../hooks/useResizeObserver";

const useStyles = makeStyles({
  Wrapper: {
    height: "70vh",
    width: "100%",
  },
});

function RacingBarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const classes = useStyles();

  // will be called initially and on every data change
  useEffect(() => {
    if (data) {
      const svg = select(svgRef.current);
      if (!dimensions) return;

      const barSize = 25;
      const color = scaleOrdinal().range(schemeTableau10);

      // sorting the data
      data.sort((a, b) => b.deaths - a.deaths);

      const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(data.map((deaths, index) => index)) // [0,1,2,3,4,5]
        .range([0, barSize * data.length]); // [0, 200]

      const xScale = scaleLinear()
        .domain([0, 90000]) // [0, 65 (example)]
        .range([0, 1000]); // [0, 400 (example)]

      const xAxis = axisBottom(xScale).tickSize(-1000).ticks(7);

      svg
        .select(".x-axis")
        .style("transform", "translateY(500px)")
        .call(xAxis)
        .select(".domain")
        .remove();

      // draw the bars
      svg
        .selectAll(".bar")
        .data(data, (entry) => entry.name)
        .join((enter) =>
          enter.append("rect").attr("y", (entry, index) => yScale(index))
        )
        // .attr("fill", (d) => color(d.deaths)
        .style("fill", (d) => color(d.deaths))
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", yScale.bandwidth())
        .transition()
        .attr("width", (entry) => xScale(entry.deaths))
        .attr("y", (entry, index) => yScale(index));

      // draw the labels
      svg
        .selectAll(".label")
        .data(data, (entry) => entry.name)
        .join((enter) =>
          enter
            .append("text")
            .attr(
              "y",
              (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
            )
        )
        .text((entry) => `${entry.name} ${entry.deaths}`)
        .attr("class", "label")
        .style("font-size", "17px")
        .attr("x", 10)
        .transition()
        .attr(
          "y",
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
        );
    }
  }, [data, dimensions]);

  return (
    <div className={classes.Wrapper} ref={wrapperRef}>
      <svg
        ref={svgRef}
        style={{ height: "100%", width: "77%", marginLeft: "12.5rem" }}
      >
        <g className="x-axis" />
      </svg>
    </div>
  );
}

export default RacingBarChart;

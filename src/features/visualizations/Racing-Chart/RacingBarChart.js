import React, { useRef, useEffect } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "./useResizeObserver";

function RacingBarChart({ data }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    if (data) {
      const svg = select(svgRef.current);
      if (!dimensions) return;

      // sorting the data
      data.sort((a, b) => b.deaths - a.deaths);

      const yScale = scaleBand()
        .paddingInner(0.1)
        .domain(data.map((deaths, index) => index)) // [0,1,2,3,4,5]
        .range([0, dimensions.height]); // [0, 200]

      const xScale = scaleLinear()
        .domain([0, max(data, (entry) => entry.deaths)]) // [0, 65 (example)]
        .range([0, dimensions.width]); // [0, 400 (example)]

      // draw the bars
      svg
        .selectAll(".bar")
        .data(data, (entry) => entry.name)
        .join((enter) =>
          enter.append("rect").attr("y", (entry, index) => yScale(index))
        )
        .attr("fill", "red")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", yScale.bandwidth())
        .transition()
        .attr("width", (entry) => xScale(entry.deaths) + 2)
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
        .attr("x", 10)
        .transition()
        .attr(
          "y",
          (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
        );
    }
  }, [data, dimensions]);

  return (
    <div ref={wrapperRef} style={{ height: "600px" }}>
      <svg ref={svgRef} style={{ height: "600px", width: "1200px" }}>
        <g className="x-axis" />
      </svg>
    </div>
  );
}

export default RacingBarChart;

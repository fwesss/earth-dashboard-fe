/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */

import React, { useEffect } from "react";
import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceX,
  forceY,
  select,
  scaleOrdinal,
  event,
  drag as d3Drag,
  schemeCategory10,
} from "d3";
import { legendColor } from "d3-svg-legend";
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useDispatch } from "react-redux";
import dataFile from "./links.json";
import useWindowSize from "../../../../hooks/useWindowSize";
import VisTitle from "../../VisTitle";
import VisExplanation from "../../VisExplanation";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";
import SymbiosisQuiz from "../../../quiz/SymbiosisQuiz";
import DragHint from "../../DragHint";
import useLocalStorage from "../../../../hooks/useLocalStorage";

const Symbiosis = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const [windowWidth, windowHeight] = [
    useWindowSize().width,
    useWindowSize().height,
  ];
  const width = mediumScreen ? windowWidth - theme.navBar.width : windowWidth;
  const height = useWindowSize().height > width ? width + 75 : windowHeight;

  const [closeTooltip, setCloseTooltip] = useLocalStorage(
    "symbiosisDragHint",
    false
  );

  useEffect(() => {
    dispatch(toggleShowSplash());
  }, [dispatch]);

  useEffect(() => {
    const types = Array.from(new Set(dataFile.map((d) => d.type)));
    const data = {
      nodes: Array.from(
        new Set(dataFile.flatMap((l) => [l.source, l.target])),
        (id) => ({ id })
      ),
      dataFile,
    };

    const color = scaleOrdinal(types).range(schemeCategory10);

    const linkArc = (d) => {
      const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
      return `M${d.source.x},${d.source.y}
      A${r},${r} 0 0,1 ${d.target.x},${d.target.y}`;
    };

    const drag = (simulation) => {
      const dragStarted = (d) => {
        if (!event.active) {
          simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;

        setCloseTooltip(true);
      };

      const dragged = (d) => {
        d.fx = event.x;
        d.fy = event.y;
      };

      const dragEnded = (d) => {
        if (!event.active) {
          simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      };

      return d3Drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded);
    };

    const links = data.dataFile.map((d) => Object.create(d));
    const nodes = data.nodes.map((d) => Object.create(d));

    const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink(links).id((d) => d.id)
      )
      .force("charge", forceManyBody().strength((width - 222.86) / -3.04))
      .force("x", forceX())
      .force("y", forceY());

    const svg = select("#symbiosis")
      .append("svg")
      .attr("id", "symbiosisSvg")
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${smallScreen ? -20 : -80}, 0)`);

    svg
      .append("defs")
      .selectAll("marker")
      .data(types)
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", color)
      .attr("d", "M0,-5L10,0L0,5");

    const ordinal = scaleOrdinal()
      .domain(types.map((d) => d[0].toUpperCase() + d.slice(1)))
      .range(schemeCategory10);

    svg
      .append("g")
      .attr("class", "legendOrdinal")
      .attr(
        "transform",
        `translate(${smallScreen ? -130 : -350}, ${smallScreen ? -220 : -350})`
      )
      .attr("fill", theme.palette.text.primary);

    const legendOrdinal = legendColor().scale(ordinal);

    svg.select(".legendOrdinal").call(legendOrdinal);

    const link = svg
      .attr("data-testid", "vis-svg")
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", (d) => color(d.type))
      .attr(
        "marker-end",
        (d) => `url(${new URL(`#arrow-${d.type}`, window.location)})`
      );

    const node = svg
      .append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation));

    node
      .append("circle")
      .attr("r", smallScreen ? 4 : 5)
      .attr("class", `node draggable`);

    node
      .append("text")
      .attr("class", `node draggable`)
      .attr("x", 8)
      .attr("y", "0.31em")
      .text((d) => d.id)
      .attr("font-size", smallScreen ? "1rem" : "1.5rem")
      .attr("fill", theme.palette.text.primary);

    simulation.on("tick", () => {
      link.attr("d", linkArc);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => select("#symbiosisSvg").remove();
    // eslint-disable-next-line
  }, [height, smallScreen, theme.palette.text.primary, width]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      overflow="hidden"
      alignItems="center"
      justifyContent="center"
      data-testid="vis-container"
    >
      <VisTitle variant="h4" component="h2">
        Symbiosis
      </VisTitle>
      <VisExplanation>
        Animals depend on each other much the way humans do. Indeed, many types
        of relationships exist in the wild. This is called symbiosis
        (sihm-bai-OH-sehs). Some symbiotic relationships are beneficial for both
        parties. These types of relationships are called mutualism, as the
        benefit is mutual. For instance, the golden jellyfish spends its day
        following the sun and can also absorb a type of algae called
        zooxanthellae into its tissue. This constant sunlight exposure makes it
        easier for the algae to convert energy for the jellyfish to use. The
        jellyfish gets more energy and the algae get protection, nutrients, and
        carbon dioxide.
      </VisExplanation>
      <VisExplanation>
        Another type of relationship is called commensalism, where one animal
        benefits while the other is unaffected. For instance, the Emperor Shrimp
        will often attach to a Sea Cucumber. The shrimp is light and
        unobtrusive, and receives free transportation and protection. Finally,
        parasitism is a type of relationship where one animal is harmed by the
        relationship. For instance, the Jewel Wasp will sting and stun an
        American cockroach, drink some of its blood, bring the cockroach to her
        burrow, and lay an egg in the roach&apos;s abdomen. Eventually, this egg
        hatches inside the still-living cockroach and the larva eats its
        host&apos;s insides, saving the vital organs until the end. Finally, the
        wasp is now fully-grown, eats its way out of the roach and flies off.
      </VisExplanation>
      <DragHint elements="links" close={closeTooltip}>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          id="symbiosis"
          width={width}
          height={height}
          aria-labelledby="symbiosis-title"
          data-testid="symbiosis"
        />
      </DragHint>
      <VisExplanation>
        A network graph allows you to demonstrate the types of relationships
        between different observations. It is useful for dealing with
        categorical data (non-numeric). Observations graphed in this way are
        referred to as nodes. Each node is connected by a link. The link is the
        relationship between the two nodes. For instance, the sea otter and kelp
        are both nodes in this visualization; their link is a type of
        relationship called mutualism, thus it is color-coded green.
      </VisExplanation>
      <SymbiosisQuiz />
    </Box>
  );
};

export default withErrorBoundary(Symbiosis, "visualization");

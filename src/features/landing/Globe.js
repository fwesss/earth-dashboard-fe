import React, { useEffect, useRef, useState } from "react";
import Globegl from "react-globe.gl";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core";
import {
  min,
  max,
  select,
  scaleLinear,
  scaleSequential,
  interpolateYlOrRd,
  interpolateGreens,
} from "d3";
import useWindowSize from "../../hooks/useWindowSize";
import withErrorBoundary from "../../app/error/ErrorBoundary";
import pollutionData from "./pollution.json";
import recycledData from "./wasteRecycled.json";
import InfoBar from "./InfoBar";

const Globe = ({ open, setOpen }) => {
  const theme = useTheme();
  const { width, height } = useWindowSize();
  const globeEl = useRef();
  const { darkMode } = useSelector((state) => state.themeReducer);
  const [hoverD, setHoverD] = useState();
  const [data, setData] = useState({
    pollution: pollutionData,
    recycled: null,
    selected: "pollution",
  });

  const minAmp = (source, field) => min(source.map((point) => point[field]));
  const maxAmp = (source, field) => max(source.map((point) => point[field]));

  // The height of the points normalized. Size 1 === radius of globe
  const altitude = (source, field) =>
    scaleLinear()
      .domain([minAmp(source, field), maxAmp(source, field)])
      .range([0.1, 1]);

  const radius = (source, field) =>
    scaleLinear()
      .domain([minAmp(source, field), maxAmp(source, field)])
      .range([0.25, 0.5]);

  const color = (source, field) =>
    scaleSequential(
      data.selected === "pollution" ? interpolateYlOrRd : interpolateGreens
    ).domain([minAmp(source, field), maxAmp(source, field)]);

  // Setup the globe view on mount
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.2;
    globeEl.current.pointOfView({
      lat: 35,
      lng: 51,
    });
  }, []);

  const handleChange = (event) =>
    setData({
      pollution: event.target.value === "pollution" && pollutionData,
      recycled: event.target.value === "recycled" && recycledData,
      selected: event.target.value,
    });

  /*
   * This is a hacky solution to remove the vertical scrollbar caused by Globegl.
   * When this component mounts, we hide the scrollbar on the parent html tag.
   * When it unmounts, we set it to normal so we can scroll when needed on other pages.
   */
  useEffect(() => {
    select("html").style("overflow-y", "hidden");

    return () => select("html").style("overflow-y", "auto");
  }, []);

  return (
    <>
      <Globegl
        data-testid="earth"
        ref={globeEl}
        pointsData={
          data.pollution.length &&
          data.pollution.map((point) => ({
            name: `${point[0]} ${point[3]}`,
            lat: point[1],
            lng: point[2],
            altitude: altitude(data.pollution, 3)(point[3]),
            radius: radius(data.pollution, 3)(point[3]),
            color: color(data.pollution, 3)(point[3]),
          }))
        }
        pointRadius="radius"
        pointAltitude="altitude"
        pointColor="color"
        // === window width minus the width of the scrollbar to prevent horizontal scrollbar
        width={
          open
            ? width - theme.navBar.width - theme.infoBar.width
            : width - theme.navBar.width
        }
        height={height}
        backgroundColor={theme.palette.common.black}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        // Switch out the globe for a night or day version depending on color mode
        globeImageUrl={
          darkMode
            ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
            : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        }
        polygonsData={data.recycled?.features}
        polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
        polygonCapColor={(d) =>
          d === hoverD
            ? "steelblue"
            : color(
                data.recycled.features.map((country) => country.properties),
                "% waste recycled"
              )(d.properties["% waste recycled"])
        }
        polygonSideColor={() => `${theme.palette.primary.light}18`}
        onPolygonHover={setHoverD}
        polygonsTransitionDuration={300}
        polygonLabel={({ properties: d }) => `
            <b>${d["Country Name"]}</b><br />
            Waste recycled: ${d["% waste recycled"]}%
        `}
      />

      <InfoBar
        data={data}
        handleChange={handleChange}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default withErrorBoundary(Globe, "visualization");

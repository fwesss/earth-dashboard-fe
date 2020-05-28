import React, { useEffect, useRef } from "react";
import Globegl from "react-globe.gl";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core";
import {
  min,
  max,
  scaleLinear,
  scaleSequential,
  interpolateYlOrRd,
  interpolateBlues,
} from "d3";
import useWindowSize from "../../../hooks/useWindowSize";
import data from "./globeData.json";
import withErrorBoundary from "../../../app/error/ErrorBoundary";

const Globe = () => {
  const theme = useTheme();
  const globeEl = useRef();
  const { darkMode } = useSelector((state) => state.themeReducer);
  const { width, height } = useWindowSize();

  const [minAmp, maxAmp] = [
    min(data.map((point) => point[3])),
    max(data.map((point) => point[3])),
  ];

  // The height of the points normalized. Size 1 === radius of globe
  const altitude = scaleLinear().domain([minAmp, maxAmp]).range([0.1, 1]);
  const radius = scaleLinear().domain([minAmp, maxAmp]).range([0.25, 0.5]);
  const color = scaleSequential(
    darkMode ? interpolateYlOrRd : interpolateBlues
  ).domain([minAmp, maxAmp]);

  // Setup the globe view on mount
  useEffect(() => {
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.2;
    globeEl.current.pointOfView({
      lat: 35,
      lng: 51,
    });
    globeEl.current.controls().enableZoom = false;
  }, []);

  return (
    <Globegl
      data-testid="earth"
      ref={globeEl}
      pointsData={data.map((point) => ({
        name: `${point[0]} ${point[3]}`,
        lat: point[1],
        lng: point[2],
        altitude: altitude(point[3]),
        radius: radius(point[3]),
        color: color(point[3]),
      }))}
      pointRadius="radius"
      pointAltitude="altitude"
      pointColor="color"
      // === window width minus the width of the scrollbar to prevent horizontal scrollbar
      width={width - (width - document.body.offsetWidth)}
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
    />
  );
};

export default withErrorBoundary(Globe, "visualization");

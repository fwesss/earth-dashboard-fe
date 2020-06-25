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
import IconButton from "@material-ui/core/IconButton";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Box from "@material-ui/core/Box";
import useWindowSize from "../../hooks/useWindowSize";
import withErrorBoundary from "../../app/error/ErrorBoundary";
import pollutionData from "./pollution.json";
import recycledData from "./wasteRecycled.json";
import InfoBar from "./InfoBar";
import nightSky from "./small-night-sky.jpg";
import topology from "./earth-topology.jpg";
import earthNight from "./small-earth-night.jpg";
import earthDay from "./small-earth-blue-marble.jpg";
import InfoSection from "./InfoSection";

const Globe = ({ infoOpen, setInfoOpen, largeScreen, width }) => {
  const theme = useTheme();
  const { height } = useWindowSize();
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
      /*
       * The width function was calculated by finding the optimal width/altitude ratio on the smallest and
       * largest screen sizes and drawing a linear line between them.
       */
      altitude: 4.62869 - 0.00118042 * width,
    });
  }, [width]);

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
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (largeScreen) {
      select("html").style("overflow-y", "hidden");

      return () => select("html").style("overflow-y", "auto");
    }
  }, [largeScreen]);

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
        width={width}
        height={height}
        backgroundColor={theme.palette.common.black}
        backgroundImageUrl={nightSky}
        bumpImageUrl={topology}
        // Switch out the globe for a night or day version depending on color mode
        globeImageUrl={darkMode ? earthNight : earthDay}
        polygonsData={data.recycled?.features}
        polygonAltitude={(d) => (d === hoverD ? 0.12 : 0.06)}
        polygonCapColor={(d) =>
          d === hoverD
            ? theme.palette.info.main
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
        animateIn={false}
        waitForGlobeReady={false}
      />

      {largeScreen ? (
        <InfoBar
          data={data}
          handleChange={handleChange}
          open={infoOpen}
          setOpen={setInfoOpen}
        />
      ) : (
        <>
          <Box
            position="absolute"
            top={height - theme.spacing(8)}
            right={theme.spacing(5)}
          >
            <IconButton
              href="#info-section"
              style={{
                background: theme.palette.common.black,
                color: theme.palette.secondary.main,
              }}
              edge="end"
            >
              <ArrowDownwardIcon />
            </IconButton>
          </Box>
          <InfoSection data={data} handleChange={handleChange} />
        </>
      )}
    </>
  );
};

export default withErrorBoundary(Globe, "visualization");

import React, { useEffect, useRef, useState } from "react";
import Globegl from "react-globe.gl";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core";
import {
  min,
  max,
  scaleLinear,
  scaleSequential,
  interpolateYlOrRd,
  interpolateGreens,
} from "d3";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import useWindowSize from "../../hooks/useWindowSize";
import withErrorBoundary from "../../app/error/ErrorBoundary";
import pollutionData from "./pollution.json";
import recycledData from "./wasteRecycled.json";
import Info from "./Info";

const Globe = () => {
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

  return (
    <>
      <Box position="absolute" right={theme.spacing(6)} mt={6} zIndex={1}>
        <Card raised>
          <CardHeader title="Dataset" />
          <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend" hidden>
                Dataset
              </FormLabel>
              <RadioGroup
                aria-label="dataset"
                name="dataset1"
                value={data.selected}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="pollution"
                  control={<Radio />}
                  label="Pollution from major cities"
                />
                <FormControlLabel
                  value="recycled"
                  control={<Radio />}
                  label="Amount of waste recycled by countries"
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Box>

      <Info
        dataset={
          data.selected === "pollution"
            ? "Pollution Out From Major Cities"
            : "Waste Recycled by Countries"
        }
      >
        {data.selected === "pollution"
          ? "Humans across the planet produce pollution but some cities produce more than their fair share. We can see which cities are polluting heavily but examining the height and color intensity of the columns representing pollution levels."
          : "Recycling programs of varying effectiveness have been implemented around the world. We can get a high level picture of the amount of waste that's recycled by each country by examining the color intensity of the country."}
      </Info>

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
        width={width - theme.navBar.width - (width - document.body.clientWidth)}
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
    </>
  );
};

export default withErrorBoundary(Globe, "visualization");

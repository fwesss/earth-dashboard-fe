import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import ReactGa from "react-ga";
import mapboxgl from "mapbox-gl";
import { Box, Slider, CircularProgress, IconButton } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getCases } from "./casesSlice";
import "mapbox-gl/src/css/mapbox-gl.css";
import useDebounce from "../../../hooks/useDebounce";
import { heatmap, circles, labels } from "./layers.json";
import VisExplanation from "../VisExplanation";
import VisTitle from "../VisTitle";
import useWindowSize from "../../../hooks/useWindowSize";
import withErrorBoundary from "../../../app/error/ErrorBoundary";

mapboxgl.accessToken = process.env.REACT_APP_CONFIRMED_CASES_MAPBOX_TOKEN;

const useStyles = makeStyles({
  root: {
    marginLeft: "3rem",
    marginRight: "3rem",
  },
  markLabel: {
    transform: "translate(-20px, 20px) rotate(90deg)",
    fontSize: 14,
    fontFamily: "Roboto",
  },
});

const DataProvider = () => {
  const dispatch = useDispatch();
  const { cases, fetching, error } = useSelector((state) => state.casesReducer);
  // filterBy() requires the map that was constructed in CasesVis so we need to pass it up to the
  // HOC and store it in local state
  const [mapState, setMapState] = useState(null);
  const [play, setPlay] = useState(false);
  const width = useWindowSize().width * 0.8;

  // Retrieve the map data on component mount
  useEffect(() => {
    if (!cases) {
      dispatch(getCases());
    }
  }, [cases, dispatch]);

  useEffect(() => {
    if (error) {
      throw new Error("Could not retrieve data for visualization");
    }
  }, [error]);

  // Display a loading spinner while data is being fetched
  if (fetching) {
    return <CircularProgress data-testid="progressbar" />;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width={width}
    >
      <VisTitle
        id="map-title"
        aria-label="map-title"
        variant="h4"
        component="h2"
      >
        Explore COVID-19 Confirmed Cases in the US
      </VisTitle>
      <CasesVis cases={cases} setMapState={setMapState} />

      <Box display="flex" mx={2} my={4} alignItems="center" width="90%">
        <IconButton onClick={() => setPlay(true)} aria-label="play">
          <PlayCircleFilledIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => setPlay(false)} aria-label="pause">
          <PauseCircleFilledIcon fontSize="large" />
        </IconButton>

        <DateSlider mapState={mapState} play={play} setPlay={setPlay} />
      </Box>
      <VisExplanation>
        A heatmap is a visual representation of data that uses a method of
        color-coding to represent the different data values. Data which includes
        latitude and longitude values (coordinates for mapping associated with
        the data) is great to use with a heatmap. The data for daily new
        COVID-19 confirmed cases includes latitude and longitude values which
        allows us to visually see where and how the COVID-19 virus is spreading
        throughout the United States and where the most and least impacted areas
        are. Here in this heatmap we can see over-time how much more New York
        and the general east coast have been affected by the virus compared to
        California and the west coast.
      </VisExplanation>
    </Box>
  );
};

const CasesVis = ({ cases, setMapState }) => {
  const mapContainer = useRef(null);
  const initialData = useRef(cases);

  const { darkMode } = useSelector((state) => state.themeReducer);
  const [lightStyle, darkStyle] = [
    process.env.REACT_APP_CONFIRMED_CASES_MAPBOX_STYLE,
    process.env.REACT_APP_CONFIRMED_CASES_MAPBOX_STYLE_DARK,
  ];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: darkMode ? darkStyle : lightStyle,
      center: [-100, 38],
      zoom: 3.75,
      minZoom: 3.5,
    });

    map.on("load", () => {
      setMapState(map);
      map
        .addSource("confirmed-cases", {
          type: "geojson",
          data: initialData.current,
        })
        .addLayer(heatmap, "waterway-label")
        .addLayer(circles, "waterway-label")
        .addLayer(labels);
    });

    map.on("wheel", (event) => {
      if (
        event.originalEvent.ctrlKey ||
        event.originalEvent.metaKey ||
        event.originalEvent.altKey
      ) {
        return;
      }
      event.preventDefault();
    });

    return () => map.remove();
  }, [darkMode, darkStyle, lightStyle, setMapState]);

  return (
    <div
      aria-labelledby="map-title"
      data-testid="map"
      ref={mapContainer}
      style={{ height: "75vh", width: "100%" }}
    />
  );
};

const DateSlider = ({ mapState, play, setPlay }) => {
  const classes = useStyles();
  const { dates } = useSelector((state) => state.casesReducer);
  const [dateToFilter, setDateToFilter] = useState({
    date: null,
    sliderValue: null,
  });
  // The date filter is debounced so dragging the slider quickly will not trigger multiple layer filter
  // changes. Filter changes are only registered every 25ms.
  const debouncedDateToFilter = useDebounce(dateToFilter, 15);

  // Whenever the dateToFilter changes in state, we change the data we are showing by filtering by date
  // There are separate layers for the circles, labels, and heatmap so we set the filter on each
  useEffect(() => {
    if (dateToFilter.date && mapState) {
      const filters = ["==", "date", debouncedDateToFilter.date];
      mapState
        .setFilter("confirmed-cases-circles", filters)
        .setFilter("confirmed-cases-heat", filters)
        .setFilter("confirmed-cases-labels", filters);
    }
  }, [mapState, dateToFilter, debouncedDateToFilter]);

  useEffect(() => {
    setDateToFilter({
      date: dates[dates.length - 2],
      sliderValue: dates.length - 2,
    });
  }, [dates]);

  useEffect(() => {
    let interval;

    // Move the slider forward one date every 250ms until play=false or we're at the end of the slider
    if (play && dateToFilter.sliderValue < dates.length - 2) {
      interval = setInterval(
        () =>
          setDateToFilter({
            date: dates[dateToFilter.sliderValue + 1],
            sliderValue: dateToFilter.sliderValue + 1,
          }),
        25000 / dates.length
      );
    }
    return () => clearInterval(interval);
  }, [dates, dateToFilter.sliderValue, play]);

  return (
    <Slider
      aria-label="date-filter"
      className={classes.root}
      classes={{ markLabel: classes.markLabel }}
      value={dateToFilter.sliderValue}
      getAriaValueText={(value) => `${dates[value]}`}
      onChange={(event, newValue) => {
        ReactGa.event({ category: "Heatmap", action: "Filter changed" });
        setDateToFilter({ date: dates[newValue], sliderValue: newValue });
      }}
      // onChangeCommtted fires whenever a "click up" on the slider occurs. If the animation is playing and the
      // user clicks or drags to a different date manually, the animation should stop
      onChangeCommitted={() => setPlay(false)}
      // Displaying all dates as marks on the slider will be too crowded so we only display every 7 dates
      marks={dates
        .map((date, i) => ({
          value: i,
          label: format(
            new Date(
              `20${date.substring(6)}`,
              date.substring(0, 2) - 1,
              date.substring(3, 5)
            ),
            "M/d/yy"
          ),
        }))
        .filter((_, j) => j % 7 === 0)}
      max={dates.length - 2}
      // Format the date in the tooltip to MM-dd because the full date does not fit
      valueLabelFormat={(value) =>
        format(
          new Date(
            `20${dates[value].substring(6)}`,
            dates[value].substring(0, 2) - 1,
            dates[value].substring(3, 5)
          ),
          "M/d"
        )
      }
      valueLabelDisplay="auto"
    />
  );
};

export default withErrorBoundary(DataProvider, "visualization");

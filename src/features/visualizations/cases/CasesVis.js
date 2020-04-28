import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import {
  Box,
  Slider,
  Typography,
  Backdrop,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { getCases } from "./casesSlice";
import "mapbox-gl/src/css/mapbox-gl.css";
import useDebounce from "../../../hooks/useDebounce";
import { heatmap, circles, labels } from "./layers.json";

mapboxgl.accessToken = process.env.REACT_APP_CONFIRMED_CASES_MAPBOX_TOKEN;

const useStyles = makeStyles({
  root: {
    marginLeft: "3rem",
    marginRight: "3rem",
  },
  markLabel: {
    transform: "rotate(-45deg)",
    bottom: "-120px",
  },
});

const DataProvider = () => {
  const dispatch = useDispatch();
  const { cases, fetching } = useSelector((state) => state.casesReducer);
  // filterBy() requires the map that was constructed in CasesVis so we need to pass it up to the
  // HOC and store it in local state
  const [mapState, setMapState] = useState(null);
  const [play, setPlay] = useState(false);

  // Retrieve the map data on component mount
  useEffect(() => {
    dispatch(getCases());
  }, [dispatch]);

  // Display a loading spinner while data is being fetched
  if (fetching) {
    return (
      <Backdrop open invisible>
        <CircularProgress data-testid="progressbar" />
      </Backdrop>
    );
  }

  return (
    <Box display="flex" flexDirection="column" overflow="hidden" py={3}>
      <Typography
        aria-label="map-title"
        variant="h4"
        component="h2"
        gutterBottom
      >
        USA Covid-19 Confirmed Cases Daily Count
      </Typography>
      <CasesVis cases={cases} setMapState={setMapState} />

      <Box display="flex" mx={2} my={4} alignItems="center">
        <IconButton onClick={() => setPlay(true)} aria-label="play">
          <PlayCircleFilledIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => setPlay(false)} aria-label="pause">
          <PauseCircleFilledIcon fontSize="large" />
        </IconButton>

        <DateSlider mapState={mapState} play={play} setPlay={setPlay} />
      </Box>
    </Box>
  );
};

const CasesVis = ({ cases, setMapState }) => {
  const mapContainer = useRef(null);
  const initialData = useRef(cases);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.REACT_APP_CONFIRMED_CASES_MAPBOX_STYLE,
      center: [-100, 38],
      zoom: 3.5,
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

    return () => map.remove();
  }, [setMapState]);

  return (
    <div
      aria-labelledby="map-title"
      data-testid="map"
      ref={mapContainer}
      style={{ height: "75vh" }}
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
        250
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
      onChange={(event, newValue) =>
        setDateToFilter({ date: dates[newValue], sliderValue: newValue })
      }
      // onChangeCommtted fires whenever a "click up" on the slider occurs. If the animation is playing and the
      // user clicks or drags to a different date manually, the animation should stop
      onChangeCommitted={() => setPlay(false)}
      // Displaying all dates as marks on the slider will be too crowded so we only display every 7 dates
      marks={dates
        .map((date, i) => ({ value: i, label: date }))
        .filter((_, j) => j % 7 === 0)}
      max={dates.length - 2}
      // Format the date in the tooltip to MM-dd because the full date does not fit
      valueLabelFormat={(value) =>
        dates[0] !== null && dates[value].substring(1, 5)
      }
      valueLabelDisplay="auto"
    />
  );
};

export default DataProvider;

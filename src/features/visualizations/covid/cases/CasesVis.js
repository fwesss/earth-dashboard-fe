import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import ReactGa from "react-ga";
import mapboxgl from "mapbox-gl";
import { Box, Slider, IconButton } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { heatmap, circles, labels } from "./layers.json";
import VisExplanation from "../../VisExplanation";
import VisTitle from "../../VisTitle";
import useWindowSize from "../../../../hooks/useWindowSize";
import withErrorBoundary from "../../../../app/error/ErrorBoundary";
import useVisDataFetch from "../../../../hooks/useVisDataFetch";
import LoadingSpinner from "../../LoadingSpinner";
import "mapbox-gl/dist/mapbox-gl.css";
import { toggleShowSplash } from "../../../../app/theme/themeSlice";
import HeatMapQuiz from "../../../quiz/HeatMapQuiz";

mapboxgl.accessToken = process.env.REACT_APP_CONFIRMED_CASES_MAPBOX_TOKEN;

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
  },
  markLabel: {
    transform: "translate(-20px, 20px) rotate(90deg)",
    fontSize: 14,
    fontFamily: "Roboto",
  },
}));

const DataProvider = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const {
    data,
    data: { cases, dates },
    fetching,
    error,
  } = useSelector((state) => state.usCasesReducer);
  // filterBy() requires the map that was constructed in CasesVis so we need to pass it up to the
  // HOC and store it in local state
  const [mapState, setMapState] = useState(null);
  const [play, setPlay] = useState(false);
  const [dateToFilter, setDateToFilter] = useState({
    date: null,
    sliderValue: null,
  });
  const [zoom, setZoom] = useState(3.5);
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const windowWidth = useWindowSize().width;
  const width = largeScreen ? windowWidth - theme.navBar.width : windowWidth;

  useVisDataFetch("usCases", data, fetching, error);

  useEffect(() => {
    dispatch(toggleShowSplash());
  }, [dispatch]);

  if (fetching) {
    return <LoadingSpinner />;
  }

  const handlePlay = () => {
    if (dateToFilter.sliderValue === dates.length - 2) {
      setDateToFilter({
        date: dates[0],
        sliderValue: 0,
      });
      setPlay(true);
    } else {
      setPlay(true);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
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
      <CasesVis
        cases={cases}
        setMapState={setMapState}
        largeScreen={largeScreen}
        theme={theme}
        setZoom={setZoom}
      />

      <Box display="flex" mx={2} mt={4} mb={6} alignItems="center" width="90%">
        <IconButton onClick={handlePlay} aria-label="play">
          <PlayCircleFilledIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={() => setPlay(false)} aria-label="pause">
          <PauseCircleFilledIcon fontSize="large" />
        </IconButton>

        {dates[0] && (
          <DateSlider
            mapState={mapState}
            play={play}
            setPlay={setPlay}
            dates={dates}
            smallScreen={smallScreen}
            dateToFilter={dateToFilter}
            setDateToFilter={setDateToFilter}
            zoom={zoom}
          />
        )}
      </Box>
      <VisExplanation>
        A heatmap is a visual representation of data that uses a method of
        color-coding to represent the different data values. Data which includes
        latitude and longitude values (coordinates for mapping associated with
        the data) is great to use with a heatmap. This data for daily new
        COVID-19 confirmed cases from late January through the middle of May of
        2020 which includes latitude and longitude values that allow us to
        visually see where and how the COVID-19 virus is spreading throughout
        the United States and where the most and least impacted areas are. Here
        in this heatmap we can see over-time how much more New York and the
        general east coast have been affected by the virus compared to
        California and the west coast during this time period.
      </VisExplanation>
      <HeatMapQuiz />
    </Box>
  );
};

const CasesVis = ({ cases, setMapState, largeScreen, theme, setZoom }) => {
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
      center: [-90, 38],
      zoom: largeScreen ? 3.75 : 2,
      minZoom: 3.5,
    });

    map.on("style.load", () => {
      map.resize();
      setMapState(map);
      map
        .addSource("confirmed-cases", {
          type: "geojson",
          data: initialData.current,
          buffer: 0,
          tolerance: 3.5,
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

    const isTouchEvent = (e) => e.originalEvent && "touches" in e.originalEvent;
    const isTwoFingerTouch = (e) => e.originalEvent.touches.length >= 2;

    map.on("dragstart", (event) => {
      if (isTouchEvent(event) && !isTwoFingerTouch(event)) {
        map.dragPan.disable();
      }
    });

    // Drag events not emited after dragPan disabled, so I use touch event here
    map.on("touchstart", (event) => {
      if (isTouchEvent(event) && isTwoFingerTouch(event)) {
        map.dragPan.enable();
      }
    });

    map.on("zoom", () => {
      setZoom(map.getZoom());
    });

    return () => map.remove();
  }, [darkMode, darkStyle, largeScreen, lightStyle, setMapState, setZoom]);

  return (
    <div
      aria-labelledby="map-title"
      data-testid="vis-container"
      ref={mapContainer}
      style={{ height: "80vh", width: "100%", marginTop: theme.spacing(5) }}
    />
  );
};

const DateSlider = ({
  mapState,
  play,
  setPlay,
  dates,
  smallScreen,
  dateToFilter,
  setDateToFilter,
  zoom,
}) => {
  const classes = useStyles();
  // Whenever the dateToFilter changes in state, we change the data we are showing by filtering by date
  // There are separate layers for the circles, labels, and heatmap so we set the filter on each depending
  // on the zoom level
  useEffect(() => {
    if (dateToFilter.date && mapState) {
      const filters = ["==", "date", dateToFilter.date];

      if (zoom >= 8) {
        mapState
          .setFilter("confirmed-cases-circles", filters)
          .setFilter("confirmed-cases-labels", filters);
      } else if (zoom >= 5) {
        mapState.setFilter("confirmed-cases-circles", filters);
      } else {
        mapState.setFilter("confirmed-cases-heat", filters);
      }
    }
  }, [dateToFilter.date, mapState, zoom]);

  useEffect(() => {
    setDateToFilter({
      date: dates[dates.length - 2],
      sliderValue: dates.length - 2,
    });
  }, [dates, setDateToFilter]);

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
  }, [dates, dateToFilter.sliderValue, play, setDateToFilter]);

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
        .filter((_, j) => j % (smallScreen ? 14 : 7) === 0)}
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

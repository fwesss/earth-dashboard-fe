import React, { useEffect, useState, lazy, Suspense, useMemo } from "react";
import Box from "@material-ui/core/Box";
import ReactGa from "react-ga";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Fade from "@material-ui/core/Fade";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../features/navbar/NavBar";
import { visualizations } from "../features/visualizations/visConstructor";
import useWindowSize from "../hooks/useWindowSize";
import Globe from "../features/landing/Globe";
import LoadingSpinner from "../features/visualizations/LoadingSpinner";
import theme from "./theme/theme";
import { toggleShowSplash } from "./theme/themeSlice";

const LazyVisualizations = visualizations.map((vis) =>
  lazy(() => import(`../features/visualizations${vis.path}`))
);

export default () => {
  const dispatch = useDispatch();
  const { darkMode, showSplash } = useSelector((state) => state.themeReducer);
  const preferredTheme = useMemo(() => theme(darkMode), [darkMode]);
  const { width } = useWindowSize();
  const [navFixed, setNavFixed] = useState(false);
  const [globeWidth, setGlobeWidth] = useState(
    width - (width - document.body.clientWidth)
  );
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const largeScreen = useMediaQuery(preferredTheme.breakpoints.up("lg"));
  const mediumScreen = useMediaQuery(preferredTheme.breakpoints.up("md"));
  const smallScreen = useMediaQuery(preferredTheme.breakpoints.down("sm"));
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    if (smallScreen) {
      setNavFixed(false);
      setInfoOpen(false);
      setGlobeWidth(width);
    }

    if (mediumScreen) {
      setNavFixed(true);
      setInfoOpen(false);
      setGlobeWidth(
        width -
          (width - document.body.clientWidth) -
          preferredTheme.navBar.width
      );
    }

    if (largeScreen) {
      setNavFixed(true);
      setInfoOpen(true);
    }
  }, [
    largeScreen,
    mediumScreen,
    preferredTheme.navBar.width,
    smallScreen,
    width,
  ]);

  useEffect(() => {
    if (infoOpen) {
      setGlobeWidth(
        width -
          (width - document.body.clientWidth) -
          preferredTheme.navBar.width -
          preferredTheme.infoBar.width
      );
    } else if (mediumScreen) {
      setGlobeWidth(
        width -
          (width - document.body.clientWidth) -
          preferredTheme.navBar.width
      );
    } else if (smallScreen) {
      setGlobeWidth(width);
    }
  }, [
    infoOpen,
    mediumScreen,
    preferredTheme.infoBar.width,
    preferredTheme.navBar.width,
    smallScreen,
    width,
  ]);

  useEffect(() => {
    if (!localStorage.getItem("darkMode")) {
      // If this is the 1st visit, set the color preference to the user's setting
      localStorage.setItem("darkMode", `${prefersDarkMode}`);
    }
  }, [prefersDarkMode]);

  useEffect(() => {
    // initializes the ID
    if (process.env.NODE_ENV === "test") {
      ReactGa.initialize(process.env.REACT_APP_TRACKING_ID, { testMode: true });
    } else {
      ReactGa.initialize(process.env.REACT_APP_TRACKING_ID);
    }
    // reports page views
    ReactGa.pageview("/");
  }, []);

  useEffect(() => {
    window.THREE.DefaultLoadingManager.onLoad = () =>
      dispatch(toggleShowSplash());
  }, [dispatch]);

  return (
    <ThemeProvider theme={preferredTheme}>
      <CssBaseline />
      <Fade in={!showSplash} timeout={400}>
        <Box display="flex">
          <Router>
            <NavBar navFixed={navFixed} />
            <Box
              data-testid="app"
              display="flex"
              justifyContent="center"
              width={mediumScreen ? width - preferredTheme.navBar.width : width}
              position="relative"
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <Box
                        width={globeWidth}
                        position="relative"
                        left={infoOpen ? -preferredTheme.infoBar.width / 2 : 0}
                      >
                        <Globe
                          infoOpen={infoOpen}
                          setInfoOpen={setInfoOpen}
                          largeScreen={largeScreen}
                          width={globeWidth}
                        />
                      </Box>
                    )}
                  />
                  <Box
                    pt={8}
                    pb={6}
                    width={
                      mediumScreen ? width - preferredTheme.navBar.width : width
                    }
                  >
                    {visualizations.map((vis, index) => (
                      <Route
                        key={vis.name}
                        exact
                        path={`/${vis.topic.toLowerCase()}/${vis.name.toLowerCase()}`}
                        component={LazyVisualizations[index]}
                      />
                    ))}
                  </Box>
                </Switch>
              </Suspense>
            </Box>
          </Router>
        </Box>
      </Fade>
    </ThemeProvider>
  );
};

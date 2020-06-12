import React, { useEffect, useMemo, useState } from "react";
import loadable from "@loadable/component";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import ReactGa from "react-ga";
import NavBar from "../features/navbar/NavBar";
import theme from "./theme/theme";
import useWindowSize from "../hooks/useWindowSize";

const LazyBubbles = loadable(() =>
  import("../features/visualizations/covid/bubbles/BubblesVis")
);
const LazyAir = loadable(() =>
  import("../features/visualizations/covid/air/AirVis")
);
const LazyHeatmap = loadable(() =>
  import("../features/visualizations/covid/cases/CasesVis")
);
const LazyGlobe = loadable(() => import("../features/landing/Globe"));
const LazyRacing = loadable(() =>
  import("../features/visualizations/covid/Racing-Chart/RacingData")
);
const LazyCountryIncome = loadable(() =>
  import("../features/visualizations/deforestation/income/CountryIncomeVis")
);
const LazyCountry = loadable(() =>
  import("../features/visualizations/deforestation/country/CountryVis")
);
const LazyMigrationPattern = loadable(() =>
  import("../features/visualizations/migration/Migration")
);

export default () => {
  const { width } = useWindowSize();
  const { darkMode } = useSelector((state) => state.themeReducer);
  // On first visit, query for a dark mode preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const preferredTheme = useMemo(() => theme(darkMode), [darkMode]);
  const largeScreen = useMediaQuery(preferredTheme.breakpoints.up("lg"));
  const mediumScreen = useMediaQuery(preferredTheme.breakpoints.up("md"));
  const smallScreen = useMediaQuery(preferredTheme.breakpoints.down("sm"));
  const [infoOpen, setInfoOpen] = useState(false);
  const [navFixed, setNavFixed] = useState(false);
  const [globeWidth, setGlobeWidth] = useState(
    width - (width - document.body.clientWidth)
  );

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

  return (
    <Router>
      <ThemeProvider theme={preferredTheme}>
        <CssBaseline />
        <Box display="flex">
          <NavBar navFixed={navFixed} />
          <Box
            data-testid="app"
            display="flex"
            justifyContent="center"
            width={mediumScreen ? width - preferredTheme.navBar.width : width}
            position="relative"
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Box
                    width={globeWidth}
                    position="relative"
                    left={infoOpen && -preferredTheme.infoBar.width / 2}
                  >
                    <LazyGlobe
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
                <Route exact path="/covid/bubbles" component={LazyBubbles} />
                <Route
                  exact
                  path="/covid/racing-chart"
                  component={LazyRacing}
                />
                <Route exact path="/covid/heatmap" component={LazyHeatmap} />
                <Route exact path="/covid/air-quality" component={LazyAir} />
                <Route
                  exact
                  path="/deforestation/country-income"
                  component={LazyCountryIncome}
                />
                <Route
                  exact
                  path="/deforestation/country"
                  component={LazyCountry}
                />
                <Route
                  exact
                  path="/migration/trend"
                  component={LazyMigrationPattern}
                />
              </Box>
            </Switch>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

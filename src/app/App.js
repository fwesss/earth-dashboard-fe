import React, { useEffect, useMemo } from "react";
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

export default () => {
  const [open, setOpen] = React.useState(true);
  const { width } = useWindowSize();
  const { darkMode } = useSelector((state) => state.themeReducer);
  // On first visit, query for a dark mode preference
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const preferredTheme = useMemo(() => theme(darkMode), [darkMode]);

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
          <NavBar />
          <Box
            data-testid="app"
            display="flex"
            justifyContent="center"
            width={
              width -
              preferredTheme.navBar.width -
              (width - document.body.clientWidth)
            }
            left={preferredTheme.navBar.width}
            position="relative"
          >
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Box
                    width={
                      open
                        ? width -
                          preferredTheme.navBar.width -
                          preferredTheme.infoBar.width
                        : width - preferredTheme.navBar.width
                    }
                    left={open && -preferredTheme.infoBar.width / 2}
                    position="relative"
                  >
                    <LazyGlobe open={open} setOpen={setOpen} />
                  </Box>
                )}
              />
              <Box py={8}>
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
              </Box>
            </Switch>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

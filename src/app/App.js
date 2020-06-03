import React, { useEffect, useMemo } from "react";
import { Switch, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import ReactGa from "react-ga";
import NavBar from "../features/navbar/NavBar";
import theme from "./theme/theme";
import Bubbles from "../features/visualizations/bubbles/BubblesVis";
import Racing from "../features/visualizations/Racing-Chart/RacingData";
import Heatmap from "../features/visualizations/cases/CasesVis";
import Air from "../features/visualizations/air/AirVis";
import useWindowSize from "../hooks/useWindowSize";
import Globe from "../features/landing/Globe";

export default () => {
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
            <Route exact path="/" component={Globe} />
            <Box py={8}>
              <Route exact path="/bubbles" component={Bubbles} />
              <Route exact path="/racingchart" component={Racing} />
              <Route exact path="/heatmap" component={Heatmap} />
              <Route exact path="/airquality" component={Air} />
            </Box>
          </Switch>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

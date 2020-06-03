import React, { useEffect } from "react";
import { ThemeProvider, CssBaseline, Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Switch, Route } from "react-router-dom";
import "simplebar/dist/simplebar.min.css";
import ReactGa from "react-ga";
import SimpleBar from "simplebar-react";
import NavBar from "../features/navbar/NavBar";
import theme from "./theme";
import Header from "../features/landing/header/Header";
import Bubbles from "../features/visualizations/bubbles/BubblesVis";
import Racing from "../features/visualizations/Racing-Chart/RacingData";
import Heatmap from "../features/visualizations/cases/CasesVis";
import Air from "../features/visualizations/air/AirVis";

const App = () => {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex">
        <NavBar className="NavBar" />
        <SimpleBar
          className="Container"
          style={{ maxHeight: 1000, width: `${100}%` }}
        >
          <Switch>
            <Route exact path="/" component={Header} />
            <Container data-testid="app" maxWidth="xl">
              <Route exact path="/bubbles" component={Bubbles} />
              <Route exact path="/racingchart" component={Racing} />
              <Route exact path="/heatmap" component={Heatmap} />
              <Route exact path="/airquality" component={Air} />
            </Container>
          </Switch>
        </SimpleBar>
      </Box>
    </ThemeProvider>
  );
};

export default App;

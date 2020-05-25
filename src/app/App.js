import React, { useEffect, useMemo } from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import ReactGa from "react-ga";
import theme from "./theme/theme";
import Header from "../features/landing/header/Header";
import BlurbSection from "../features/landing/blurbs/BlurbSection";
import Bubbles from "../features/visualizations/bubbles/BubblesVis";
import Cases from "../features/visualizations/cases/CasesVis";
import Air from "../features/visualizations/air/AirVis";
import RacingData from "../features/visualizations/Racing-Chart/RacingData";
import BeforeFooter from "../features/landing/footer/BeforeFooter";
import Footer from "../features/landing/footer/Footer";
import ErrorBoundary from "./error/ErrorBoundary";
import ColorModeToggle from "./theme/ColorMode";

const App = () => {
  const { darkMode } = useSelector((state) => state.themeReducer);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    localStorage.setItem("darkMode", `${prefersDarkMode}`);
  }, [prefersDarkMode]);

  const preferredTheme = useMemo(() => theme(darkMode), [darkMode]);

  const { fetching: fetchingBubbles } = useSelector(
    (state) => state.bubblesReducer
  );
  const { fetching: fetchingRacing } = useSelector(
    (state) => state.racingReducer
  );
  const { fetching: fetchingAir } = useSelector((state) => state.airReducer);
  const { fetching: fetchingMap } = useSelector((state) => state.casesReducer);

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
      <Container data-testid="app">
        <ColorModeToggle />
        <Header />
        <BlurbSection />
        <ErrorBoundary type="visualization">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="95%"
            height={fetchingBubbles ? 760 : "auto"}
            mx="auto"
            py={5}
            border={3}
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            borderColor={preferredTheme.palette.divider}
          >
            <Bubbles />
          </Box>
        </ErrorBoundary>

        <ErrorBoundary type="visualization">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="95%"
            height={fetchingRacing ? 885 : "auto"}
            mx="auto"
            py={5}
            border={3}
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            borderColor={preferredTheme.palette.divider}
          >
            <RacingData />
          </Box>
        </ErrorBoundary>

        <ErrorBoundary type="visualization">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height={fetchingMap ? 1210 : "auto"}
            width="95%"
            mx="auto"
            py={5}
            overflow="hidden"
            border={3}
            borderTop={0}
            borderLeft={0}
            borderRight={0}
            borderColor={preferredTheme.palette.divider}
          >
            <Cases />
          </Box>
        </ErrorBoundary>

        <ErrorBoundary type="visualization">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width="95%"
            height={fetchingAir ? 1250 : "auto"}
            mx="auto"
            py={5}
          >
            <Air />
          </Box>
        </ErrorBoundary>

        <BeforeFooter />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;

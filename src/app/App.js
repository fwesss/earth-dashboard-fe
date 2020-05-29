import React, { useEffect, useMemo } from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSelector } from "react-redux";
import ReactGa from "react-ga";
import theme from "./theme/theme";
import BlurbSection from "../features/landing/blurbs/BlurbSection";
import Bubbles from "../features/visualizations/bubbles/BubblesVis";
import Cases from "../features/visualizations/cases/CasesVis";
import Air from "../features/visualizations/air/AirVis";
import RacingData from "../features/visualizations/Racing-Chart/RacingData";
import BeforeFooter from "../features/landing/footer/BeforeFooter";
import Footer from "../features/landing/footer/Footer";
import ColorModeToggle from "./theme/ColorMode";
import Info from "../features/landing/header/Info";
import Globe from "../features/landing/header/Globe";
import { ReactComponent as Logo } from "../features/landing/header/logo.svg";

const App = () => {
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

  // Use fetching states to determine whether to how a loading spinner or the actual component
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
      <Globe />

      <Box display="flex" justifyContent="center" width="100%">
        <Box
          position="absolute"
          display="flex"
          minWidth={500}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          top={preferredTheme.spacing(10)}
          px={preferredTheme.spacing(3)}
        >
          <Logo alt="Planet Data logo" title="Planet Data" />

          <Box display="flex">
            <Info />
            <ColorModeToggle />
          </Box>
        </Box>
      </Box>
      <Container data-testid="app" maxWidth="xl">
        <BlurbSection />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="95%"
          height={fetchingBubbles ? "100vh" : "auto"}
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

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="95%"
          height={fetchingRacing ? "100vh" : "auto"}
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

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height={fetchingMap ? "100vh" : "auto"}
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

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="95%"
          height={fetchingAir ? "100vh" : "auto"}
          mx="auto"
          py={5}
        >
          <Air />
        </Box>

        <BeforeFooter />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;

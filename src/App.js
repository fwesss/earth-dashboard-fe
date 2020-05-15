import React from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import theme from "./app/theme";
import CasesVis from "./features/visualizations/cases/CasesVis";
import Header from "./features/landing/header/Header";
import BlurbSection from "./features/landing/blurbs/BlurbSection";
import Bubbles from "./features/visualizations/bubbles/BubblesVis";
import Air from "./features/visualizations/air/AirVis";
import BeforeFooter from "./features/landing/footer/BeforeFooter";
import Footer from "./features/landing/footer/Footer";

const App = () => {
  const { fetching: fetchingBubbles } = useSelector(
    (state) => state.bubblesReducer
  );
  const { fetching: fetchingMap } = useSelector((state) => state.airReducer);
  const { fetching: fetchingAir } = useSelector((state) => state.casesReducer);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters data-testid="app">
        <Header />
        <BlurbSection />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="95%"
          height={fetchingBubbles && 760}
          mx="auto"
          py={5}
          border={3}
          borderTop={0}
          borderLeft={0}
          borderRight={0}
          borderColor={theme.palette.divider}
        >
          <Bubbles />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height={fetchingMap && 1210}
          width="95%"
          mx="auto"
          py={5}
          overflow="hidden"
          border={3}
          borderTop={0}
          borderLeft={0}
          borderRight={0}
          borderColor={theme.palette.divider}
        >
          <CasesVis />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="95%"
          height={fetchingAir && 1250}
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

import React from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@material-ui/core";
import theme from "./app/theme";
import CasesVis from "./features/visualizations/cases/CasesVis";
import Header from "./features/landing/header/Header";
import BlurbSection from "./features/landing/blurbs/BlurbSection";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="xl" disableGutters data-testid="app">
      <Header />
      <BlurbSection />
      <Box
        display="flex"
        flexDirection="column"
        overflow="hidden"
        py={3}
        justifyContent="center"
        alignItems="center"
        height="90vh"
      >
        <CasesVis />
      </Box>
    </Container>
  </ThemeProvider>
);

export default App;

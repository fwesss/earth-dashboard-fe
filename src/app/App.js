import React from "react";
import { ThemeProvider, CssBaseline, Container } from "@material-ui/core";
import theme from "./theme";
import DashBoard from "../features/dashboard/DashBoard";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters data-testid="app">
        <DashBoard />
      </Container>
    </ThemeProvider>
  );
};

export default App;

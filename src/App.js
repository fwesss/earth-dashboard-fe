import React from "react";
import { Container } from "@material-ui/core";
import CasesVis from "./features/visualizations/cases/CasesVis";

const App = () => (
  <Container maxWidth="lg" data-testid="app">
    <CasesVis />
  </Container>
);

export default App;

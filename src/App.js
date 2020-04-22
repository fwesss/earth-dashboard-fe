import React from "react";
import { Container } from "@material-ui/core";
import DataProvider from "./features/visualizations/cases/CasesVis";

const App = () => (
  <Container maxWidth="lg">
    <DataProvider />
  </Container>
);

export default App;

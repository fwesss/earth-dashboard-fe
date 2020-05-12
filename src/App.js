import React from "react";
import { Container } from "@material-ui/core";
import CasesVis from "./features/visualizations/cases/CasesVis";
import RacingChartVis from './features/visualizations/cases/Racing-Chart/RacingChartVis';
import RacingChartData from "./features/visualizations/cases/Racing-Chart/RacingChartData";

const App = () => (
    <Container >
        {/* <CasesVis /> */}
        <RacingChartData />
    </Container>
);

export default App;

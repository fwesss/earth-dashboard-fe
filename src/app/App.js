import React from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@material-ui/core";
import theme from "./theme";
import DashBoard from "../features/dashboard/DashBoard";

const App = (props) => {

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

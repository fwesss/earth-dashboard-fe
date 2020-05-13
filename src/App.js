import React from "react";
import { ThemeProvider, CssBaseline, Container, Box } from "@material-ui/core";
import theme from "./app/theme";
import CasesVis from "./features/visualizations/cases/CasesVis";
import Header from "./features/landing/header/Header";
import BlurbSection from "./features/landing/blurbs/BlurbSection";
import Bubbles from "./features/visualizations/bubbles/BubblesVis";
import BeforeFooter from "./features/landing/footer/BeforeFooter";
import Footer from "./features/landing/footer/Footer";
import RacingData from "./features/visualizations/cases/Racing-Chart/RacingData";

const App = () => (
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
                mx="auto"
            >
                <Bubbles />
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="90vh"
                width="95%"
                mt={10}
                py={3}
                mx="auto"
                overflow="hidden"
            >
                <CasesVis />
            </Box>
            <RacingData />
            <BeforeFooter />
            <Footer />
        </Container>
    </ThemeProvider>
);

export default App;

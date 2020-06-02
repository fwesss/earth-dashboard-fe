import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import Header from "../landing/header/Header";
import Bubbles from "../visualizations/bubbles/BubblesVis";
import RacingData from "../visualizations/Racing-Chart/RacingData";
import Cases from "../visualizations/cases/CasesVis";
import Air from "../visualizations/air/AirVis";


const MenuRouting = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Header} />
                <Route exact path="/bubbles" component={Bubbles} />
                <Route exact path="/racingchart" component={RacingData} />
                <Route exact path="/heatmap" component={Cases} />
                <Route exact path="/airquality" component={Air} />
            </Switch>
        </Router>
    );
};

export default MenuRouting;

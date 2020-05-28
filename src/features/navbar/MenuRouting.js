import React from 'react'
import { Box, Typography, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ReactComponent as Logo } from "../header/logo.svg";
import { Switch, Route, Router } from 'react-router-dom'
import Header from '../landing/header/Header';
import Bubbles from '../visualizations/bubbles/BubblesVis';
import RacingData from '../visualizations/Racing-Chart/RacingData';
import Cases from "../visualizations/cases/CasesVis";
import Air from '../visualizations/air/AirVis';

// const useStyles = makeStyles({
//     sideBarContainer: {
//         width: '20%',
//         height: '100vh',
//         background: 'grey'
//     },
// });




const MenuRouting = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={Header} />
                <Route exact path='/bubbles' component={Bubbles} />
                <Route exact path='/racingchart' component={RacingData} />
                <Route exact path='/heatmap' component={Cases} />
                <Route exact path='/airquality' component={Air} />
            </Switch>
        </Router>
    )


}

export default MenuRouting;
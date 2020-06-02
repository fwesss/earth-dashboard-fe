import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { ReactComponent as Logo } from "../landing/header/logo.svg";
import "./navBar.css";

const useStyles = makeStyles({
    parentFont: {
        // paddingLeft: '3rem',
        fontSize: "25px",
        color: "white",
    },
    childFont: {
        paddingLeft: "1rem",
        fontSize: "22px",
        color: "white",
    },
    nested: {
        paddingLeft: "3rem",
        fontSize: "19px",
        color: "black",
        opacity: "0.4",
    },
    navBar: {
        position: "relative",
        height: "100vh",
        width: "23%",
        background: "#4A5F70",
    },
});

function NavBar({
    header,
    bubbleChart,
    racingChart,
    heatMap,
    airQuality,
    setHeader,
    setBubbleChart,
    setRacingChart,
    setHeatMap,
    setAirChart,
}) {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openCovid, setOpenCovid] = useState(false);
    const [openDeforestation, setOpenDeforestation] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickCovid = () => {
        setOpenCovid(!openCovid);
    };

    const handleClickDeforestation = () => {
        setOpenDeforestation(!openDeforestation);
    };

    return (
        <div className={classes.navBar} style={{ cursor: "pointer" }}>
            <Box m={1} p={2}>
                <Logo alt="Planet Data logo" title="Planet Data" />
            </Box>
            <ListItem
                className={header ? "active" : ""}
                onClick={(e) => {
                    e.preventDefault();
                    setHeader();
                    history.push("/");
                }}
            >
                <Typography className={classes.parentFont}>Home</Typography>
            </ListItem>
            <div>
                <ListItem button onClick={handleClick}>
                    <Typography className={classes.parentFont}>
                        What&lsquo;s Happening
          </Typography>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ListItem button onClick={handleClickCovid}>
                        <Typography className={classes.childFont}>Covid-19</Typography>
                        {openCovid ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openCovid} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem
                                className={bubbleChart ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setBubbleChart();
                                    history.push("/bubbles");
                                }}
                            >
                                <Typography className={classes.nested}>Bubble Chart</Typography>
                            </ListItem>

                            <ListItem
                                className={racingChart ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setRacingChart();
                                    history.push("/racingchart");
                                }}
                            >
                                <Typography className={classes.nested}>Racing Chart</Typography>
                            </ListItem>

                            <ListItem
                                className={heatMap ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setHeatMap();
                                    history.push("/heatmap");
                                }}
                            >
                                <Typography className={classes.nested}>Heat Map</Typography>
                            </ListItem>

                            <ListItem
                                className={airQuality ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAirChart();
                                    history.push("/airquality");
                                }}
                            >
                                <Typography className={classes.nested}>Air Quality</Typography>
                            </ListItem>
                        </List>
                    </Collapse>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <ListItem button onClick={handleClickDeforestation}>
                            <Typography className={classes.childFont}>
                                Deforestation
              </Typography>
                            {openDeforestation ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openDeforestation} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItem className="newVis">
                                    <Typography className={classes.nested}>Vis 1</Typography>
                                </ListItem>

                                <ListItem className="newVis">
                                    <Typography className={classes.nested}>Vis 2</Typography>
                                </ListItem>

                                <ListItem className="newVis">
                                    <Typography className={classes.nested}>Vis 3</Typography>
                                </ListItem>

                                <ListItem className="newVis">
                                    <Typography className={classes.nested}>Vis 4</Typography>
                                </ListItem>
                            </List>
                        </Collapse>
                    </Collapse>
                </Collapse>
            </div>
        </div>
    );
}

export default NavBar;

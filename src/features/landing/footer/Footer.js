import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Img from "react-cool-img";
import EarthImg from "./earthImg.svg";

const useStyles = makeStyles({
    Background: {
        width: "100%",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },

    footerBackground: {
        background: "white",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
    },

    infoBox: {
        position: "relative",
        borderRadius: "10px",
        background: "white",
        height: "52%",
        width: "40%",
        opacity: 0.8,
    },

    infoText: {
        display: "flex",
        flexDirection: "column",
        // textAlign: 'center',
        position: "absolute",
        // padding: '100px',
        // marginLeft: '25px',
        // marginTop: '18px',
    },

    backgroungImg: {
        height: "95%",
        width: "100%",
        position: "absolute",
        paddingTop: "30px",
    },

    headText: {
        // marginTop: '3.75rem',
        paddingBottom: "30px",
        color: "Black",
    },

    midText: {
        paddingBottom: "30px",
        color: "Black",
    },

    buttonsBox: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
    },

    buttons: {
        fontSize: "12px",
        backgroundColor: "#3EB6B4",
        borderRadius: "60px",
        height: "100%",
        width: "100%",
        color: "white",
    },

    bottomBox: {
        width: "90%",
        display: "flex",
        justifyContent: "flex-end",
        height: "10%",
        background: "white",
        paddingTop: "3rem",
        paddingBottom: "2rem",
    },

    tag: {
        textDecoration: "none",
    },
});

const Footer = () => {
    const classes = useStyles();

    return (
        <Box className={classes.Background}>
            <Box className={classes.footerBackground}>
                <Img
                    src={EarthImg}
                    className={classes.backgroungImg}
                    alt="Eastern United States lights from space"
                />
                <Box className={classes.infoBox} />
                <Box className={classes.infoText}>
                    <Typography
                        className={classes.headText}
                        pt="8"
                        variant="h5"
                        component="p"
                    >
                        Want to learn more about <br /> Covid-19?
          </Typography>

                    <Typography className={classes.midText} variant="h6" component="p">
                        Check out the resources below.
          </Typography>
                    <Box className={classes.buttonsBox}>
                        <a
                            className={classes.tag}
                            style={{ color: "white", width: "45%" }}
                            href="https://www.who.int/"
                        >
                            <Button
                                href="https://www.who.int/"
                                className={classes.buttons}
                                style={{ color: "white" }}
                                component="p"
                            >
                                World Health <br /> Organization: Who
              </Button>
                        </a>

                        <a
                            className={classes.tag}
                            style={{ color: "white", width: "45%" }}
                            href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
                        >
                            <Button className={classes.buttons} component="p">
                                CDC
              </Button>
                        </a>
                    </Box>
                </Box>
            </Box>
            <Box className={classes.bottomBox}>
                <Typography component="p" style={{ paddingRight: "35%" }}>
                    &#169; PlanetData 2020
        </Typography>
                <Typography component="p">
                    <a
                        className={classes.tag}
                        style={{ color: "black" }}
                        href="#what-is-planet-data"
                    >
                        Back To Top
          </a>
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;

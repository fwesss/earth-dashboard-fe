import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Img from "react-cool-img";

import { ReactComponent as Arrow } from "../arrow.svg";
import earth from "./earth.webp";
import BlurbSection from "../blurbs/BlurbSection";

const useStyles = makeStyles({
  headerBackground: {
    // backgroundImage: `url(${rectangle})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    width: "100%",
    padding: "2rem",
  },
  welcomeHeading: {
    marginTop: "0.5em",
    marginBottom: "1.125em",
    marginLeft: "-2.5em",

    color: "#4A5F70",
  },
  welcomeHook: {
    paddingLeft: "0.5em",
    marginRight: "1em",

    color: "#4A5F70",
  },
  welcomeHookSmall: {
    marginTop: "1.375em",
    marginRight: "1.75em",
    paddingLeft: "1em",

    color: "#4A5F70",
    fontWeight: 300,
  },
  button: {
    marginTop: "2.25em",
    marginBottom: "1.2em",
  },
  buttonText: {
    paddingTop: "1em",
    paddingBottom: "1em",

    color: "#4A5F70",
    fontSize: "1.5rem",
    fontWeight: 500,
    letterSpacing: "0.75px",
    lineHeight: "1rem",
    textTransform: "capitalize",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.headerBackground} pt={7}>
      <Box className="nextbox" display="flex">
        <Box width="60%">
          <Img src={earth} alt="Earth from space" lazy={false} width="100%" />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="40%"
        >
          <Typography variant="h1" className={classes.welcomeHeading}>
            Welcome to Planet Data
          </Typography>
          <Typography
            variant="h4"
            component="p"
            className={classes.welcomeHook}
          >
            Are you interested in learning about the Earth?
          </Typography>
          <Typography
            variant="h4"
            component="p"
            className={classes.welcomeHook}
          >
            What about what is happening around the world?
          </Typography>
          <Typography
            variant="h5"
            component="p"
            className={classes.welcomeHookSmall}
          >
            What better way than to experience your learning through visuals and
            real-time data?
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="12em"
            mr={10}
          >
            <Button
              href="#what-is-planet-data"
              className={classes.button}
              classes={{ text: classes.buttonText }}
            >
              Learn More
            </Button>
            <Button href="#what-is-planet-data">
              <Arrow />
            </Button>
          </Box>
        </Box>
      </Box>
      <BlurbSection />
    </Box>
  );
};

export default Header;

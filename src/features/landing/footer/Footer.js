import React from "react";
import { Box, Link, Typography, Button, useTheme } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Img from "react-cool-img";
import EarthImg from "./earthImg.svg";
import useWindowSize from "../../../hooks/useWindowSize";

const Footer = () => {
  const theme = useTheme();
  const { width, height } = useWindowSize();

  const useStyles = makeStyles({
    infoBox: {
      opacity: 0.8,
    },

    text: {
      color: theme.palette.common.black,
    },

    button: {
      width: theme.spacing(11),
      margin: theme.spacing(2),
    },
  });

  const classes = useStyles();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
      >
        <Img
          width={width * 0.95}
          height={height * 0.95}
          src={EarthImg}
          alt="Eastern United States lights from space"
        />
        <Box
          position="absolute"
          borderRadius={theme.shape.borderRadius}
          bgcolor={theme.palette.common.white}
          height="52vh"
          minWidth="470px"
          width="40vw"
          className={classes.infoBox}
        />
        <Box position="absolute">
          <Typography
            gutterBottom
            className={classes.text}
            variant="h4"
            component="p"
          >
            Want to learn more about <br /> Covid-19?
          </Typography>

          <Typography
            gutterBottom
            className={classes.text}
            variant="h5"
            component="p"
          >
            Check out the resources below.
          </Typography>
          <Box
            mt={theme.spacing(2)}
            display="flex"
            justifyContent="space-around"
            flexWrap="wrap"
          >
            <Button
              size="small"
              className={classes.button}
              variant="contained"
              color="primary"
              href="https://www.who.int/"
            >
              World Health <br /> Organization: Who
            </Button>

            <Button
              size="small"
              className={classes.button}
              variant="contained"
              color="primary"
              href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
            >
              CDC
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        width="90%"
        height="10%"
        display="flex"
        justifyContent="flex-end"
        pt={theme.spacing(2)}
        pb={theme.spacing(1)}
      >
        <Typography component="p" style={{ paddingRight: "35%" }}>
          &#169; PlanetData 2020
        </Typography>

        <Typography>
          <Link color="textPrimary" href="#what-is-planet-data">
            Back To Top
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

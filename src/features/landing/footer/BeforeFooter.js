import React from "react";
import { Box, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  midBackground: {
    background: "#4A5F70",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    height: "80vh",
  },
  headText: {
    marginTop: "3.75rem",
    padding: "3.125rem",
    color: "white",
  },
  midText: {
    paddingBottom: "5rem",
    color: "white",
  },
  bottomText: {
    fontSize: "	3.125rem",
    paddingTop: "1.25rem",
    color: "white",
  },
});

const BeforeFooter = () => {
  const classes = useStyles();

  return (
    <Box className={classes.midBackground}>
      <Typography
        className={classes.headText}
        pt="8"
        variant="h4"
        component="p"
      >
        Lets Play a game!
      </Typography>

      <Typography className={classes.midText} variant="h4" component="p">
        Take a look at all the data from the visuals above and answer <br />
        the following question:
      </Typography>

      <Typography className={classes.bottomText} variant="h1" component="p">
        Which visual helps better understand the <br /> rapid progression of
        COVID-19?
      </Typography>
    </Box>
  );
};

export default BeforeFooter;

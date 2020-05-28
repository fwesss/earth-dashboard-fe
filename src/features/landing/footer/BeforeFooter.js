import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useWindowSize from "../../../hooks/useWindowSize";

const BeforeFooter = () => {
  const theme = useTheme();
  const { width } = useWindowSize();

  const useStyles = makeStyles({
    text: {
      color: theme.palette.contrast.contrastText,
    },
  });

  const classes = useStyles();

  return (
    <Box
      display="flex"
      width={width * 0.8}
      flexDirection="column"
      textAlign="center"
      bgcolor={theme.palette.contrast.main}
      p={theme.spacing(2)}
      mx="auto"
      mb={theme.spacing(2)}
    >
      <Typography className={classes.text} variant="h4" component="p">
        Lets Play a game!
      </Typography>

      <Typography className={classes.text} variant="h4" component="p">
        Take a look at all the data from the visuals above and answer <br />
        the following question:
      </Typography>

      <Box mt={theme.spacing(2)}>
        <Typography className={classes.text} variant="h3" component="p">
          Which visual helps better understand the <br /> rapid progression of
          COVID-19?
        </Typography>
      </Box>
    </Box>
  );
};

export default BeforeFooter;

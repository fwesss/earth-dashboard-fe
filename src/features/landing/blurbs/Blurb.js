import React from "react";
import { Box, Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  blurbText: {
    paddingLeft: "0.625em",
    paddingRight: "0.625em",

    fontWeight: 300,
  },
});

const Blurb = ({ children, id }) => {
  const classes = useStyles();

  return (
    <Box
      data-testid={`blurb${id}`}
      display="flex"
      alignItems="center"
      border="2px solid #3EB6B4"
      borderRadius="20px"
      width="27%"
      height={190}
    >
      <Typography
        variant="h6"
        component="p"
        className={classes.blurbText}
        align="center"
      >
        {children}
      </Typography>
    </Box>
  );
};

export default Blurb;

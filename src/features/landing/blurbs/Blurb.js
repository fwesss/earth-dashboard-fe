import React from "react";
import { Box, Typography, useTheme } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  blurbText: {
    paddingLeft: "0.625em",
    paddingRight: "0.625em",

    fontWeight: 300,
  },
});

const Blurb = ({ children, id, width = "27%", my = 0 }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box
      data-testid={`blurb${id}`}
      display="flex"
      alignItems="center"
      border={`2px solid ${theme.palette.primary.main}`}
      borderRadius="20px"
      width={width}
      height={190}
      my={my}
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

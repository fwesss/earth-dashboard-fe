import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  explanation: {
    maxWidth: "35em",
    paddingBottom: "1rem",
    margin: "2em auto 0",
  },
});

const VisExplanation = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography paragraph className={classes.explanation}>
      {children}
    </Typography>
  );
};

export default VisExplanation;

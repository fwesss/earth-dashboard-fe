import React from "react";
import { Typography, useTheme } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const VisExplanation = ({ children }) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    explanation: {
      maxWidth: "35em",
      padding: theme.spacing(5),
      margin: "auto 0",
    },
  });

  const classes = useStyles();

  return (
    <Typography
      data-testid="vis-explanation"
      paragraph
      className={classes.explanation}
    >
      {children}
    </Typography>
  );
};

export default VisExplanation;

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
      variant="body2"
      data-testid="vis-explanation"
      paragraph
      className={classes.explanation}
      align="left"
    >
      {children}
    </Typography>
  );
};

export default VisExplanation;

import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  title: {
    marginBottom: "2em",
  },
});

const VisTitle = ({ children, variant, component, subtitled = false }) => {
  const classes = useStyles();

  return (
    <Typography
      variant={variant}
      component={component}
      align="center"
      className={!subtitled && classes.title}
    >
      {children}
    </Typography>
  );
};

export default VisTitle;

import React from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const VisTitle = ({ children, variant, component, subtitled = false }) => {
  const classes = useStyles();

  return (
    <Box px={5} display="flex" flexDirection="column">
      <Typography
        data-testid="vis-title"
        variant={variant}
        component={component}
        align="center"
        className={!subtitled ? classes.title : null}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default VisTitle;

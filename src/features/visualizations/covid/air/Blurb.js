import React from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default ({ children, id, maxWidth = 13 }) => {
  const theme = useTheme();
  const useStyles = makeStyles({
    card: {
      margin: theme.spacing(6),
      maxWidth: theme.spacing(maxWidth),
      display: "flex",
      alignItems: "center",
      borderTop: `6px ${theme.palette.secondary.main} solid`,
    },
  });

  const classes = useStyles();

  return (
    <Card data-testid={`blurb${id}`} raised className={classes.card}>
      <CardContent>
        <Typography
          data-testid="vis-explanation"
          variant="h6"
          component="p"
          align="center"
        >
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
};

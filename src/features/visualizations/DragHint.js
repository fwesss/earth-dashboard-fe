import React, { useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(() => ({
  tooltip: {
    fontSize: 26,
  },
}));

export default ({ elements, children, close }) => {
  const classes = useStyles();
  const touchScreen = useMediaQuery("(pointer:coarse)");
  const [open, setOpen] = useState(!touchScreen);

  useEffect(() => {
    if (close) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [close]);

  return (
    <Tooltip
      title={`${touchScreen ? "Drag the" : "Click and drag the"} ${elements}!`}
      classes={{ tooltip: classes.tooltip }}
      open={open}
      arrow
    >
      {children}
    </Tooltip>
  );
};

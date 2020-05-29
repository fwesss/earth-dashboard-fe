import React from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import { Box, makeStyles, useTheme } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

export default () => {
  const theme = useTheme();
  const useStyles = makeStyles({
    icon: {
      color: theme.palette.common.white,
    },
  });

  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" p={3}>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="Humans across the planet produce pollution but some cities produce more than their fair share. We can see which cities are polluting heavily but examining the height and color intensity of the columns representing pollution levels."
      >
        <HelpOutlineIcon className={classes.icon} />
      </Tooltip>
    </Box>
  );
};

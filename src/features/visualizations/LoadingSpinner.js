import React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import useTheme from "@material-ui/core/styles/useTheme";

export default () => {
  const theme = useTheme();

  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={theme.spacing(10)} data-testid="progressbar" />
    </Box>
  );
};

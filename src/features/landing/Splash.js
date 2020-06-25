import React from "react";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Logo from "./logo.png";

const useStyles = makeStyles(() => ({
  indeterminate: {
    backgroundColor: "#77EBE8",
  },
  barIndeterminate: {
    backgroundColor: "#3DB8B6",
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <Box
      position="fixed"
      top={0}
      right={0}
      bottom={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor="#303232"
    >
      <Box maxWidth="85%" display="flex" justifyContent="center">
        <img src={Logo} alt="Logo" />
      </Box>
      <Box width="40%" mt={9}>
        <LinearProgress
          classes={{
            indeterminate: classes.indeterminate,
            bar1Indeterminate: classes.barIndeterminate,
            bar2Indeterminate: classes.barIndeterminate,
          }}
        />
      </Box>
    </Box>
  );
};

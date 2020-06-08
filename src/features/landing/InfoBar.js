import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Box from "@material-ui/core/Box";
import InfoSection from "./InfoSection";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },

  drawer: {
    width: theme.infoBar.width,
    flexShrink: 0,
  },

  drawerPaper: {
    width: theme.infoBar.width,
  },

  drawerHeader: {
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default ({ data, handleChange, setOpen, open }) => {
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        position="absolute"
        right={theme.spacing(6)}
        top={theme.spacing(6)}
        zIndex={1}
      >
        <IconButton
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          className={clsx(open && classes.hide)}
          color="secondary"
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          className={classes.drawerHeader}
        >
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Divider variant="middle" />

        <InfoSection data={data} handleChange={handleChange} />
      </Drawer>
    </>
  );
};

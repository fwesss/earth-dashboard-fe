import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -theme.infoBar.width,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
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

        <Box p={5}>
          <FormControl component="fieldset">
            <Typography variant="h4" component="h2">
              Dataset
            </Typography>
            <FormLabel component="legend" hidden>
              Dataset
            </FormLabel>
            <RadioGroup
              aria-label="dataset"
              name="dataset1"
              value={data.selected}
              onChange={handleChange}
            >
              <FormControlLabel
                value="pollution"
                control={<Radio />}
                label="Pollution from major cities"
              />
              <FormControlLabel
                value="recycled"
                control={<Radio />}
                label="Amount of waste recycled by countries"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Divider variant="middle" />

        <Box p={5}>
          {data.selected === "pollution" ? (
            <>
              <Typography>Pollution Out From Major Cities</Typography>
              <Typography>
                Humans across the planet produce pollution but some cities
                produce more than their fair share. We can see which cities are
                polluting heavily but examining the height and color intensity
                of the columns representing pollution levels.
              </Typography>
            </>
          ) : (
            <>
              <Typography>Waste Recycled by Countries</Typography>
              <Typography>
                Recycling programs of varying effectiveness have been
                implemented around the world. We can get a high level picture of
                the amount of waste that&apos;s recycled by each country by
                examining the color intensity of the country.
              </Typography>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

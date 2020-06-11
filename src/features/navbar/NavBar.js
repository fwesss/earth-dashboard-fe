import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import useTheme from "@material-ui/core/styles/useTheme";
import Link from "@material-ui/core/Link";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { ReactComponent as Logo } from "./smallLogo.svg";
import ColorMode from "../../app/theme/ColorMode";
import { getAirQuality } from "../visualizations/covid/air/airSlice";
import { getCases } from "../visualizations/covid/cases/casesSlice";
import { getSummary } from "../visualizations/covid/bubbles/bubblesSlice";
import { getConfirmedCases } from "../visualizations/covid/Racing-Chart/RacingSlice";
import { getPredictions } from "../visualizations/deforestation/predictionSlice";
import { getMigrations } from "../visualizations/migration/migrationSlice";

const NavBar = ({ navFixed }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { cases } = useSelector((state) => state.casesReducer);
  const { summary } = useSelector((state) => state.bubblesReducer);
  const { deaths } = useSelector((state) => state.racingReducer);
  const { airQuality } = useSelector((state) => state.airReducer);
  const { country, countryIncome } = useSelector(
    (state) => state.predictionReducer
  );
  const { migration } = useSelector((state) => state.migrationReducer);

  const [open, setOpen] = useState(false);

  const useStyles = makeStyles({
    appBar: {
      background: theme.palette.common.black,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },

    appBarShift: {
      width: `calc(100% - ${theme.navBar.width}px)`,
      marginLeft: theme.navBar.width,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.secondary.main,
    },

    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: theme.navBar.width,
        flexShrink: 0,
      },
    },

    drawerPaper: {
      width: theme.navBar.width,
    },

    hide: {
      display: "none",
    },

    logo: {
      outline: 0,
      paddingTop: theme.spacing(2),
    },

    title: {
      padding: theme.spacing(3),
    },

    nested: {
      paddingLeft: theme.spacing(6),
    },
  });

  const classes = useStyles();
  const [openCovid, setOpenCovid] = useState(false);
  const [openDeforestation, setOpenDeforestation] = useState(false);
  const [openMigration, setOpenMigration] = useState(false);

  const handleClickCovid = () => {
    setOpenCovid(!openCovid);

    if (!cases && !summary && !deaths && !airQuality) {
      dispatch(getSummary());
      dispatch(getConfirmedCases());
      dispatch(getCases());
      dispatch(getAirQuality());
    }
  };

  const handleClickDeforestation = () => {
    setOpenDeforestation(!openDeforestation);

    if (!country && !countryIncome) {
      dispatch(getPredictions());
    }
  };

  const handleClickMigration = () => {
    setOpenMigration(!openMigration);

    if (!migration) {
      dispatch(getMigrations());
    }
  };

  const drawer = (
    <>
      <Box
        display="flex"
        alignItems="center"
        pl={4}
        py={7}
        bgcolor={theme.palette.common.black}
      >
        <Link
          className={classes.logo}
          component={NavLink}
          to="/"
          onClick={() => setOpen(!open)}
        >
          <Logo alt="Planet Data logo" title="Planet Data" />
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
        <ColorMode />
      </Box>

      <Divider variant="middle" />

      <List component="nav">
        <Typography variant="h5" component="h2" className={classes.title}>
          What&apos;s Happening?
        </Typography>

        <List component="div" disablePadding>
          <ListItem button onClick={handleClickCovid}>
            <ListItemText primary="COVID-19" />
            {openCovid ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCovid} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItem
                selected={pathname === "/covid/bubbles"}
                button
                component={NavLink}
                to="/covid/bubbles"
                onClick={() => setOpen(!open)}
              >
                <ListItemText className={classes.nested} primary="Bubbles" />
              </ListItem>

              <ListItem
                selected={pathname === "/covid/racing-chart"}
                button
                component={NavLink}
                to="/covid/racing-chart"
                onClick={() => setOpen(!open)}
              >
                <ListItemText
                  className={classes.nested}
                  primary="Racing Chart"
                />
              </ListItem>

              <ListItem
                selected={pathname === "/covid/air-quality"}
                button
                component={NavLink}
                to="/covid/air-quality"
                onClick={() => setOpen(!open)}
              >
                <ListItemText
                  className={classes.nested}
                  primary="Air Quality"
                />
              </ListItem>

              <ListItem
                selected={pathname === "/covid/heatmap"}
                button
                component={NavLink}
                to="/covid/heatmap"
                onClick={() => setOpen(!open)}
              >
                <ListItemText className={classes.nested} primary="Heatmap" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <Divider variant="middle" />

        <List component="div" disablePadding>
          <ListItem button onClick={handleClickDeforestation}>
            <ListItemText primary="Deforestation" />
            {openDeforestation ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openDeforestation} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItem
                selected={pathname === "/deforestation/country-income"}
                button
                component={NavLink}
                to="/deforestation/country-income"
                onClick={() => setOpen(!open)}
              >
                <ListItemText
                  className={classes.nested}
                  primary="Country Income"
                />
              </ListItem>

              <ListItem
                selected={pathname === "/deforestation/country"}
                button
                component={NavLink}
                to="/deforestation/country"
                onClick={() => setOpen(!open)}
              >
                <ListItemText className={classes.nested} primary="Country" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <Divider variant="middle" />

        <List component="div" disablePadding>
          <ListItem button onClick={handleClickMigration}>
            <ListItemText primary="Migration" />
            {openMigration ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openMigration} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItem
                selected={pathname === "/migration/trend"}
                button
                component={NavLink}
                to="/migration/trend"
                onClick={() => setOpen(!open)}
              >
                <ListItemText className={classes.nested} primary="Pattern" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </List>
    </>
  );

  return (
    <>
      {navFixed ? (
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      ) : (
        <>
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <IconButton
                aria-label="open navbar"
                onClick={() => setOpen(!open)}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              {!open && (
                <Link className={classes.logo} component={NavLink} to="/">
                  <Logo alt="Planet Data logo" title="Planet Data" />
                </Link>
              )}
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            classes={{ paper: classes.drawerPaper }}
            variant="temporary"
            open={open}
            onClose={() => setOpen(!open)}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </>
      )}
    </>
  );
};

export default NavBar;

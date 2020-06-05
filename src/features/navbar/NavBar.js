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
import { ReactComponent as Logo } from "./smallLogo.svg";
import ColorMode from "../../app/theme/ColorMode";
import { getAirQuality } from "../visualizations/covid/air/airSlice";
import { getCases } from "../visualizations/covid/cases/casesSlice";
import { getSummary } from "../visualizations/covid/bubbles/bubblesSlice";
import { getConfirmedCases } from "../visualizations/covid/Racing-Chart/RacingSlice";
import { getPredictions } from "../visualizations/deforestation/predictionSlice";

function NavBar() {
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

  const useStyles = makeStyles({
    nested: {
      paddingLeft: theme.spacing(7),
    },

    logo: {
      outline: 0,
    },
  });

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [openCovid, setOpenCovid] = useState(false);
  const [openDeforestation, setOpenDeforestation] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

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

  return (
    <Box
      width={theme.navBar.width}
      bgcolor={theme.navBar.background}
      height="100vh"
      position="fixed"
      border={1}
      borderColor={theme.palette.divider}
      borderTop={0}
      borderBottom={0}
      borderLeft={0}
    >
      <Box
        display="flex"
        alignItems="center"
        pl={4}
        py={7}
        bgcolor={`${theme.palette.common.black}dd`}
      >
        <Link className={classes.logo} component={NavLink} to="/">
          <Logo alt="Planet Data logo" title="Planet Data" />
        </Link>
      </Box>
      <Box display="flex" justifyContent="center">
        <ColorMode />
      </Box>

      <Divider variant="middle" />

      <List component="nav">
        <ListItem button onClick={handleClick}>
          <ListItemText primary="What's Happening" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              onClick={handleClickCovid}
              className={classes.nested}
            >
              <ListItemText primary="Covid-19" />
              {openCovid ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCovid} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  selected={pathname === "/covid/bubbles"}
                  button
                  component={NavLink}
                  to="/covid/bubbles"
                >
                  <ListItemText inset primary="Bubbles" />
                </ListItem>

                <ListItem
                  selected={pathname === "/covid/racing-chart"}
                  button
                  component={NavLink}
                  to="/covid/racing-chart"
                >
                  <ListItemText inset primary="Racing Chart" />
                </ListItem>

                <ListItem
                  selected={pathname === "/covid/heatmap"}
                  button
                  component={NavLink}
                  to="/covid/heatmap"
                >
                  <ListItemText inset primary="Heatmap" />
                </ListItem>

                <ListItem
                  selected={pathname === "/covid/air-quality"}
                  button
                  component={NavLink}
                  to="/covid/air-quality"
                >
                  <ListItemText inset primary="Air Quality" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>

        {open && <Divider variant="middle" />}

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={handleClickDeforestation}
            >
              <ListItemText primary="Deforestation" />
              {openDeforestation ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openDeforestation} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  selected={pathname === "/deforestation/country-income"}
                  button
                  component={NavLink}
                  to="/deforestation/country-income"
                >
                  <ListItemText inset primary="Country Income" />
                </ListItem>

                <ListItem
                  selected={pathname === "/deforestation/country"}
                  button
                  component={NavLink}
                  to="/deforestation/country"
                >
                  <ListItemText inset primary="Country" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

export default NavBar;

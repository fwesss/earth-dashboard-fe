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
import { ReactComponent as Logo } from "./smallLogo.svg";
import ColorMode from "../../app/theme/ColorMode";

function NavBar() {
  const theme = useTheme();
  const { pathname } = useLocation();

  const useStyles = makeStyles({
    nested: {
      paddingLeft: theme.spacing(7),
    },
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openCovid, setOpenCovid] = useState(false);
  const [openDeforestation, setOpenDeforestation] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickCovid = () => {
    setOpenCovid(!openCovid);
  };

  const handleClickDeforestation = () => {
    setOpenDeforestation(!openDeforestation);
  };

  return (
    <Box
      width={theme.navBar.width}
      bgcolor={theme.navBar.background}
      height="100vh"
      position="fixed"
    >
      <Box
        display="flex"
        alignItems="center"
        pl={4}
        py={7}
        bgcolor={`${theme.palette.common.black}dd`}
      >
        <Link component={NavLink} to="/">
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
                  selected={pathname === "/bubbles"}
                  button
                  component={NavLink}
                  to="/bubbles"
                >
                  <ListItemText inset primary="Bubbles" />
                </ListItem>

                <ListItem
                  selected={pathname === "/racingchart"}
                  button
                  component={NavLink}
                  to="/racingchart"
                >
                  <ListItemText inset primary="Racing Chart" />
                </ListItem>

                <ListItem
                  selected={pathname === "/heatmap"}
                  button
                  component={NavLink}
                  to="/heatmap"
                >
                  <ListItemText inset primary="Heatmap" />
                </ListItem>

                <ListItem
                  selected={pathname === "/airquality"}
                  button
                  component={NavLink}
                  to="/airquality"
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
                <ListItem button component={NavLink} to="">
                  <ListItemText inset primary="Vis 1" />
                </ListItem>

                <ListItem button component={NavLink} to="">
                  <ListItemText inset primary="Vis 2" />
                </ListItem>

                <ListItem button component={NavLink} to="">
                  <ListItemText inset primary="Vis 3" />
                </ListItem>

                <ListItem button component={NavLink} to="">
                  <ListItemText inset primary="Vis 4" />
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

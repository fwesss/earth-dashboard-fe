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
import EmailIcon from "@material-ui/icons/Email";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { ReactComponent as Logo } from "./smallLogo.svg";
import ColorMode from "../../app/theme/ColorMode";
import { visStates, visualizations } from "../visualizations/visConstructor";
import { checkIfNoData } from "../../hooks/useVisDataFetch";
import QuizProgress from "../quiz/QuizProgress";

const NavBar = ({ navFixed }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const store = useSelector((state) => state);

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

  const topics = new Set(visualizations.map((vis) => vis.topic));
  const [openTopic, setOpenTopic] = useState(
    [...topics].map((topic) => ({
      [topic]: false,
    }))
  );

  const clickHandler = (topic) => {
    setOpenTopic({ ...openTopic, [topic]: !openTopic[topic] });

    return (
      visualizations
        .filter((vis) => vis.topic === topic)
        .every((vis) => checkIfNoData(store[`${vis.name}Reducer`].data)) &&
      visualizations
        .filter((vis) => vis.topic === topic)
        .forEach((vis) => dispatch(visStates[vis.name].getData()))
    );
  };

  const drawer = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
    >
      <Box>
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
          <Box display="flex" justifyContent="center" pb={4}>
            <QuizProgress />
          </Box>

          {[...topics].map((topic) => (
            <div key={topic}>
              <List component="div" disablePadding>
                <ListItem button onClick={() => clickHandler(topic)}>
                  <ListItemText primary={topic} />
                  {openTopic[topic] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openTopic[topic]} timeout="auto" unmountOnExit>
                  <List component="div">
                    {visualizations
                      .filter((vis) => vis.topic === topic)
                      .map((vis) => (
                        <ListItem
                          key={vis.name}
                          selected={
                            pathname ===
                            `/${vis.topic.toLowerCase()}/${vis.name.toLowerCase()}`
                          }
                          button
                          component={NavLink}
                          to={`/${vis.topic.toLowerCase()}/${vis.name.toLowerCase()}`}
                          onClick={() => setOpen(!open)}
                        >
                          <ListItemText
                            className={classes.nested}
                            primary={vis.displayName}
                          />
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
                <Divider variant="middle" />
              </List>
            </div>
          ))}
        </List>
      </Box>
      <Box ml={3} mb={2}>
        <Button
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:earthdashpt9@gmail.com?subject=Feedback"
          startIcon={<EmailIcon />}
          size="small"
        >
          Feedback
        </Button>
      </Box>
    </Box>
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

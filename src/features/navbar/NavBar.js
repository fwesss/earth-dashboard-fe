import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

function NavBar({
  airQuality,
  bubbleChart,
  heatMap,
  racingChart,
  setAirChart,
  setBubbleChart,
  setHeatMap,
  setRacingChart,
}) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <div
        role="link"
        tabIndex={0}
        className={bubbleChart ? "active" : ""}
        onClick={(e) => {
          e.preventDefault();
          setBubbleChart();
          history.push("/");
        }}
        onKeyPress={(e) => {
          e.preventDefault();
          setBubbleChart();
          history.push("/");
        }}
      >
        Home
      </div>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Toggle Menu Grow
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              /* eslint-disable-next-line react/jsx-props-no-spreading */
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    <MenuItem
                      className={bubbleChart ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setBubbleChart();
                        history.push("/bubbles");
                      }}
                    >
                      Bubble Chart
                    </MenuItem>
                    <MenuItem
                      className={racingChart ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setRacingChart();
                        history.push("/racingchart");
                      }}
                    >
                      Racing Chart
                    </MenuItem>
                    <MenuItem
                      className={heatMap ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setHeatMap();
                        history.push("/heatmap");
                      }}
                    >
                      Heat Map
                    </MenuItem>
                    <MenuItem
                      className={airQuality ? "active" : ""}
                      onClick={(e) => {
                        e.preventDefault();
                        setAirChart();
                        history.push("/airquality");
                      }}
                    >
                      Air Quality
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default NavBar;

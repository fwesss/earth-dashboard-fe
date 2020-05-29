import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../navbar/NavBar";
import DashBoardSec from "../../app/DashBoardSec";

const useStyles = (theme) => ({
  root: {
    display: theme.flex,
  },
});

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: true,
      bubbleChart: false,
      racingChart: false,
      heatMap: false,
      airQuality: false,
    };
  }

  setHeader() {
    this.setState({
      header: true,
      bubbleChart: false,
      racingChart: false,
      heatMap: false,
      airQuality: false,
    });
  }

  setBubbleChart() {
    this.setState({
      header: false,
      bubbleChart: true,
      racingChart: false,
      heatMap: false,
      airQuality: false,
    });
  }

  setRacingChart() {
    this.setState({
      header: false,
      bubbleChart: false,
      racingChart: true,
      heatMap: false,
      airQuality: false,
    });
  }

  setHeatMap() {
    this.setState({
      header: false,
      bubbleChart: false,
      racingChart: false,
      heatMap: true,
      airQuality: false,
    });
  }

  setAirChart() {
    this.setState({
      header: false,
      bubbleChart: false,
      racingChart: false,
      heatMap: false,
      airQuality: true,
    });
  }

  render() {
    const { classes } = this.props;
    const {
      heatMap,
      airQuality,
      racingChart,
      bubbleChart,
      header,
    } = this.state;

    return (
      <div className={classes.root}>
        <NavBar
          setHeader={this.header}
          setBubbleChart={this.setBubbleChart}
          setRacingChart={this.setRacingChart}
          setHeatMap={this.setHeatMap}
          setAirChart={this.setAirChart}
          header={header}
          bubbleChart={bubbleChart}
          racingChart={racingChart}
          heatMap={heatMap}
          airQuality={airQuality}
        />
        <DashBoardSec
          header={header}
          bubbleChart={bubbleChart}
          racingChart={racingChart}
          heatMap={heatMap}
          airQuality={airQuality}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(DashBoard);

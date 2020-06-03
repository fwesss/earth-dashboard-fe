import React, { Component } from "react";
import SimpleBar from "simplebar-react";
import NavBar from "../navbar/NavBar";
import DashBoardSec from "../../app/DashBoardSection";
import "simplebar/dist/simplebar.min.css";

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
    const {
      heatMap,
      airQuality,
      racingChart,
      bubbleChart,
      header,
    } = this.state;
    return (
      <div
        className="Container"
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <NavBar
          className="NavBar"
          setHeader={this.setHeader}
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
        <SimpleBar
          className="Container"
          style={{ maxHeight: 1000, width: `${100}%` }}
        >
          <DashBoardSec
            className="dashboardsec"
            style={{ width: `${100}%` }}
            header={header}
            bubbleChart={bubbleChart}
            racingChart={racingChart}
            heatMap={heatMap}
            airQuality={airQuality}
          />
        </SimpleBar>
      </div>
    );
  }
}

export default DashBoard;

import React, { useState, useEffect, Component } from "react";
import NavBar from "../navbar/NavBar";
import DashBoardSec from "../../app/DashBoardSection";
import { display } from "@material-ui/system";
import SimpleBar from "simplebar-react";
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

  setHeader = () => {
    this.setState({
      header: true,
      bubbleChart: false,
      racingChart: false,
      heatMap: false,
      airQuality: false,
    });
  };
  setBubbleChart = () => {
    this.setState({
      header: false,
      bubbleChart: true,
      racingChart: false,
      heatMap: false,
      airQuality: false,
    });
  };
  setRacingChart = () => {
    this.setState({
      header: false,
      bubbleChart: false,
      racingChart: true,
      heatMap: false,
      airQuality: false,
    });
  };
  setHeatMap = () => {
    this.setState({
      header: false,
      bubbleChart: false,
      racingChart: false,
      heatMap: true,
      airQuality: false,
    });
  };
  setAirChart = () => {
    this.setState({
      header: false,
      bubbleChart: false,
      racingChart: false,
      heatMap: false,
      airQuality: true,
    });
  };

  render() {
    return (
      <div
        classsName="Container"
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <NavBar
          classsName="NavBar"
          setHeader={this.setHeader}
          setBubbleChart={this.setBubbleChart}
          setRacingChart={this.setRacingChart}
          setHeatMap={this.setHeatMap}
          setAirChart={this.setAirChart}
          header={this.state.header}
          bubbleChart={this.state.bubbleChart}
          racingChart={this.state.racingChart}
          heatMap={this.state.heatMap}
          airQuality={this.state.airQuality}
        />
        <SimpleBar
          classsName="Container"
          style={{ maxHeight: 1000, width: 100 + "%" }}
        >
          <DashBoardSec
            classsName="dashboardsec"
            style={{ width: 100 + "%" }}
            header={this.state.header}
            bubbleChart={this.state.bubbleChart}
            racingChart={this.state.racingChart}
            heatMap={this.state.heatMap}
            airQuality={this.state.airQuality}
          />
        </SimpleBar>
      </div>
    );
  }
}

export default DashBoard;

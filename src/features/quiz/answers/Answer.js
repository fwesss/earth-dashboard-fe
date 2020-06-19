/* eslint-disable */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button } from "@material-ui/core";
import { backgrounds } from "polished";

const useStyles = makeStyles({
  Button: {
    color: "#7ECECC",
    width: "20%",
    height: "10%",
    marginBottom: "2rem",
    borderRadius: "10px",
    cursor: "pointer",
    background: "white",
    borderColor: "#7ECECC",
    fontSize: "20px",
    padding: "10px",
    textAlign: "center",
    border: "1px solid",
    outline: "none",
  },
});

export default function Answer(props) {
  const classes = useStyles();

  return (
    <button
      value={props.letter}
      className={classes.Button}
      onClick={props.handleClick}
    >
      {/* <span className="letter">{props.letter}</span> */}
      {props.answer}
    </button>
  );
}

/* eslint-disable */

import React from "react";
import "./answer.css";

export default function Answer(props) {
  let classes = ["answer-"];

  if (props.selected) {
    classes.push("selected");
  }
  return (
    <button
      value={props.letter}
      className={classes.join("")}
      onClick={props.handleClick}
    >
      {props.answer}
    </button>
  );
}
